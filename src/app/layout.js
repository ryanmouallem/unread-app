import { Onest, Playfair_Display } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "unread",
  description: "Discover books and build your personal bookshelf.",
  openGraph: {
    title: "unread",
    description: "Discover books and build your personal bookshelf.",
    url: "https://example.com",
    siteName: "unread",
    type: "website",
  },
};

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"]
});

const onest = Onest({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${onest.className} bg-[#F4F3ED] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
