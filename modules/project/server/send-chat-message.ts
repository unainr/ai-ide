"use server";

import { db } from "@/drizzle/db";
import { messageTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";

export const sendChatMessage = async ({
	siteId,
	content,
}: {
	siteId: string;
	content: string;
}) => {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthorized");

	// 1. Save user message
	await db.insert(messageTable).values({
		siteId,
		role: "user",
		content,
	});

	// 2. Trigger AI update
	await inngest.send({
		name: "site/update.from.chat",
		data: {
			siteId,
			message: content,
		},
	});

	return { success: true };
};

export const getMessages = async (siteId: string) => {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthorized");

	const messages = await db
		.select()
		.from(messageTable)
		.where(eq(messageTable.siteId, siteId))
		.orderBy(messageTable.created_at);

	return messages;
};
