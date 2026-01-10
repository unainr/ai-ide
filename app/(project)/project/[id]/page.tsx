import { SandProvider } from "@/components/sandpack/sand-provider";
import { getID } from "@/modules/project/server/create-site";
import { SandpackProject } from "@/types";

interface Props {
	params: Promise<{ id: string }>;
}
const ProjectPage = async ({ params }: Props) => {
	const { id } = await params;
	const rows = await getID(id);

	if (!rows || rows.length === 0) {
		return <div>Project not found</div>;
	}

	const row = rows[0];

	if (!row.code) {
		return <div>Project has no code</div>;
	}

	const response: SandpackProject = row.code as SandpackProject;

	return (
		<div>
			<SandProvider
				files={response.files}
				dependencies={response.dependencies}
			/>
		</div>
	);
};

export default ProjectPage;
