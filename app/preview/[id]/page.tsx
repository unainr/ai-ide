import { getID } from "@/modules/project/server/create-site";
import { SandProvider } from "@/components/sandpack/sand-provider";
import { SandpackProject } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PreviewPage({ params }: Props) {
  const { id } = await params;
  const rows = await getID(id);

  if (!rows) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <div className="p-8 rounded-lg text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <p className="text-muted-foreground text-lg">Project not found or accessible.</p>
          <a href="/" className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  // Cast existing code to SandpackProject if valid
  const sandpack: SandpackProject = (rows.code as unknown) as SandpackProject;

  if (!sandpack?.files) {
    return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <div className="p-8 rounded-lg text-center space-y-4">
          <h1 className="text-2xl font-bold">Project has no code yet</h1>
          <p className="text-muted-foreground">The project exists but hasn't generated any code.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      {/* We reuse SandProvider but force 'preview' tab and hide the top bar/code editor if possible, 
          or we just render it full screen. 
          Actually, since SandProvider has tabs hardcoded, we might want a 'preview-only' mode. 
          For now, we'll just render it as is, and the user can see the full IDE view, 
          but usually 'preview' implies just the result. 
          
          Let's create a specialized 'FullPreview' component or modify SandProvider.
          Given the user asked for "Generate website in other tabs", 
          rendering the whole IDE again might be redundant if they just want the site.
          
          However, Sandpack needs the context. 
          Let's verify if SandpackPreview can run standalone without the Provider. 
          No, it needs Provider. 
      */}
      <SandProvider 
        files={sandpack.files} 
        dependencies={sandpack.dependencies}
        siteId={id} 
        defaultTab="preview"
      />
    </div>
  );
}
