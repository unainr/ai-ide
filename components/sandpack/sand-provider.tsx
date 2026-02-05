import {
	SandpackProvider,
	SandpackLayout,
	SandpackPreview,
	SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SandpackFiles, SandpackProject } from "@/types";
import { DEPENDANCY } from "@/lib/utils";
export const SandProvider = ({ files, dependencies, siteId, defaultTab = "editor" }: SandpackProject & { siteId?: string; defaultTab?: "editor" | "preview" }) => {
	console.log(files, dependencies);
	return (
		<SandpackProvider
			template="react"
			theme="auto"
			files={files}
			options={{
				externalResources: ["https://cdn.tailwindcss.com"],
				autorun: true,
				autoReload: true,
				recompileMode: "immediate",
			}}
			customSetup={{
				dependencies: {
					react: "^18.0.0",
					"react-dom": "^18.0.0",
					tailwindcss: "^3.4.0",
					...dependencies,
					...DEPENDANCY,
				},
			}}>
			<Tabs defaultValue={defaultTab} className="h-screen flex flex-col">
				<TabsList className="shrink-0">
					<TabsTrigger value="editor">Code</TabsTrigger>
					<TabsTrigger value="preview">Preview</TabsTrigger>
				</TabsList>
				<TabsContent value="editor" className="flex-1 m-0 h-0">
					<SandpackCodeEditor style={{ height: "100%" }} showLineNumbers />
				</TabsContent>
				<TabsContent value="preview" className="flex-1 m-0 h-0 flex flex-col">
					<div className="shrink-0 bg-background border-b px-2 py-1.5 flex items-center justify-between gap-2">
						<div className="flex-1 flex items-center gap-1.5 bg-muted rounded-md px-2.5 py-1.5 text-sm">
							<svg className="w-3.5 h-3.5 shrink-0 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
							</svg>
							<span className="truncate opacity-70">localhost:3000</span>
						</div>
            {siteId && (
              <a 
                href={`/preview/${siteId}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Open in New Tab
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
					</div>
					<div className="flex-1 h-0">
						<SandpackPreview 
							style={{ height: "100%" }} 
							showOpenInCodeSandbox={false}
							showNavigator={false}
							showRefreshButton={false}
						/>
					</div>
				</TabsContent>
			</Tabs>
		</SandpackProvider>
	);
};
