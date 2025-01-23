import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    const res = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.MONDAY_TOKEN ?? "",
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Monday API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
