import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "Email dan kode harus diisi" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: "Akun sudah terverifikasi sebelumnya" }, { status: 200 });
    }

    if (user.verifyCode !== code) {
      return NextResponse.json({ error: "Kode verifikasi salah" }, { status: 400 });
    }

    if (!user.verifyCodeExpires || user.verifyCodeExpires < new Date()) {
      return NextResponse.json({ error: "Kode verifikasi telah kedaluwarsa" }, { status: 400 });
    }

    // Update user sebagai terverifikasi
    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        verifyCode: null,
        verifyCodeExpires: null,
      },
    });

    return NextResponse.json({ message: "Verifikasi berhasil" });
  } catch (error) {
    console.error("Verify Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
