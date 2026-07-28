import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dog Washer Connect",
  description:
    "A plataforma de profissionais sob demanda do mercado de banho e tosa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--dw-off-white)] text-[var(--dw-gray-900)] font-[var(--dw-font-body)]">
        {children}
      </body>
    </html>
  );
}
