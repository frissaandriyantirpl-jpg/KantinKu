
"use client";

import { useEffect, useState } from "react";

interface Props {
  menuId: number;
}

export default function TombolFavorit({ menuId }: Props) {
  const [favorit, setFavorit] = useState(false);

  useEffect(() => {
    const data: number[] = JSON.parse(
      localStorage.getItem("favorit") || "[]"
    );

    setFavorit(data.includes(menuId));
  }, [menuId]);

  function ubahFavorit() {
    const data: number[] = JSON.parse(
      localStorage.getItem("favorit") || "[]"
    );

    let hasil: number[];

    if (data.includes(menuId)) {
      hasil = data.filter((id) => id !== menuId);
    } else {
      hasil = [...data, menuId];
    }

    localStorage.setItem("favorit", JSON.stringify(hasil));

    setFavorit(hasil.includes(menuId));

    window.dispatchEvent(new Event("favorit-berubah"));
  }

  return (
    <button
      onClick={ubahFavorit}
      className={`rounded-xl border px-5 py-3 font-bold transition ${
        favorit
          ? "border-red-200 bg-red-50 text-red-600"
          : "border-slate-200 bg-white text-slate-600 hover:text-red-500"
      }`}
    >
      {favorit ? "♥ Favorit" : "♡ Tambah Favorit"}
    </button>
  );
}
