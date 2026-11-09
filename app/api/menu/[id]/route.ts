import { NextResponse } from "next/server";
import { menu } from "@/data/menu";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const dataMenu = menu.find((item) => String(item.id) === id);

  if (!dataMenu) {
    return NextResponse.json(
      { message: "Menu tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json(dataMenu);
}
