import { ALLSiteShow } from "@/modules/project/ui/components/all-site-show";
import { FormUI } from "../components/form-ui";
import { auth } from "@clerk/nextjs/server";

export const HomeView = async () => {
	const {userId} = await auth()
	
	return (
		<>
			<div
				className="relative w-full h-screen bg-cover bg-center flex flex-col items-center"
				style={{
					backgroundImage:
						"url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon_2.png')",
					backgroundAttachment: "fixed",
				}}>
				{/* Centered AI Title */}
				<div className="flex-1 w-full flex flex-col items-center justify-center">
					<div className="text-center">
						<h1 className="text-4xl font-semibold text-white drop-shadow-sm">
							Ruixen AI
						</h1>
						<p className="mt-2 text-neutral-200">
							Build something amazing — just start typing below.
						</p>
					</div>
				</div>

				<FormUI userId={userId!} />
			</div>
      <ALLSiteShow/>
		</>
	);
};
