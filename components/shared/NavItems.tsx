"use client";

import { adminLinks, userLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface NavItemsProps {
	handleClose: () => void; // Define the type for the handleClose prop
}

const NavItems: FC<NavItemsProps> = ({ handleClose }) => {
	const pathname = usePathname();

	// Determine if the current path is for admin or check-in
	const isAdminPath =
		pathname.startsWith("/admin") ||
		pathname.startsWith("/check-in") ||
		pathname.startsWith("/stats") ||
		pathname.startsWith("/comments") ||
		pathname.startsWith("/check-in") ||
		pathname.startsWith("/create-rsvp") ||
		pathname.startsWith("/table-groups") ||
		pathname.startsWith("/assign-table");

	// Choose the appropriate links based on the current path
	const links = isAdminPath ? adminLinks : userLinks;

	return (
		<ul className="md:flex-between flex w-full flex-full flex-col items-start gap-5 md:flex-row">
			{links.map((link) => {
				const isActive = pathname === link.route;

				return (
					<li
						key={link.route}
						className={`${
							isActive ? "text-primary-500" : ""
						} flex-center p-medium-16 whitespace-nowrap`}
					>
						<Link href={link.route} onClick={handleClose}>
							{link.label}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default NavItems;
