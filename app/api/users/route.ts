import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Users endpoint is working." });
}

export async function POST() {
  return NextResponse.json(
    { message: "POST /api/users is not implemented yet." },
    { status: 501 }
  );
}
