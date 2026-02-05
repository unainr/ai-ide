import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const Logo = ({ className }: { className?: string }) => {
	return (
		<Link
			href="/"
			className={`group flex items-center gap-2.5 transition-all duration-300 hover:opacity-90 ${className}`}>
			<div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-purple-600 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300">
				<Sparkles className="w-5 h-5 text-white" strokeWidth={2.5} />
				<div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>

			<span className="font-bold text-xl tracking-tight text-white group-hover:text-gray-100 transition-colors">
				Ruixen
			</span>
		</Link>
	);
};

export default Logo;
