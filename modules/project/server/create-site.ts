"use server";
import SystemPrompt from "@/constant";
import { db } from "@/drizzle/db";
import { siteTable } from "@/drizzle/schema";
import { safeParseJSON } from "@/lib/utils";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { eq } from "drizzle-orm";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

 const openrouter = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});
export const CreateSite = async ({ prompt }: { prompt: string }) => {
	try {
		const { text } = await generateText({
			system: SystemPrompt,
			model: openrouter.chat('google/gemini-2.0-flash-exp:free'),
			prompt: prompt,
			maxOutputTokens: 8000,
		});
        const codeJson = safeParseJSON(text)
		const [site] = await db
			.insert(siteTable)
			.values({
				name: prompt,
				code: codeJson,
			})
			.returning();

		return site;
	} catch (error) {
		console.log(error);
	}
};

export const getID = async (id:string) => { 
try {
    const result = await db.select().from(siteTable).where(eq(siteTable.id,id))
    return result
    
} catch (error) {
    throw new Error('Project Id not found')
}
}