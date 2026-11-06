import { menu, rupiah } from "@/data/menu";
import Link from "next/link";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="inline-block bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-blue-200">
              Kantin Digital School
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Katalog Menu <span className="text-blue-600">KantinKu</span> 🍲
            </h1>
            <p className="text-slate-500 mt-2 text-sm sm:text-base max-w-xl">
              Pesan makanan & minuman favoritmu secara cepat, lezat, dan tanpa antrean.
            </p>
          </div>
          
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs text-slate-600 font-medium shadow-sm">
            Total Menu: <span className="text-blue-600 font-bold">{menu.length} Item</span>
          </div>
        </div>

        {/* Grid Kartu Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {menu.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Header / Banner Menu */}
                <div className="h-44 bg-gradient-to-br from-blue-500/10 via-slate-100 to-blue-50 flex items-center justify-center relative overflow-hidden">
                  {/* Badge Status Stok */}
                  <span
                    className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full shadow-sm border ${
                      item.stok === 0
                        ? "bg-rose-50 border-rose-200 text-rose-600"
                        : "bg-emerald-50 border-emerald-200 text-emerald-700"
                    }`}
                  >
                    {item.stok === 0 ? "Habis" : `Stok: ${item.stok}`}
                  </span>

                  {/* Text Placeholder Nama Menu */}
                  <span className="text-lg font-bold text-blue-900/70 group-hover:scale-105 transition-transform duration-300 text-center px-4">
                    {item.nama}
                  </span>
                </div>

                {/* Info Menu */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-3 py-1 rounded-md border border-blue-100 uppercase tracking-wider">
                      {item.kategori}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                    {item.nama}
                  </h3>
                  
                  <div className="mt-4 flex items-baseline justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs text-slate-400 font-medium">Harga Satuan</span>
                    <span className="text-2xl font-black text-blue-600">
                      {rupiah(item.harga)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tombol Detail */}
              <div className="p-6 pt-0">
                <Link
                  href={`/menu/${item.id}`}
                  className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md shadow-blue-500/10 transition-all duration-200 text-sm"
                >
                  Lihat Detail Menu
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}