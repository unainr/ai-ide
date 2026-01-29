'use server';

import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';
import { inngest } from '@/inngest/client';

export async function chatAction(
  siteId: string, // NEW: site ID to update
  messages: { role: 'user' | 'assistant'; content: string }[]
) {
  // 1️⃣ Generate AI response
  const { text } = await generateText({
    model: groq('openai/gpt-oss-120b'),
    messages,
    system: 'You are a helpful AI assistant that can also update code projects based on user requests.',

  });

  // 2️⃣ Trigger Inngest to update the site asynchronously
  try {
    await inngest.send({
      name: 'site/update.from.chat', // your Inngest event name
      data: {
        siteId,
        message: messages[messages.length - 1].content, // latest user message
      },
    });
  } catch (err) {
    console.error('Failed to trigger Inngest:', err);
  }

  // 3️⃣ Return AI text to frontend
  return text;
}
