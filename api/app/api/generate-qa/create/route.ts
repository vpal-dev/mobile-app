import { anthropic } from "@/utils/anthropic";

export async function POST(request: Request) {
  const body = await request.json()
  const { grade, topic, noOfQuestions, type } = body

  const PROMPT = `
  Generate an assessment of "${type}" type for ${grade}th grade and for the topic "${topic}, that contains a total of only ${noOfQuestions} questions.
  Create it in markdown format with a title, and list of questions.

  create a JSON with \`title\`, \`shortDescription\` & \`content\` field. And only return a JSON, not simple text.
  It is connected with a service that expects that you will only return a proper JSON.
  `

  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1000,
    temperature: 0,
    messages: [{ role: "user", content: [{ type: 'text', text: PROMPT }] }]
  });
  const aiRes = msg.content;

  return Response.json({ content: aiRes })
}
