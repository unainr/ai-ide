import { db } from "@/drizzle/db";
import { messageTable, siteTable } from "@/drizzle/schema";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import { eq } from "drizzle-orm";
import SystemPrompt from "@/constant";
import { inngest } from "./client";
import { groq } from "@ai-sdk/groq";
import { safeParseJSON } from "@/lib/utils";

const openrouter = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

 const SiteSchema = z.object({
  files: z.record(
    z.string(),
    z.object({
      code: z.string(),
    })
  ),
  dependencies: z.record(z.string(), z.string()),
});

export const generateSiteCode = inngest.createFunction(
  { 
    id: "generate-site-code",
    retries: 2,
  },
  { event: "site/generate.code" },
  async ({ event, step }) => {
    const { siteId, prompt } = event.data;

    const code = await step.run("generate-ai-code", async () => {
      const { object } = await generateObject({
        system: SystemPrompt,
        model: openrouter.chat('openai/gpt-oss-120b:free'),
        prompt: prompt,
        maxOutputTokens: 8000,
        schema:SiteSchema
       
      });
  //  const codeJson = safeParseJSON(text);
			return  object;
    });

    await step.run("save-to-database", async () => {
      await db
        .update(siteTable)
        .set({ code: code })
        .where(eq(siteTable.id, siteId));
    });

    return { siteId, complete: true };
  }
);

// TODO: update site 

export const updateSiteFromChat = inngest.createFunction(
  { id: "update-site-from-chat", retries: 2 },
  { event: "site/update.from.chat" },
  async ({ event, step }) => {
    const { siteId, message } = event.data;

    // 1️⃣ LOAD SITE (CORRECT WAY)
    const siteResult = await db
      .select()
      .from(siteTable)
      .where(eq(siteTable.id, siteId))
      .limit(1);

    const site = siteResult[0];
    if (!site) {
      throw new Error("Site not found");
    }

    // 2️⃣ LOAD CHAT HISTORY (CORRECT WAY)
    const messages = await db
      .select()
      .from(messageTable)
      .where(eq(messageTable.siteId, siteId))
      .orderBy(messageTable.created_at);

    // 3️⃣ BUILD PROMPT
    const prompt = `
You are updating an existing codebase.

CURRENT CODE:
${JSON.stringify(site.code, null, 2)}

CHAT HISTORY:
${messages.map(m => `${m.role}: ${m.content}`).join("\n")}

LATEST USER REQUEST:
${message}

Rules:
- Return the FULL updated codebase
- Keep the same file structure
- Do NOT remove existing functionality unless explicitly requested
`;

    // 4️⃣ GENERATE UPDATED CODE
    const updatedCode = await step.run("generate-updated-code", async () => {
      const { object } = await generateObject({
        model: openrouter.chat("openai/gpt-oss-120b:free"),
        system: SystemPrompt,
        prompt,
        schema: SiteSchema,
        maxOutputTokens: 8000,
      });

      return object;
    });

    // 5️⃣ UPDATE SITE CODE
    await db
      .update(siteTable)
      .set({
        code: updatedCode,
        updated_at: new Date(),
      })
      .where(eq(siteTable.id, siteId));

    // 6️⃣ SAVE ASSISTANT MESSAGE
    await db.insert(messageTable).values({
      siteId,
      role: "assistant",
      content: "Code updated based on your request.",
    });

    return { siteId, updated: true };
  }
);