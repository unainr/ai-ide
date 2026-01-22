"use client";

import { useEffect, useState } from "react";
import { SandProvider } from "@/components/sandpack/sand-provider";
import { getID } from "@/modules/project/server/create-site";
import { SandpackProject } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Props {
	id: string;
	initialData: any;
}

export function ProjectContent({ id, initialData }: Props) {
	const [project, setProject] = useState(initialData);

	const isReady =
		project?.code?.files && Object.keys(project.code.files).length > 0;

	// Auto-poll database until ready
	useEffect(() => {
		if (isReady) return; // Already ready, stop

		const poll = setInterval(async () => {
			try {
				const updated = await getID(id);
				setProject(updated);
			} catch (error) {
				console.error("Failed to fetch project:", error);
			}
		}, 3000); // Check every 3 seconds

		return () => clearInterval(poll);
	}, [id, isReady]);

	// Loading state
	if (!isReady) {
		return (
			<div className="h-screen flex flex-col bg-background">
				<Tabs defaultValue="editor" className="h-screen flex flex-col">
					<div className="shrink-0 border-b">
						<TabsList>
							<TabsTrigger value="editor" disabled>
								Code
							</TabsTrigger>
							<TabsTrigger value="preview" disabled>
								Preview
							</TabsTrigger>
						</TabsList>
					</div>

					<TabsContent value="editor" className="flex-1 m-0 h-0 relative">
						{/* Skeleton Background */}
						<div className="h-full bg-muted/20 p-4 space-y-3">
							{[...Array(15)].map((_, i) => (
								<div key={i} className="flex items-center gap-4">
									<Skeleton className="h-4 w-6" />
									<Skeleton
										className="h-4"
										style={{ width: `${Math.random() * 40 + 40}%` }}
									/>
								</div>
							))}
						</div>

						{/* Loading Overlay */}
						<div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
							<div className="text-center space-y-6 max-w-md px-6">
								{/* Spinner */}
								<div className="relative w-20 h-20 mx-auto">
									<div className="absolute inset-0 border-4 border-muted rounded-full"></div>
									<div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
								</div>

								{/* Messages */}
								<div className="space-y-2">
									<h3 className="text-xl font-semibold">
										Generating Your Project
									</h3>
									<p className="text-muted-foreground text-sm">
										{project?.name || "Creating your application..."}
									</p>
								</div>

								{/* Progress */}
								<div className="space-y-3">
									<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
										<div className="flex gap-1">
											<span
												className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
												style={{ animationDelay: "0ms" }}></span>
											<span
												className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
												style={{ animationDelay: "150ms" }}></span>
											<span
												className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
												style={{ animationDelay: "300ms" }}></span>
										</div>
										<span>AI is writing your code</span>
									</div>

									<p className="text-xs text-muted-foreground">
										This will appear automatically when ready
									</p>
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		);
	}

	// Ready - show the app
	const sandpack: SandpackProject = project.code as SandpackProject;

	return (
		<div className="h-screen">
			<SandProvider
				files={sandpack.files}
				dependencies={sandpack.dependencies}
			/>
		</div>
	);
}
