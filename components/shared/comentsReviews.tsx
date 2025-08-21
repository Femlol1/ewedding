"use client";
import { collection, db, getDocs } from "@/lib/firebase"; // Adjust the import path to your Firebase configuration
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import Marquee from "../ui/marquee";

interface Comment {
	comment: string;
	name?: string;
}

const ReviewCard = ({ comment, name }: { comment: string; name?: string }) => {
	return (
		<figure
			className={cn(
				"relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
				// light styles
				"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
				// dark styles
				"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
			)}
		>
			<div className="flex flex-row items-center gap-2">
				<Image
					className="rounded-full"
					width="32"
					height="32"
					alt=""
					src={"/assets/icons/heart.png"}
				/>
				<div className="flex flex-col">
					<figcaption className="text-sm font-medium dark:text-white">
						{name || "Anonymous"}
					</figcaption>
				</div>
			</div>
			<blockquote className="mt-2 text-sm">{comment}</blockquote>
		</figure>
	);
};

export function MarqueeDemo() {
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(() => {
		const fetchComments = async () => {
			const commentsCollection = collection(db, "comments");
			const commentsSnapshot = await getDocs(commentsCollection);
			const commentsList = commentsSnapshot.docs.map(
				(doc) => doc.data() as Comment
			);
			setComments(commentsList);
		};

		fetchComments();
	}, []);

	// Split comments into two rows for the marquee effect
	const half = Math.ceil(comments.length / 2);
	const firstRow = comments.slice(0, half);
	const secondRow = comments.slice(half);

	return (
		<div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
			<h2 className="text-2xl font-semibold text-center my-10">
				Messages to the Bride and Groom
			</h2>
			<Marquee pauseOnHover className="[--duration:40s]">
				{firstRow.map((comment, index) => (
					<ReviewCard
						key={index}
						comment={comment.comment}
						name={comment.name}
					/>
				))}
			</Marquee>
			<Marquee reverse pauseOnHover className="[--duration:30s]">
				{secondRow.map((comment, index) => (
					<ReviewCard
						key={index}
						comment={comment.comment}
						name={comment.name}
					/>
				))}
			</Marquee>
		</div>
	);
}
