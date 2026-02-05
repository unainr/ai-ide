"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../theme/mode-toggle";
import Logo from "./logo";


export default function MainHeader() {
	const [isScrolled, setIsScrolled] = React.useState(false);
	const pathname = usePathname();
	const isActive = (path: string) => pathname === path;
	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/pricing", label: "Pricing" },
  ];

	return (
		<header
			className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent",
				isScrolled ? "bg-black/80 backdrop-blur-xl border-white/5 shadow-2xl" : "bg-transparent"
			)}>
			<div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-2">
           <Logo />
        </div>

				<nav className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "px-4 py-1.5 text-sm font-medium transition-all duration-300 rounded-full relative",
                isActive(link.href) 
                  ? "text-white bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}>
              {link.label}
              {isActive(link.href) && (
                <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              )}
            </Link>
          ))}
				</nav>

				<div className="hidden md:flex items-center gap-3">
					<SignedIn>
						<UserButton appearance={{
              elements: {
                avatarBox: "h-9 w-9 ring-2 ring-white/10 hover:ring-white/30 transition-all duration-300"
              }
            }} />
					</SignedIn>
					<SignedOut>
						<Button
							asChild
							className="rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
							<Link href="/sign-in">Get Started</Link>
						</Button>
					</SignedOut>
				    <ModeToggle/>

				</div>

				{/* Mobile Menu Trigger */}
				<div className="md:hidden flex items-center gap-4">
          <ModeToggle />
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
								<Menu className="h-6 w-6" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[300px] border-l border-white/10 bg-black/95 backdrop-blur-xl">
							<nav className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 text-lg font-medium transition-all duration-200 rounded-xl",
                      isActive(link.href)
                        ? "text-white bg-white/10 border border-white/5"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}>
                    {link.label}
                  </Link>
                ))}
								<div className="mt-6 flex flex-col gap-4">
                  <SignedIn>
									  <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                      <UserButton />
                      <span className="text-sm text-gray-300">My Account</span>
                    </div>
								  </SignedIn>
                  <SignedOut>
                    <Button
                      asChild
                      className="w-full rounded-xl bg-white text-black hover:bg-gray-200 py-6 text-lg">
                      <Link href="/sign-in">Get Started</Link>
                    </Button>
                  </SignedOut>
                </div>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}