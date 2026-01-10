import {
	SandpackProvider,
	SandpackLayout,
	SandpackPreview,
	SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SandpackFiles, SandpackProject } from "@/types";
import { DEPENDANCY } from "@/lib/utils";
export const SandProvider = ({ files, dependencies }: SandpackProject) => {
	console.log(files, dependencies);
	return (
		<SandpackProvider
			template="react"
			theme="auto"
			files={files}
			options={{
				externalResources: ["https://cdn.tailwindcss.com"],
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
			<Tabs defaultValue="editor" className="h-screen flex flex-col">
				<TabsList className="shrink-0">
					<TabsTrigger value="editor">Code</TabsTrigger>
					<TabsTrigger value="preview">Preview</TabsTrigger>
				</TabsList>
				<TabsContent value="editor" className="flex-1 m-0 h-0">
					<SandpackCodeEditor style={{ height: "100%" }} showLineNumbers />
				</TabsContent>
				<TabsContent value="preview" className="flex-1 m-0 h-0">
					<SandpackPreview style={{ height: "100%" }} />
				</TabsContent>
			</Tabs>
		</SandpackProvider>
	);
};
