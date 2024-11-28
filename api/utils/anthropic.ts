type Options = {
  messages: Array<{
    role: string,
    content: Array<{
      type: string,
      text?: string,
      source?: { type: string, media_type: string, data: string }
    }>
  }>
}

export class Anthropic {
  static async message({ messages }: Options) {
    const headers = new Headers();
    headers.set("content-type", "application/json");
    headers.set("x-api-key", process.env.CLAUDE_API_KEY || "");
    headers.set("anthropic-version", "2023-06-01")


    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers,
      body: JSON.stringify({ model: "claude-3-5-sonnet-20241022", max_tokens: 1000, temperature: 0, messages })
    });

    return await res.json();
  }
}

