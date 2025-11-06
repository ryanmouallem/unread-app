"use client"

import { useState } from "react"
import BookCard from "./BookCard";

export default function SearchBar({ searchResult, setSearchResult}) {

    const [search, setSearch] = useState("");

    // const [searchResult, setSearchResult] = useState([]);

    async function handleSearch() {
        const response = await fetch(`https://openlibrary.org/search.json?q=${search}`)
        const data = await response.json();

        const filtered = data.docs.filter(book => 
          book.cover_i && 
          book.edition_count > 2
        );
        setSearchResult(filtered);
        console.log(data);
    }

    return(
        <>
        <div className="relative w-full max-w-3xl">
          <input 
            className="w-full p-5 pr-32 rounded-lg bg-white focus:outline-none drop-shadow-md"
            placeholder="Search for books or authors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            >
          </input>

          <button className="absolute right-2 top-2 bg-[#81A282] text-[#493F37] font-semibold px-8 py-3 rounded-lg cursor-pointer hover:bg-[#61A282]"
          onClick={(e) => {
                e.preventDefault();
                handleSearch();
            }}>Search</button>
      </div>
      <div className="grid grid-cols-4 gap-6">
            {searchResult.map((book) => (
                <BookCard key={book.key} book={book}/>
                ))}
      </div>
      </>
    )
}