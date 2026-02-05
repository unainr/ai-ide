import { ProjectView } from "@/modules/project/ui/view/project-view";

export const metadata = {
  title: "Projects | Ruixen AI",
  description: "View all your AI-generated projects.",
};

const ProjectsPage = () => {
  return <ProjectView />;
};

export default ProjectsPage;
export const revalidate = 0;