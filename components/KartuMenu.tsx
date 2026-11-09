interface MenuProps {
  item: {
    id: number | string;
    nama: string;
    harga: number;
    stok: number; // atau status: 'tersedia' | 'habis'
    gambar?: string;
  };
}

export default function KartuMenu({ item }: MenuProps) {
  const isHabis = item.stok === 0; // Ubah logika ini sesuai struktur data Anda

  return (
    <div
      className={`border rounded-lg p-4 shadow-sm relative ${isHabis ? "bg-gray-100 opacity-60" : "bg-white"}`}
    >
      <h2
        className={`font-bold text-lg ${isHabis ? "text-gray-500 line-through" : "text-gray-900"}`}
      >
        {item.nama}
      </h2>
      <p className="text-sm text-gray-600 mb-4">Rp {item.harga}</p>

      <button
        disabled={isHabis}
        className={`w-full py-2 rounded font-medium text-white transition ${
          isHabis
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-pink-600 hover:bg-pink-700"
        }`}
      >
        {isHabis ? "Habis" : "Pesan / Tambah"}
      </button>
    </div>
  );
}
