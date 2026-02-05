'use server';

import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';
import { inngest } from '@/inngest/client';
import { db } from '@/drizzle/db';
import { siteTable } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function chatAction(
  siteId: string, // NEW: site ID to update
  messages: { role: 'user' | 'assistant'; content: string }[]
) {

   // 🔥 THIS LINE WAS MISSING (MOST IMPORTANT LINE)
  await db
    .update(siteTable)
    .set({ isUpdating: true })
    .where(eq(siteTable.id, siteId));
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
