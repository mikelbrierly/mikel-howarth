import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/";
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SECRET_TOKEN) {
    return new NextResponse(
      JSON.stringify({
        message: "Invalid Token",
      }),
      {
        status: 401,
        statusText: "Unauthorized",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  revalidatePath(path);

  return NextResponse.json({ revalidated: true });
}
