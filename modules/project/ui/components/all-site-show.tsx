import { getAllSite } from '../../server/create-site'
import { ProjectCard } from './project-card'

interface Props {
    id: string
    name: string
}

export const ALLSiteShow = async () => {
    const sites = await getAllSite()
    
    if (!sites || sites.length === 0) {
        return null; // Or return a "Create your first project" empty state
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Your Projects
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-6" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sites.map((site: Props, index: number) => (
                    <ProjectCard key={site.id} site={site} index={index} />
                ))}
            </div>
        </div>
    )
}
