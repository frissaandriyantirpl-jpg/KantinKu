export interface MenuItem {
  id: string;
  nama: string;
  harga: number;
  kategori: string;
  stok: number;
}

export const menu: MenuItem[] = [
  { id: "1", nama: "Nasi Goreng Spesial", harga: 12000, kategori: "Makanan", stok: 15 },
  { id: "2", nama: "Mie Ayam", harga: 10000, kategori: "Makanan", stok: 8 },
  { id: "3", nama: "Es Teh Manis", harga: 3000, kategori: "Minuman", stok: 40 },
  { id: "4", nama: "Jus Alpukat", harga: 8000, kategori: "Minuman", stok: 0 },
  { id: "5", nama: "Pisang Goreng", harga: 5000, kategori: "Camilan", stok: 20 },
  { id: "6", nama: "Risol Mayo", harga: 4000, kategori: "Camilan", stok: 3 },
];

export function rupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
}