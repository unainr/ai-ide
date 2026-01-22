'use server';

import { streamText } from 'ai';
import { groq } from '@ai-sdk/groq';

export async function chatAction(messages: {
  role: 'user' | 'assistant';
  content: string;
}[]) {
  const result = await streamText({
    model: groq('llama3-70b-8192'),
    messages,
    system: 'You are a helpful AI assistant.',
  });

  return result.toTextStreamResponse();
}
