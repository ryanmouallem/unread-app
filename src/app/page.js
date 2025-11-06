"use client"

import { useState } from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";


export default function Home() {

  const [searchResult, setSearchResult] = useState([]);
  
  return (
    <div>
      <NavBar></NavBar>

      <div className="flex flex-col items-center justify-center min-h-screen gap-12 p-8">
       {searchResult.length === 0 && ( 
        <>
          <h1 className="text-9xl font-bold">unread</h1>
          <p className="text-2xl text-[#3B332B]/80">Discover your next great read. Search thousands of books and build your personal library.</p>
        </>)}

        <SearchBar searchResult={searchResult} setSearchResult={setSearchResult}/>
      </div>
    </div>
  )
}