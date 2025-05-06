import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cool karaoke - Random singers",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="flex items-center">{children}</main>;
}
