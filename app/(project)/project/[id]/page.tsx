import { getID } from "@/modules/project/server/create-site";
import Conversation from "@/modules/project/ui/components/chat-interface";
import AIChatCard from "@/modules/project/ui/components/chat-interface";
import WorkingChatbot from "@/modules/project/ui/components/chat-interface";
import ChatInterface from "@/modules/project/ui/components/chat-interface";
import { ProjectContent } from "@/modules/project/ui/components/project-content";

interface Props {
	params: Promise<{ id: string }>;
}
const ProjectPage = async ({ params }: Props) => {
	const { id } = await params;
	const rows = await getID(id);
	if (!rows) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-red-500 text-lg">Project not found</p>
			</div>
		);
	}
	// if (!rows || rows.length === 0) {
	// 	return <div>Project not found</div>;
	// }

	// const row = rows[0];

	// if (!row.code) {
	// 	return <div>Project has no code</div>;
	// }

	// const response: SandpackProject = row.code as SandpackProject;
	return (
		<div className="grid h-screen grid-cols-2 gap-4 ">
			<AIChatCard siteId={id} />
			<ProjectContent id={id} initialData={rows} />
			{/* <SandProvider
				files={response.files}
				dependencies={response.dependencies}
			/> */}
		</div>
	);
};

export default ProjectPage;
