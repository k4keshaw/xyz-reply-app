import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Reply Suggester — XYZ Corp",
  description: "Type / in any comment box to get AI-powered reply suggestions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
