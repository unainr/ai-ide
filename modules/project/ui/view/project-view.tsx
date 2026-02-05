import { ALLSiteShow } from "../components/all-site-show";

export const ProjectView = () => {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="py-8">
            <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-400">Manage and view all your AI-generated applications.</p>
         </div>
         <ALLSiteShow />
      </div>
    </div>
  );
};
