import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date Night 💛",
  description: "O mică întrebare pentru o seară specială",
  robots: { index: false, follow: false },
};

export default function DateNightLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
