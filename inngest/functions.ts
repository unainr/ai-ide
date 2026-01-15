import { db } from "@/drizzle/db";
import { siteTable } from "@/drizzle/schema";
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
    //   const codeJson = safeParseJSON(text)
      return object;
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