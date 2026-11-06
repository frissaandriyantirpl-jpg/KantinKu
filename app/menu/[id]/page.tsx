"use client";

import { useState } from "react";
import { menu, rupiah } from "@/data/menu";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";

interface DetailProps {
  params: Promise<{ id: string }>;
}

export default function DetailPage({ params }: DetailProps) {
  // Karena params berupa Promise di Next.js App Router terbaru, kita unwrap menggunakan React.use atau state
  return <DetailContent params={params} />;
}

import { use } from "react";

function DetailContent({ params }: DetailProps) {
  const { id } = use(params);
  const router = useRouter();
  const item = menu.find((m) => m.id === id);

  if (!item) {
    notFound();
  }

  const isHabis = item.stok === 0;
  const [jumlah, setJumlah] = useState<number>(isHabis ? 0 : 1);
  const [pesan, setPesan] = useState<string>("");

  // Hitung jumlah yang sudah ada di keranjang untuk item ini
  const getKeranjangLokal = () => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem("keranjang");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  const keranjang = getKeranjangLokal();
  const itemDiKeranjang = keranjang.find((k: any) => k.id === id);
  const qtyDiKeranjang = itemDiKeranjang ? itemDiKeranjang.jumlah : 0;

  const sisaStok = item.stok - qtyDiKeranjang;

  const handleTambahJumlah = (delta: number) => {
    const baru = jumlah + delta;
    if (baru >= 1 && baru <= sisaStok) {
      setJumlah(baru);
      setPesan("");
    }
  };

  const handleTambahKeKeranjang = () => {
    if (jumlah < 1 || jumlah > sisaStok) {
      setPesan(`Jumlah tidak valid atau melebihi sisa stok (${sisaStok}).`);
      return;
    }

    const cart = getKeranjangLokal();
    const index = cart.findIndex((k: any) => k.id === id);

    if (index > -1) {
      cart[index].jumlah += jumlah;
    } else {
      cart.push({ id: item.id, jumlah });
    }

    localStorage.setItem("keranjang", JSON.stringify(cart));
    window.dispatchEvent(new Event("keranjang-berubah"));
    
    alert("Ditambahkan ke keranjang.");
    router.push("/keranjang");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/menu"
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-6 transition"
        >
          ← Kembali ke Katalog Menu
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-blue-500/10 via-slate-100 to-blue-50 flex items-center justify-center relative">
            <span
              className={`absolute top-6 right-6 text-sm font-bold px-4 py-1.5 rounded-full border shadow-sm ${
                isHabis || sisaStok <= 0
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "bg-emerald-50 border-emerald-200 text-emerald-700"
              }`}
            >
              {isHabis || sisaStok <= 0 ? "Habis" : `Stok Tersedia: ${sisaStok}`}
            </span>

            <h1 className="text-3xl font-black text-blue-900/80 px-6 text-center">
              {item.nama}
            </h1>
          </div>

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
              <span className="text-slate-500 font-medium">Harga Satuan</span>
              <span className="text-3xl font-black text-blue-600">
                {rupiah(item.harga)}
              </span>
            </div>

            {!isHabis && sisaStok > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="font-semibold text-slate-700 text-sm">Atur Jumlah Pesanan:</span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleTambahJumlah(-1)}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-100 shadow-sm"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold text-slate-900 w-8 text-center">
                      {jumlah}
                    </span>
                    <button
                      onClick={() => handleTambahJumlah(1)}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-100 shadow-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm font-semibold text-slate-600 pt-2">
                  <span>Total Harga:</span>
                  <span className="text-2xl font-black text-blue-600">
                    {rupiah(item.harga * jumlah)}
                  </span>
                </div>

                {pesan && <p className="text-rose-500 text-xs font-semibold">{pesan}</p>}

                <button
                  onClick={handleTambahKeKeranjang}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition text-base"
                >
                  Tambah ke Keranjang
                </button>
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-2xl text-center font-bold">
                Menu ini habis.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}