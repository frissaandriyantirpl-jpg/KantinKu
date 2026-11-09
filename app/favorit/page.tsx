
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { MenuItem } from "@/data/menu";

export default function FavoritPage() {
  const [dataMenu, setDataMenu] = useState<MenuItem[]>([]);
  const [favorit, setFavorit] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ambilFavorit = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const ids: string[] = JSON.parse(
        localStorage.getItem("favorit") || "[]"
      ).map((id: string | number) => String(id));

      setFavorit(ids);

      const response = await fetch("/api/menu");

      if (!response.ok) {
        throw new Error("Gagal mengambil data menu.");
      }

      const semuaMenu: MenuItem[] = await response.json();

      setDataMenu(
        semuaMenu.filter((item) =>
          ids.includes(String(item.id))
        )
      );
    } catch {
      setError("Gagal memuat menu favorit.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    ambilFavorit();

    window.addEventListener("favorit-berubah", ambilFavorit);

    return () => {
      window.removeEventListener("favorit-berubah", ambilFavorit);
    };
  }, [ambilFavorit]);

  function hapusFavorit(id: string) {
    const hasil = favorit.filter(
      (item) => item !== id
    );

    localStorage.setItem(
      "favorit",
      JSON.stringify(hasil)
    );

    window.dispatchEvent(
      new Event("favorit-berubah")
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-7xl">

        <Link
          href="/menu"
          className="font-semibold text-blue-600"
        >
          ← Kembali ke Menu
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold text-slate-900">
          ♥ Menu Favorit
        </h1>

        <p className="mt-2 text-slate-500">
          Kumpulan makanan dan minuman pilihanmu.
        </p>

        {loading ? (
          <p className="mt-10 text-center text-slate-500">
            Memuat...
          </p>
        ) : error ? (
          <p className="mt-10 text-center text-red-500">
            {error}
          </p>
        ) : dataMenu.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-12 text-center">

            <p className="text-5xl">♡</p>

            <h2 className="mt-4 text-xl font-bold">
              Belum ada menu favorit.
            </h2>

            <p className="mt-2 text-slate-500">
              Tambahkan menu favoritmu dari halaman detail.
            </p>

            <Link
              href="/menu"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
            >
              Jelajahi Menu
            </Link>

          </div>
        ) : (
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {dataMenu.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >

                <div className="flex h-44 items-center justify-center bg-blue-50 text-7xl">
                  {item.kategori === "Makanan"
                    ? "🍛"
                    : item.kategori === "Minuman"
                    ? "🧋"
                    : "🥟"}
                </div>

                <div className="p-5">

                  <span className="text-xs font-bold uppercase text-blue-600">
                    {item.kategori}
                  </span>

                  <h2 className="mt-2 text-xl font-extrabold">
                    {item.nama}
                  </h2>

                  <p className="mt-2 font-bold text-blue-600">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(item.harga)}
                  </p>

                  <div className="mt-5 flex gap-2">

                    <Link
                      href={`/menu/${item.id}`}
                      className="flex-1 rounded-xl bg-blue-600 py-3 text-center text-sm font-bold text-white"
                    >
                      Detail Menu
                    </Link>

                    <button
                      onClick={() =>
                        hapusFavorit(String(item.id))
                      }
                      className="rounded-xl border border-red-200 px-4 py-3 font-bold text-red-500"
                    >
                      Hapus
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}
