import { menu, rupiah } from "@/data/menu";

export default function HomePage() {
  return (
    <main className="p-8 max-w-5xl mx-auto min-h-screen bg-gray-50 text-gray-900">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold">KantinKu 🍲</h1>
        <p className="text-gray-600 mt-1">
          Pilih dan pesan menu favorit sekolahmu
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Daftar Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menu.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center text-gray-400 font-medium">
                {item.nama}
              </div>
              <h3 className="font-bold text-lg">{item.nama}</h3>
              <p className="text-gray-600 font-medium mt-1">
                {rupiah(item.harga)}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span className="bg-orange-100 text-orange-800 text-xs px-2.5 py-1 rounded-full font-medium">
                  {item.kategori}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  Stok: {item.stok}
                </span>
              </div>

              <button
                disabled={item.stok === 0}
                className={`w-full mt-4 py-2 rounded-lg font-medium transition text-sm ${
                  item.stok > 0
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {item.stok > 0 ? "+ Tambah" : "Stok Habis"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
