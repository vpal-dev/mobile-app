import { Anthropic } from "@/utils/anthropic";

export const runtime = "edge";

export async function POST(request: Request) {
  const body = await request.json()
  const { grade, description, photos } = body

  const PROMPT = `
  Recreate the above provided assessment for ${grade}th grade to align with "${description}".
  Create it in markdown format.

  create a JSON with \`title\`, \`shortDescription\` & \`content\` field. And only return a JSON, not simple text.
  You are connected with a service that expects that you will only return a proper JSON.
  `

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
