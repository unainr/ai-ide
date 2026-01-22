import { ArrowRight, Layout } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getAllSite } from '../../server/create-site'
interface Props{
    id?:string
    name?:string
}
export const ALLSiteShow = async () => {
    const sites = await getAllSite()
    console.log(sites)
  return (
    <div>
        	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{sites&&sites.map((site:Props) => (
								<Link
									href={`/project/${site.id}`}
									key={site.id}
									className="group relative flex flex-col bg-[#111] border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 ring-1 ring-white/0 hover:ring-white/5">
									{/* Thumbnail / Visual */}
									
									<div className="p-4 bg-[#111] border-t border-white/5 group-hover:bg-[#151515] transition-colors">
										<h3
											className="font-medium text-sm text-gray-200 group-hover:text-blue-400 transition-colors truncate"
											title={site.name}>
											{site.name}
										</h3>
										<p className="text-[10px] text-gray-600 mt-1 flex items-center gap-1.5">
											<span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
											Updated 
										</p>
									</div>
								</Link>
							))}
						</div>
    </div>
  )
}
