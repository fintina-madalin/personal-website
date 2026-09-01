import type { Metadata } from "next";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Date Night 💖",
  description: "A tiny cute quiz for a special evening",
  robots: { index: false, follow: false },
};

export default function DateNightLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={fredoka.className}>{children}</div>;
}
