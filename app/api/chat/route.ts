import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
	try {
		const { messages } = await req.json();

		// Log to debug
		console.log("Received messages:", JSON.stringify(messages, null, 2));

		// Transform messages from parts format to standard format
		const transformedMessages = messages.map((msg: any) => {
			// Handle parts-based format
			if (msg.parts && Array.isArray(msg.parts)) {
				const textContent = msg.parts
					.filter((part: any) => part.type === "text")
					.map((part: any) => part.text)
					.join("");

				return {
					role: msg.role,
					content: textContent,
				};
			}

			// Handle standard format
			if (msg.content) {
				return {
					role: msg.role,
					content:
						typeof msg.content === "string"
							? msg.content
							: JSON.stringify(msg.content),
				};
			}

			// Fallback
			return msg;
		});

		console.log(
			"Transformed messages:",
			JSON.stringify(transformedMessages, null, 2),
		);

		const result = streamText({
			model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
			messages: transformedMessages,
			maxRetries: 3,
		});

		return result.toTextStreamResponse();
	} catch (error) {
		console.error("Error in chat API:", error);
		return new Response(
			JSON.stringify({
				error: "Failed to process chat request",
				details: error instanceof Error ? error.message : String(error),
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}
