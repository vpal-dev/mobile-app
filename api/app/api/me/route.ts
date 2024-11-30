import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const customHeader = req.headers.get('X-Custom-Header'); // 'custom-value'
  console.log('This is a route log');

  return Response.json({ customHeader })
}
