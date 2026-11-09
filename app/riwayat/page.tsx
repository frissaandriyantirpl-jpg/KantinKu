"use client";
import { useState, useEffect } from "react";

export default function RiwayatPage() {
  const [riwayat, setRiwayat] = useState<any[]>([]);

  useEffect(() => {
    // Contoh mengambil data riwayat dari localStorage
    const data = localStorage.getItem("riwayat_pesanan");
    if (data) setRiwayat(JSON.parse(data));
  }, []);

  const handleHapusRiwayat = () => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus seluruh riwayat pesanan?");
    if (konfirmasi) {
      localStorage.removeItem("riwayat_pesanan");
      setRiwayat([]);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Riwayat Pesanan</h1>
        {riwayat.length > 0 && (
          <button
            onClick={handleHapusRiwayat}
            className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600 transition"
          >
            Hapus Riwayat
          </button>
        )}
      </div>

      {riwayat.length === 0 ? (
        <p className="text-gray-500">Belum ada riwayat pesanan.</p>
      ) : (
        <div className="space-y-3">
          {riwayat.map((item, index) => (
            <div key={index} className="p-4 border rounded shadow-sm">
              <p className="font-semibold">{item.nama}</p>
              <p className="text-sm text-gray-600">Rp {item.harga}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}