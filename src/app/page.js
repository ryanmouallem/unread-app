import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";


export default function Home() {
  return (
    <div>
      <NavBar></NavBar>

      <div className="flex flex-col items-center justify-center min-h-screen gap-12">
        <h1 className="text-9xl font-bold">unread</h1>
        <p className="text-2xl text-[#3B332B]/80">Discover your next great read. Search thousands of books and build your personal library.</p>

        <SearchBar />
        {/* <div className="relative w-full max-w-3xl">
          <input 
            className="w-full p-5 pr-32 rounded-lg bg-white"
            placeholder="Search for books, authors, or genres">
          </input>

          <button className="absolute right-2 top-2 bg-[#84AD99] text-[#493F37] font-semibold px-8 py-3 rounded-lg">Search</button>
      </div> */}
      </div>
    </div>
  )
}