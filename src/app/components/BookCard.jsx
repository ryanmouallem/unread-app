"use client";

import { useState } from "react";
import Image from "next/image";
import { Bookmark, Trash2 } from "lucide-react";

export default function BookCard({ book, variant = "search", onAdd, isSaved, onRemove, itemId }) {
  const [loaded, setLoaded] = useState(false);
  const author = Array.isArray(book.author_name)
    ? book.author_name.join(", ")
    : book.author_name;

  const src = `https://covers.openlibrary.org/a/id/${book.cover_i}-L.jpg`;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-xl">
      <div className="relative w-full aspect-[2/3] bg-[#E7E2DD]">
        {!loaded && <div className="absolute inset-0 animate-pulse bg-[#E7E2DD]" />}
        <Image
          src={src}
          alt={`${book.title} cover`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoadingComplete={() => setLoaded(true)}
          priority={false}
        />
      </div>

      <div className="mb-3 mt-3 px-3 text-[#493F37]">
        <h3 className="mb-2.5 text-xl font-semibold line-clamp-2">{book.title}</h3>
        <h4 className="text-lg font-medium opacity-[0.75] line-clamp-1">{author}</h4>
        <p className="opacity-[0.75]">Released: {book.first_publish_year}</p>
      </div>

      <div className="mt-auto px-3 pb-3 flex justify-center">
        {variant === "bookshelf" ? (
          <button
            className="flex w-full items-center justify-center gap-2 rounded-sm border border-[#E7E2DD] bg-white py-2 px-4 text-[#493F37] drop-shadow-sm hover:bg-[#F9F8F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#81A282]"
            onClick={() => onRemove?.(itemId)}
          >
            <Trash2 /> Remove from Bookshelf
          </button>
        ) : (
          <button
            disabled={isSaved}
            className={`flex items-center justify-center gap-2 rounded-sm py-2 px-9 drop-shadow-sm whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#81A282] ${
              isSaved
                ? "cursor-not-allowed bg-[#E7E2DD] text-[#493F37]/70"
                : "bg-[#81A282] text-white hover:bg-[#95A282]"
            }`}
            onClick={() => onAdd?.(book)}
          >
            <Bookmark /> {isSaved ? "Saved" : "Add to My Bookshelf"}
          </button>
        )}
      </div>
    </div>
  );
}
