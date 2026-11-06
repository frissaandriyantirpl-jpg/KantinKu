import { menu, rupiah } from "@/data/menu";
import Link from "next/link";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center sm:text-left border-b border-slate-800 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="inline-block bg-amber-500/10 text-amber-400 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-amber-500/20">
              Kantin Digital School
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Katalog Menu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">KantinKu</span> 🍲
            </h1>
            <p className="text-slate-400 mt-2 text-base max-w-xl">
              Pesan makanan & minuman favoritmu secara cepat, hangat, dan tanpa antrean.
            </p>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-400 font-medium">
            Total Menu: <span className="text-amber-400 font-bold">{menu.length} Item</span>
          </div>
        </div>

        {/* Grid Kartu Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {menu.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 rounded-3xl border border-slate-800/80 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Header / Banner Menu */}
                <div className="h-44 bg-gradient-to-br from-amber-500/20 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors duration-300"></div>
                  
                  {/* Badge Status Stok */}
                  <span
                    className={`absolute top-4 right-4 text-xs font-extrabold px-3 py-1 rounded-full backdrop-blur-md shadow-md border ${
                      item.stok === 0
                        ? "bg-red-500/20 border-red-500/40 text-red-400"
                        : "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                    }`}
                  >
                    {item.stok === 0 ? "Habis" : `Stok: ${item.stok}`}
                  </span>

                  {/* Placeholder Nama Menu Large */}
                  <span className="text-xl font-black text-amber-200/90 group-hover:scale-110 transition-transform duration-300 text-center px-4 drop-shadow-md">
                    {item.nama}
                  </span>
                </div>

                {/* Info Menu */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="bg-amber-400/10 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-md border border-amber-400/20 uppercase tracking-wider">
                      {item.kategori}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-2xl text-white group-hover:text-amber-400 transition-colors duration-200">
                    {item.nama}
                  </h3>
                  
                  <div className="mt-4 flex items-baseline justify-between border-t border-slate-800/80 pt-4">
                    <span className="text-xs text-slate-400">Harga Satuan</span>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                      {rupiah(item.harga)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="p-6 pt-0">
                <Link
                  href={`/menu/${item.id}`}
                  className="block text-center w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold py-3 rounded-2xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 text-sm tracking-wide"
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