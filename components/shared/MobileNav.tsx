"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useState } from "react";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	return (
		<nav className="md:hidden">
			<Sheet Temitopen={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger className="align-middle" onClick={handleOpen}>
					{/* Inline SVG for menu icon */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						fill="currentColor"
						className="text-primary cursor-pointer"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M1.5 3.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5z"
						/>
					</svg>
				</SheetTrigger>
				<SheetContent className="flex flex-col gap-2 bg-gray md:hidden bg-white w-auto">
					<Image src={"/assets/logo.png"} alt="logo" width={70} height={38} />
					<Separator className="border border-gray-50" />
					<NavItems handleClose={handleClose} />
				</SheetContent>
			</Sheet>
		</nav>
	);
};

export default MobileNav;
