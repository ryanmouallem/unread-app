import { Bookmark } from "lucide-react"


export default function BookCard({ book }) {

    return(
        <div className="flex flex-col rounded-md max-w-xs overflow-hidden bg-white drop-shadow-lg">
            <img className="w-full" src={`https://covers.openlibrary.org/a/id/${book.cover_i}-L.jpg`} alt="" />
            <div className="px-3 p mb-3 text-[#493F37] mt-3">
                <h3 className="text-xl font-semibold mb-2.5">{book.title}</h3>
                <h4 className="text-lg font-medium opacity-[0.75]">{book.author_name}</h4>
                <p className="opacity-[0.75]">Released: {book.first_publish_year}</p>
            </div>
            <div className="self-center">
                <button className="flex items-center gap-2 bg-[#81A282] text-white rounded-sm py-2 px-9 mb-3 drop-shadow-sm hover:bg-[#95A282] mx-3">
                    <Bookmark />Add to My Bookshelf
                </button>
            </div>
        </div>
    )
}