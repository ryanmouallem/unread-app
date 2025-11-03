import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { Library } from "lucide-react";

const playfair = Playfair_Display({ subsets: ["latin"] });


export default function NavBar() {
    return (
        <div className="flex justify-between items-center bg-[#F9F8F6] h-20 px-14 border-b border-[#E7E2DD]">
            <div className="flex items-center text-[#3B332B] gap-1">
                <Library size={36} />
                <h1 className="text-4xl font-bold text-[#3B332B]">unread</h1>
            </div>
            <nav>
                <ul className="flex gap-8 items-center text-[#3B332B] text-lg font-medium">
                    <li>
                        <Link href="/bookshelf">My Bookshelf</Link>
                        </li>
                    <li className="bg-[#493F37] text-[#F9F8F6] rounded-lg px-5 py-2 shadow-sm">
                        <Link href="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}