"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, Paperclip } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

import { CreateSite } from "@/modules/project/server/create-site";
import { Spinner } from "@/components/ui/spinner";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
export const FormUI = ({userId}:{userId:string}) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [prompt, setPrompt] = useState("");
	const handleSubmit = async () => {
	if (!userId) {
		router.push('/sign-in');
		return; // Important: stop execution
	}
		try {
			setLoading(true);
			const newProject = await CreateSite({ prompt });

			if (!newProject?.id) {
				throw new Error("Failed to create project. No ID returned.");
			}

			// Navigate to the project page immediately
			router.push(`/project/${newProject.id}`);
		} catch (error: any) {
			toast.error("Something went wrong while creating the project.",error);
		} finally {
			setLoading(false);
		}
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (!userId) {
		router.push('/sign-in');
		return; // Important: stop execution
	}
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
			setPrompt('')
		}
	};

	return (
		<>
			{/* Input Box Section */}
			<div className="w-full max-w-3xl  mb-20">
				<div className="relative bg-black/60 backdrop-blur-md rounded-xl border border-neutral-700">
					<Textarea
						onKeyDown={handleKeyDown}
						value={prompt}
						onChange={(e) => {
							setPrompt(e.target.value);
						}}
						placeholder="Type your request..."
						className={cn(
							"w-full px-4 py-3 resize-none border-none",
							"bg-transparent text-white text-sm",
							"focus-visible:ring-0 focus-visible:ring-offset-0",
							"placeholder:text-neutral-400 min-h-12"
						)}
						style={{ overflow: "hidden" }}
					/>

					{/* Footer Buttons */}
					<div className="flex items-center justify-end p-3">
						<div className="flex items-center gap-2">
							<Button
								onClick={handleSubmit}
								variant={"outline"}
								className={cn(
									"flex items-center gap-1 px-3 py-2 rounded-lg transition-colors",
									" cursor-pointer"
								)}>
								{loading ? <Spinner /> : <ArrowUpIcon className="w-4 h-4" />}
							</Button>
						</div>
					</div>
				</div>

				<div className="flex flex-wrap justify-center gap-2 mt-4">
					{[
						"Landing page for a coffee shop",
						"Personal portfolio with dark mode",
						"E-commerce dashboard with charts",
						"Blog website with grid layout",
					].map((suggestion) => (
						<button
							key={suggestion}
							onClick={() => setPrompt(suggestion)}
							className="px-3 py-1.5 text-xs text-neutral-400 bg-white/5 border border-white/5 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300">
							{suggestion}
						</button>
					))}
				</div>
			</div>
		</>
	);
};
