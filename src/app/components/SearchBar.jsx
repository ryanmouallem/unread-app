"use client"

import { useState } from "react"

export default function SearchBar() {

    const [search, setSearch] = useState("");

    const [searchResult, setSearchResult] = useState([]);

    async function handleSearch() {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
        const data = await response.json();

        setSearchResult(data.items);
        console.log(data);
    }

    return(
        <div className="relative w-full max-w-3xl">
          <input 
            className="w-full p-5 pr-32 rounded-lg bg-white"
            placeholder="Search for books, authors, or genres"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            >
          </input>

          <button className="absolute right-2 top-2 bg-[#84AD99] text-[#493F37] font-semibold px-8 py-3 rounded-lg cursor-pointer hover:bg-[#6B9A82]"
          onClick={(e) => {
                e.preventDefault();
                handleSearch();
            }}>Search</button>

            {searchResult.map((book) => (
                <div key={book.id}>
                    <img src={book.volumeInfo.imageLinks?.thumbnail} alt="" />
                    <h3>{book.volumeInfo.title}</h3>
                    <p>{book.volumeInfo.authors}</p>
                </div>
            ))}
      </div>
    )
}