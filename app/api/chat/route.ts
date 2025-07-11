import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText } from "ai";

export async function POST(req: Request) {

  const { messages } = await req.json();

  const apologist = createOpenAICompatible({
    name: 'apologist',
    apiKey: process.env.APOLOGIST_API_KEY,
    baseURL: `${process.env.APOLOGIST_API_URL}`,
  });

  const result = streamText({
    model: apologist('openai/gpt/4o'),
    providerOptions: {
      apologist: {
        response_format: { type: 'raw' },
      }
    },
    messages: messages,
  });

  return result.toDataStreamResponse();

}
