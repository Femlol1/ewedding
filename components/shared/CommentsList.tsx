"use client"; // This is important to ensure this component is client-side

import { collection, db, getDocs } from "@/lib/firebase"; // Adjust the import path to your Firebase configuration
import Image from "next/image";
import { useEffect, useState } from "react";

interface Comment {
	comment: string;
	// Add other properties if needed, like an id
}

export default function CommentsList() {
	const [comments, setComments] = useState<Comment[]>([]);
	const [animationDuration, setAnimationDuration] = useState<number>(30);

	useEffect(() => {
		const fetchComments = async () => {
			const commentsCollection = collection(db, "comments");
			const commentsSnapshot = await getDocs(commentsCollection);
			const commentsList = commentsSnapshot.docs.map(
				(doc) => doc.data() as Comment
			);
			setComments(commentsList);
			// Calculate animation duration based on the number of comments
			const baseDuration = 10; // Base duration in seconds
			const duration = baseDuration + commentsList.length * 5; // Adjust 5s per comment
			setAnimationDuration(duration);
		};

		fetchComments();
	}, []);

	return (
		<div className="mt-6">
			<h2 className="text-2xl font-semibold text-center">
				Messages to the Bride and Groom
			</h2>

			<div className="relative overflow-hidden mt-6 px-4">
				<div
					className="flex gap-6 animate-scroll"
					style={{ animationDuration: `${animationDuration}s` }} // Apply dynamic speed
				>
					{[...comments, ...comments].map((comment, index) => (
						<div
							key={index} // Using index as a key is acceptable if there's no other unique identifier
							className="bg-primary-50 rounded-lg p-6 shadow-md flex-shrink-0 w-[300px] flex flex-col items-center"
						>
							<Image
								src={"/assets/icons/heart.png"}
								alt="heart"
								width={30}
								height={30}
								className="mb-4"
							/>
							<p className="text-center text-gray-800">{comment.comment}</p>
						</div>
					))}
				</div>
			</div>

			<style jsx>{`
				@keyframes scroll {
					0% {
						transform: translateX(0) scale(1);
						opacity: 1;
					}
					50% {
						transform: translateX(-25%) scale(1.05);
						opacity: 0.8;
					}
					100% {
						transform: translateX(-50%) scale(1);
						opacity: 1;
					}
				}

				.animate-scroll {
					display: flex;
					animation: scroll linear infinite;
					width: calc(300px * ${comments.length * 2});
				}
				.animate-scroll:hover {
					animation-play-state: paused;
				}
			`}</style>
		</div>
	);
}
