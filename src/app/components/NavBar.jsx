"use client";

import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Library } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient as createBrowserSupabaseClient } from "@/utils/supabase/client";
import { logout } from "@/app/login/actions";

const playfair = Playfair_Display({ subsets: ["latin"] });

export default function NavBar({ openModal, openBookshelf }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    supabase.auth
      .getUser()
      .then(({ data }) => setUser(data?.user ?? null))
      .finally(() => setLoading(false));
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  return (
    <div className="sticky top-0 z-40 flex justify-between items-center bg-[#F9F8F6] h-20 px-14 border-b border-[#E7E2DD]">
      <div className="flex items-center text-[#3B332B] gap-1">
        <Library size={36} />
        <h1 className="text-4xl font-bold text-[#3B332B]">
          <a href="/">unread</a>
        </h1>
      </div>
      <nav>
        <ul className="flex gap-8 items-center text-[#3B332B] text-lg font-medium">
          <li>
            <button className="hover:underline" onClick={openBookshelf}>
              My Bookshelf
            </button>
          </li>
          <li>
            {loading ? (
              <div className="h-10 w-28 rounded-lg bg-[#E7E2DD] animate-pulse" aria-hidden />
            ) : user ? (
              <form action={logout}>
                <button className="bg-white text-[#493F37] border border-[#E7E2DD] rounded-lg px-5 py-2 shadow-sm cursor-pointer hover:bg-[#F9F8F6]">
                  Sign out
                </button>
              </form>
            ) : (
              <button className="bg-[#493F37] text-[#F9F8F6] rounded-lg px-5 py-2 shadow-sm cursor-pointer hover:bg-[#3B332B]" onClick={openModal}>
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
