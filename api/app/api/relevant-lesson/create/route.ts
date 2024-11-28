import { Anthropic } from "@/utils/anthropic";

export const runtime = "edge";

export async function POST(request: Request) {
  const body = await request.json()
  const { learningObjective, classProfile } = body

  const PROMPT = `
  Create a relevant lesson plan.
  The learning objective is "${learningObjective}" and class profile is "${classProfile}".
  Create it in markdown format. And suggest real-world examples, local context, and interactive activities.
  Keep your content fresh and relatable for today's students.

  create a JSON with \`title\`, \`shortDescription\` & \`content\` field. And only return a JSON, not simple text.
  You are connected with a service that expects that you will only return a proper JSON.
  `

  const msg = await Anthropic.message({
    messages: [{ role: "user", content: [{ type: 'text', text: PROMPT }] }]
  });
  const aiRes = msg.content;

  return Response.json({ content: aiRes })
}
