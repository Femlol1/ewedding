// pages/events.js
"use client";
import DressCodeModal from "@/components/shared/DressCodeModal";
import EventDetails from "@/components/shared/EventDetails";
import HeaderImage from "@/components/shared/HeaderImage";
import { events } from "@/constants";
import { useState } from "react";

export default function Events() {
	const [showDressCode, setShowDressCode] = useState(false);

	return (
		<div className="flex flex-col md:flex-col md:mt-20">
			{/* Header Image Section */}
			<HeaderImage
				pageId="events"
				alt="Events Header Image"
				title="Our Wedding Events"
				fallbackSrc=""
			/>

			<div className="container mx-auto px-4 py-8">
				<div className="">
					{events.map((event, index) => (
						<EventDetails
							key={index}
							time={event.time}
							title={event.title}
							location={event.location}
							icon={event.icon}
							heading={event.heading}
							description={event.description}
							gmap={event.gmap}
							setShowDressCode={setShowDressCode}
						/>
					))}
				</div>
				{showDressCode && (
					<DressCodeModal onClose={() => setShowDressCode(false)} />
				)}
			</div>
		</div>
	);
}
