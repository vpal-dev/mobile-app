import { anthropic } from "@/utils/anthropic";

export async function POST(request: Request) {
  const body = await request.json()
  const { grade, photos } = body

  const PROMPT = `
  Grade the above provided finished assignment for ${grade}th grade.
  Create it in markdown format. And provide feedback on the assignment. Suggest improvements and provide a grade.

  create a JSON with \`title\`, \`shortDescription\` & \`content\` field. And only return a JSON, not simple text.
  You are connected with a service that expects that you will only return a proper JSON.
  `

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1000,
    temperature: 0,
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