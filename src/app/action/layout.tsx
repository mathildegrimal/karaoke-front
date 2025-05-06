import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cool karaoke",
  description: "A cool karaoke web app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-center">
      {children}
      <a className="underline text-blue-400" href="/">
        Logout
      </a>
    </main>
  );
}
