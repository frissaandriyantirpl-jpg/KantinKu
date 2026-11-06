import { menu, rupiah } from "@/data/menu";
import Link from "next/link";

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-white to-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left border-b border-gray-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Katalog Menu <span className="text-orange-600">KantinKu</span> 🍲
          </h1>
          <p className="text-gray-600 mt-2 text-base">
            Pilih dan nikmati makanan atau minuman favoritmu hari ini tanpa antre.
          </p>
        </div>

        {/* Grid Kartu Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {menu.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Bagian Gambar / Placeholder Menu */}
                <div className="h-40 bg-gradient-to-tr from-orange-100 to-orange-50 flex items-center justify-center text-orange-600 font-semibold text-lg group-hover:scale-105 transition-transform duration-500 relative">
                  <span className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {item.nama}
                </div>

                {/* Informasi Menu */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-orange-50 text-orange-700 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                      {item.kategori}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${item.stok === 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                      {item.stok === 0 ? "Habis" : `Stok: ${item.stok}`}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-gray-800 group-hover:text-orange-600 transition-colors">
                    {item.nama}
                  </h3>
                  
                  <p className="text-orange-600 font-extrabold text-lg mt-2">
                    {rupiah(item.harga)}
                  </p>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="p-5 pt-0">
                <Link
                  href={`/menu/${item.id}`}
                  className="block text-center w-full bg-gray-900 hover:bg-orange-600 text-white py-2.5 rounded-xl font-medium shadow-sm transition-colors duration-200 text-sm"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}