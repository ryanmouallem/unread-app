"use client"

import { useEffect, useMemo, useState } from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Modal from "./components/Modal";
import BookCard from "./components/BookCard";
import Drawer from "./components/Drawer";
import BookshelfItem from "./components/BookshelfItem";
import { createClient as createBrowserSupabaseClient } from "@/utils/supabase/client";


export default function Home() {

  const [searchResult, setSearchResult] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [bookshelf, setBookshelf] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [isShelfOpen, setIsShelfOpen] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  useEffect(() => {
    if (!user) {
      setBookshelf([]);
      return;
    }
    loadBookshelf();
  }, [user]);

  async function loadBookshelf() {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from("bookshelf")
      .select("id, ol_key, title, author, cover_i, year, created_at")
      .order("created_at", { ascending: false });
    if (!error) setBookshelf(data || []);
  }
  
  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function openShelf() {
    setIsShelfOpen(true);
  }
  function closeShelf() {
    setIsShelfOpen(false);
  }

  const savedOlKeys = useMemo(() => new Set(bookshelf.map((b) => b.ol_key)), [bookshelf]);

  async function handleAddToBookshelf(book) {
    if (!user) {
      openModal();
      return;
    }
    if (savedOlKeys.has(book.key)) return;
    const supabase = createBrowserSupabaseClient();
    const author = Array.isArray(book.author_name) ? book.author_name.join(", ") : book.author_name;
    const payload = {
      user_id: user.id,
      ol_key: book.key,
      title: book.title,
      author,
      cover_i: book.cover_i,
      year: book.first_publish_year,
    };
    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      ...payload,
      created_at: new Date().toISOString(),
    };
    setBookshelf((prev) => [optimistic, ...prev]);
    try {
      const { data, error } = await supabase
        .from("bookshelf")
        .insert(payload)
        .select("id, created_at")
        .single();
      if (error) throw error;
      setBookshelf((prev) =>
        prev.map((b) => (b.id === tempId ? { ...b, id: data.id, created_at: data.created_at } : b))
      );
      notify("Added to your bookshelf", "success");
    } catch (e) {
      setBookshelf((prev) => prev.filter((b) => b.id !== tempId));
      notify("Could not add book", "error");
    }
  }

  async function handleRemoveFromBookshelf(id) {
    const supabase = createBrowserSupabaseClient();
    const prev = bookshelf;
    setBookshelf((curr) => curr.filter((b) => b.id !== id));
    const { error } = await supabase.from("bookshelf").delete().eq("id", id);
    if (error) {
      setBookshelf(prev);
      notify("Could not remove book", "error");
    } else {
      notify("Removed from your bookshelf", "success");
    }
  }


  function notify(message, type = "info") {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2400);
  }

  return (
    <div>
      <NavBar openModal={openModal} openBookshelf={openShelf}></NavBar>

      <div className="flex flex-col items-center justify-center min-h-screen gap-12 p-8">
       {searchResult.length === 0 && ( 
        <>
          <h1 className="text-9xl font-bold">unread</h1>
          <p className="text-2xl text-[#3B332B]/80">Discover your next great read. Search thousands of books and build your personal library.</p>
        </>)}

        <SearchBar
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          onAdd={handleAddToBookshelf}
          savedOlKeys={savedOlKeys}
        />
      </div>

      <Drawer isOpen={isShelfOpen} onClose={closeShelf} title={user ? `My Bookshelf (${bookshelf.length})` : 'My Bookshelf'}>
        {!user ? (
          <div className="text-[#3B332B]/80">
            <p>Please sign in to view your bookshelf.</p>
            <div className="mt-4">
              <button
                className="bg-[#493F37] text-[#F9F8F6] rounded-lg px-5 py-2 shadow-sm hover:bg-[#3B332B]"
                onClick={() => {
                  closeShelf();
                  openModal();
                }}
              >
                Sign in
              </button>
            </div>
          </div>
        ) : (
          <>
            {bookshelf.length === 0 ? (
              <p className="text-[#3B332B]/70">Your bookshelf is empty.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {bookshelf.map((item) => (
                  <BookshelfItem key={item.id} item={item} onRemove={handleRemoveFromBookshelf} />
                ))}
              </div>
            )}
          </>
        )}
      </Drawer>
      {isModalOpen && <Modal closeModal={closeModal}/>}
      <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto rounded-lg px-4 py-3 text-sm shadow-md ring-1 ring-black/5 ${
              t.type === "error"
                ? "bg-red-50 text-red-800"
                : t.type === "success"
                ? "bg-emerald-50 text-emerald-800"
                : "bg-[#F4F3ED] text-[#3B332B]"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  )
}
