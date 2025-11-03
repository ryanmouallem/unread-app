import { Onest, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"]
});

const onest = Onest({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.className} ${onest.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
