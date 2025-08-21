"use client";
import Countdown from "@/components/shared/Countdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const Rsvp: React.FC = () => {
	const eventDate = "2025-03-22T11:00:00";
	return (
		<div className="container mx-auto mt-20">
			<section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
				<div className="wrapper text-purple-500 h3-bold text-center">
					Pls stop Creating Rsvp
				</div>
			</section>
			<section>
				<Countdown eventDate={eventDate} />
			</section>
			{/* <section>
				<div className="mb-4 rsvp">
					<RSVPForm />
				</div>
			</section> */}
			<section className="fixed bottom-4 right-4 z-20">
				<Link href="/story">
					<Button className="w-12 h-12 text-white btn-fill font-bold py-2 px-3 rounded-full transition duration-200 flex items-center justify-center shadow-lg">
						<FiChevronRight className="text-2xl text-white" />
					</Button>
				</Link>
			</section>
		</div>
	);
};

export default Rsvp;
