"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function BookshelfItem({ item, onRemove }) {
  const src = item.cover_i
    ? `https://covers.openlibrary.org/a/id/${item.cover_i}-L.jpg`
    : undefined;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#E7E2DD] bg-white p-3 shadow-sm transition hover:shadow-md">
      <div className="relative h-24 w-16 overflow-hidden rounded-sm bg-[#E7E2DD]">
        {src && (
          <Image
            src={src}
            alt={`${item.title} cover`}
            fill
            sizes="64px"
            className="object-cover"
          />
        )}
      </div>
      <div className="min-w-0 flex-1 text-[#493F37]">
        <div className="line-clamp-2 font-medium">{item.title}</div>
        {item.author && (
          <div className="text-sm opacity-75 line-clamp-1">{item.author}</div>
        )}
        {item.year && (
          <div className="text-xs opacity-60">Released: {item.year}</div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="inline-flex items-center gap-1 rounded-md border border-[#E7E2DD] bg-white px-3 py-1.5 text-sm text-[#493F37] shadow-sm hover:bg-[#F9F8F6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#81A282]"
          onClick={() => onRemove?.(item.id)}
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
}

