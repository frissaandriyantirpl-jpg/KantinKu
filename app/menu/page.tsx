import { menu, rupiah } from "@/data/menu";
import Link from "next/link";

export default function MenuPage() {
  return (
    <main className="p-8 max-w-5xl mx-auto min-h-screen bg-gray-50 text-gray-900">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold">Katalog Menu Kantin</h1>
        <p className="text-gray-600 mt-1">Pilih menu favoritmu hari ini</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menu.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center text-gray-400 font-medium">
                {item.nama}
              </div>
              <h3 className="font-bold text-lg">{item.nama}</h3>
              <p className="text-gray-600 font-medium mt-1">{rupiah(item.harga)}</p>
              
              <div className="mt-3 flex items-center justify-between">
                <span className="bg-orange-100 text-orange-800 text-xs px-2.5 py-1 rounded-full font-medium">
                  {item.kategori}
                </span>
                <span className={`text-xs font-medium ${item.stok === 0 ? "text-red-500 font-bold" : "text-gray-500"}`}>
                  {item.stok === 0 ? "Habis" : `Stok: ${item.stok}`}
                </span>
              </div>
            </div>

            <Link
              href={`/menu/${item.id}`}
              className="mt-4 block text-center bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition text-sm"
            >
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}