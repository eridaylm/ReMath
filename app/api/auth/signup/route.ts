import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
    }

    // Cek apakah user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
      } else {
        // User belum terverifikasi, kita update saja kode barunya
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
        const verifyCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 menit

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
          where: { email },
          data: {
            name,
            password: hashedPassword,
            verifyCode,
            verifyCodeExpires,
          },
        });

        await sendVerificationEmail(email, verifyCode);
        return NextResponse.json({ message: "Kode OTP baru telah dikirim ke email." });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate 6-digit OTP
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 menit

    // Simpan ke database
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpires,
      },
    });

    // Kirim email
    await sendVerificationEmail(email, verifyCode);

    return NextResponse.json({ message: "Registrasi berhasil, silakan periksa email Anda untuk verifikasi." });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
