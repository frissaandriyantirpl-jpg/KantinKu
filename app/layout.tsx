import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KantinKu",
  description: "Aplikasi Pemesanan Kantin Sekolah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen text-gray-900`}>
        {/* Navbar / Navigasi Utama */}
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold text-orange-600">KantinKu</h1>
            
            <nav className="flex space-x-6 text-sm font-medium">
              <Link href="/" className="hover:text-orange-500 transition">
                Beranda
              </Link>
              <Link href="/menu" className="hover:text-orange-500 transition">
                Menu
              </Link>
              <Link href="/favorit" className="hover:text-orange-500 transition">
                Favorit
              </Link>
              <Link href="/keranjang" className="hover:text-orange-500 transition">
                Keranjang
              </Link>
              <Link href="/riwayat" className="hover:text-orange-500 transition">
                Riwayat
              </Link>
            </nav>
          </div>
        </header>

        {/* Konten Halaman */}
        <main>{children}</main>
      </body>
    </html>
  );
}