"use client"

import { useState } from "react"
import BookCard from "./BookCard";

export default function SearchBar({ searchResult, setSearchResult, onAdd, savedOlKeys }) {

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);


    async function handleSearch() {
        try {
          setLoading(true);
          setHasSearched(true);
          const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(search)}`)
          const data = await response.json();
          const filtered = (data.docs || []).filter(book => book.cover_i && book.edition_count > 2);
          setSearchResult(filtered);
        } catch (e) {
          setSearchResult([]);
        } finally {
          setLoading(false);
        }
    }

    return(
        <>
        <form
          className="relative w-full max-w-3xl"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input 
            className="w-full p-5 pr-32 rounded-lg bg-white focus:outline-none drop-shadow-md"
            placeholder="Search for books or authors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="submit"
            className="absolute right-2 top-2 rounded-lg bg-[#81A282] px-6 md:px-8 py-3 font-semibold text-white shadow-sm hover:bg-[#95A282] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#81A282] whitespace-nowrap"
          >
            Search
          </button>
      </form>
      <div className="mx-auto w-full max-w-7xl grid items-stretch gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {loading && (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md">
              <div className="aspect-[2/3] w-full animate-pulse bg-[#E7E2DD]" />
              <div className="space-y-2 p-3">
                <div className="h-5 w-3/4 animate-pulse rounded bg-[#E7E2DD]" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-[#E7E2DD]" />
                <div className="h-3 w-1/3 animate-pulse rounded bg-[#E7E2DD]" />
              </div>
              <div className="p-3">
                <div className="h-9 w-40 animate-pulse rounded bg-[#E7E2DD]" />
              </div>
            </div>
          ))
        )}

        {!loading && hasSearched && searchResult.length === 0 && (
          <div className="col-span-full text-center text-[#3B332B]/70">No results found.</div>
        )}

        {!loading && searchResult.map((book) => (
          <BookCard
            key={book.key}
            book={book}
            variant="search"
            onAdd={onAdd}
            isSaved={savedOlKeys?.has(book.key)}
          />
        ))}
      </div>
      </>
    )
}
