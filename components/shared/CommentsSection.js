// components/CommentsSection.js
"use client"; // This is important to ensure this component is client-side

import { addDoc, collection, db, getDocs, Timestamp } from "@/lib/firebase"; // Adjust the import path to your Firebase configuration
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function CommentsSection() {
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

	useEffect(() => {
		const fetchComments = async () => {
			const commentsCollection = collection(db, "comments");
			const commentsSnapshot = await getDocs(commentsCollection);
			const commentsList = commentsSnapshot.docs.map((doc) => doc.data());
			setComments(commentsList);
		};

		fetchComments();
	}, []);

	const handleCommentSubmit = async (event) => {
		event.preventDefault();
		if (newComment.trim() === "") return;

		const commentData = {
			comment: newComment,
			timestamp: Timestamp.now(),
		};

		try {
			// Add a new document with the comment data
			await addDoc(collection(db, "comments"), commentData);
			// Update the local state to include the new comment
			setComments([...comments, commentData]);
			setNewComment("");
		} catch (error) {
			console.error("Error adding comment: ", error);
		}
	};

	return (
		<div className="mt-6">
			<h2 className="text-xl font-semibold text-center">
				Messages to the Bride and Groom
			</h2>

			<div className="relative overflow-hidden container">
				<div className="flex whitespace-nowrap animate-scroll gap-4">
					{[...comments, ...comments].map((comment, index) => (
						<>
							<div
								key={index}
								className="bg-primary-50 rounded-full p-4 mx-2 min-w-[300px] shadow-md text-center"
							>
								<Image
									src={"/assets/icons/heart.png"}
									alt="heart"
									width={20}
									height={20}
									className="mb-2 text-center"
								/>
								{comment.comment}
							</div>
						</>
					))}
				</div>
			</div>
			<form onSubmit={handleCommentSubmit} className="my-4">
				<Textarea
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					className="w-full p-2 border"
					placeholder="Leave a message..."
				/>
				<Button
					type="submit"
					className="bg-primary hover:bg-primary-700 font-bold py-2 px-4 rounded block mx-auto mt-2"
				>
					Submit
				</Button>
			</form>
		</div>
	);
}
