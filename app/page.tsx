import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 px-6 text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Selamat Datang di <span className="text-orange-600">KantinKu</span> 🍲
        </h1>
        <p className="text-lg text-gray-600">
          Pesan makanan dan minuman favoritmu di kantin sekolah dengan cepat, mudah, dan tanpa antre panjang.
        </p>
        <div>
          <Link
            href="/menu"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium px-8 py-3 rounded-full shadow-md transition"
          >
            Lihat Menu Kantin
          </Link>
        </div>
      </div>
    </main>
  );
}