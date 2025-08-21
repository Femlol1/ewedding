// pages/guests.js
import { MarqueeDemo } from "@/components/shared/comentsReviews";
import CommentForm from "@/components/shared/CommentForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function Guests() {
	return (
		<div className="flex flex-col md:flex-col md:mt-20">
			{/* Image Section */}
			<section className="relative w-full h-64 ">
				<Image
					src="/assets/images/Guest/GuestHeader.jpg" // Replace with your image path
					alt="Welcome Image"
					fill
					style={{ objectFit: "cover" }}
					quality={100}
					className="z-0"
				/>
				<div className="absolute inset-0 bg-black opacity-50 z-10"></div>
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
					<h3 className="text-3xl md:text-5xl font-bold mt-2">Guests</h3>
				</div>
			</section>
			<section>
				<MarqueeDemo />
			</section>

			<div className="container mx-auto px-4 py-8">
				<div className="mt-10" />
				{/* <GuestBook /> */}
				<CommentForm />
				{/* <CommentsSection /> */}
				<section className="fixed bottom-4 right-4 z-20">
					<Link href="/travel">
						<Button className="w-12 h-12 text-white btn-fill font-bold py-2 px-3 rounded-full transition duration-200 flex items-center justify-center shadow-lg">
							<FiChevronRight className="text-2xl text-white" />
						</Button>
					</Link>
				</section>
			</div>
		</div>
	);
}

const testimonials = [
	{
		quote:
			"It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
		name: "Charles Dickens",
		title: "A Tale of Two Cities",
	},
	{
		quote:
			"To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
		name: "William Shakespeare",
		title: "Hamlet",
	},
	{
		quote: "All that we see or seem is but a dream within a dream.",
		name: "Edgar Allan Poe",
		title: "A Dream Within a Dream",
	},
	{
		quote:
			"It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
		name: "Jane Austen",
		title: "Pride and Prejudice",
	},
	{
		quote:
			"Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
		name: "Herman Melville",
		title: "Moby-Dick",
	},
];
