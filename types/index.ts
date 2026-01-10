import type { SandpackFiles as SandpackFilesFromPkg } from "@codesandbox/sandpack-react";
export interface PropsLayout{
    children:React.ReactNode;
}



export type SandpackFile = {
  code: string;
  active?: boolean;
  hidden?: boolean;
};

export type SandpackFiles = Record<string, string | SandpackFile>;

export interface SandpackProject {
  files: SandpackFiles;
  dependencies: Record<string, string>;
}
