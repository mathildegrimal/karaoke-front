import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cool karaoke - Random song",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="flex items-center">{children}</main>;
}
