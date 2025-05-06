import "./globals.css";
import type { Metadata } from "next";
import { Inter, Abril_Fatface, Gabarito } from "next/font/google";
import KaraokeIcon from "./components/icons/Karaoke";

const gabarito = Inter({ subsets: ["latin"] });

const abril = Abril_Fatface({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cool karaoke",
  description: "A cool karaoke web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${gabarito.className} h-screen flex justify-center items-center flex-col mx-auto`}
      >
        <div className=" flex flex-col items-center gap-4">
          <h1 className={`${abril.className} xs:text-3xl md:text-5xl`}>
            Cool-Karaoké
          </h1>
          <KaraokeIcon />
        </div>
        <main className="flex items-center">{children}</main>
      </body>
    </html>
  );
}
