"use server";
import SystemPrompt from "@/constant";
import { db } from "@/drizzle/db";
import { siteTable } from "@/drizzle/schema";
import { safeParseJSON } from "@/lib/utils";
import { groq } from "@ai-sdk/groq";
import { generateObject, generateText } from "ai";
import { eq } from "drizzle-orm";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { inngest } from "@/inngest/client";

//  const openrouter = createOpenRouter({
//   apiKey: process.env.OPEN_ROUTER_API_KEY,
// });
// const SiteSchema = z.object({
//   files: z.record(
//     z.string(),
//     z.object({
//       code: z.string(),
//     })
//   ),
//   dependencies: z.record(z.string(), z.string()),
// });
export const CreateSite = async ({ prompt }: { prompt: string }) => {
	const { userId } = await auth();
	if (!userId) throw new Error("user id not found");
	try {
		// const { object } = await generateObject({
		// 	system: SystemPrompt,
		// 	model: openrouter.chat('openai/gpt-oss-120b:free'),
		// 	prompt: prompt,
		// 	maxOutputTokens: 8000,
		// 	 schema: SiteSchema, // ✅ REQUIRED

		// });
		// const codeJson = safeParseJSON(text)
		const [site] = await db
			.insert(siteTable)
			.values({
				name: prompt,
				code: { files: {}, dependencies: {} },
				userId: userId,
			})
			.returning();
		await inngest.send({
			name: "site/generate.code",
			data: {
				siteId: site.id,
				prompt: prompt,
			},
		});
		return site;
	} catch (error) {
		console.log(error);
	}
};

export const getID = async (id: string) => {
	try {
		const result = await db
			.select()
			.from(siteTable)
			.where(eq(siteTable.id, id));
		return result[0];
	} catch (error) {
		console.log(error);
		// throw new Error("Project Id not found");
	}
};

export const getAllSite = async () => {
	try {
		const result = await db.select().from(siteTable);
		return result;
	} catch (error) {
		console.log(error);
	}
};
