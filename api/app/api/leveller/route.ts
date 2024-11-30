import { Anthropic } from "@/utils/anthropic";
import { levellerPrompt } from "@/utils/prompts";
import { getUserHeaders } from "@/utils/user-headers";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { photos } = body

  const headers = getUserHeaders(request);
  const PROMPT = levellerPrompt(headers, body);

  const msg = await Anthropic.message({
    messages: [
      {
        role: 'user',
        content: [{
          type: 'image',
          source: {
            type: 'base64',
            media_type: photos[0].type,
            data: photos[0].base64
          }
        }]
      },
      { role: "user", content: [{ type: 'text', text: PROMPT }] }
    ]
  });
  const aiRes = msg.content;

  return Response.json({ content: aiRes })
}
