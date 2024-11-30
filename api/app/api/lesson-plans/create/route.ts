import { Anthropic } from "@/utils/anthropic";
import { createLessonPlanPrompt } from "@/utils/prompts";
import { getUserHeaders } from "@/utils/user-headers";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const body = await request.json()

  const headers = getUserHeaders(request);
  const PROMPT = createLessonPlanPrompt(headers, body);

  const msg = await Anthropic.message({
    messages: [{ role: "user", content: [{ type: 'text', text: PROMPT }] }]
  });
  const aiRes = msg.content;

  return Response.json({ content: aiRes })
}
