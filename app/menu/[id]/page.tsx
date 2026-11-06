import { menu, rupiah } from "@/data/menu";
import { notFound } from "next/navigation";
import Link from "next/link";

interface DetailProps {
  params: Promise<{ id: string }>;
}

export default async function DetailPage({ params }: DetailProps) {
  const { id } = await params;
  const item = menu.find((m) => m.id === id);

  // Jika ID tidak ditemukan, tampilkan halaman 404
  if (!item) {
    notFound();
  }

  const isHabis = item.stok === 0;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/menu"
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6 transition"
        >
          ← Kembali ke Katalog Menu
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          {/* Header Banner */}
          <div className="h-64 bg-gradient-to-br from-blue-500/10 via-slate-100 to-blue-50 flex items-center justify-center relative">
            <span
              className={`absolute top-6 right-6 text-sm font-bold px-4 py-1.5 rounded-full border shadow-sm ${
                isHabis
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "bg-emerald-50 border-emerald-200 text-emerald-700"
              }`}
            >
              {isHabis ? "Habis" : `Stok Tersedia: ${item.stok}`}
            </span>

            <h1 className="text-3xl font-black text-blue-900/80 px-6 text-center">
              {item.nama}
            </h1>
          </div>

          {/* Konten Detail */}
          <div className="p-8 space-y-6">
            <div>
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-md border border-blue-100 uppercase tracking-wider">
                {item.kategori}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-3">
                {item.nama}
              </h2>
            </div>

            <div className="flex items-baseline justify-between border-y border-slate-100 py-4">
              <span className="text-slate-500 font-medium">Harga</span>
              <span className="text-3xl font-black text-blue-600">
                {rupiah(item.harga)}
              </span>
            </div>

            <button
              disabled={isHabis}
              className={`w-full py-4 rounded-xl font-bold transition text-base shadow-lg ${
                !isHabis
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              {!isHabis ? "Tambah ke Keranjang" : "Stok Habis"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
