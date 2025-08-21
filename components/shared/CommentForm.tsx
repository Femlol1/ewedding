"use client";

import { addDoc, collection, db, Timestamp } from "@/lib/firebase"; // Adjust the import path to your Firebase configuration
import data from "@emoji-mart/data"; // Correct import for emoji data
import Picker from "@emoji-mart/react"; // Import the new Picker from emoji-mart
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function CommentForm() {
	const [newComment, setNewComment] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [name, setName] = useState("");
	const pickerRef = useRef<HTMLDivElement>(null); // Ref for the emoji picker modal
	const maxCommentLength = 150; // Set the maximum length for the message
	const maxNameLength = 30;

	const handleCommentSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		if (newComment.trim() === "" || name.trim() === "") return;

		const commentData = {
			name: name.trim(),
			comment: newComment.trim(),
			timestamp: Timestamp.now(),
		};

		try {
			// Add a new document with the comment data
			await addDoc(collection(db, "comments"), commentData);
			// Clear the input fields after submission
			setNewComment("");
			setName("");
		} catch (error) {
			console.error("Error adding comment: ", error);
		}
	};

	const handleEmojiSelect = (emoji: any) => {
		setNewComment((prev) => prev + emoji.native); // Append selected emoji to the comment
		setShowEmojiPicker(false); // Close the emoji picker after selection
	};

	// Handle outside click to close the modal
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				pickerRef.current &&
				!pickerRef.current.contains(event.target as Node)
			) {
				setShowEmojiPicker(false);
			}
		};

		if (showEmojiPicker) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showEmojiPicker]);

	return (
		<div className="mt-8 mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
			<h2 className="text-2xl font-semibold text-center mb-4">
				Leave a Message for the Bride and Groom
			</h2>
			<form onSubmit={handleCommentSubmit} className="space-y-4">
				<div className="flex flex-col">
					<Label>Your Name</Label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full p-2 mt-1 border rounded focus:ring-primary-500 focus:border-primary-500"
						placeholder="Enter your name"
						maxLength={maxNameLength}
						required
					/>
					<p className="text-sm text-gray-500 mt-1">
						{maxNameLength - name.length} characters remaining
					</p>
				</div>
				<div className="flex flex-col relative">
					<Label>Your Message</Label>
					<Textarea
						id="comment"
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						className="w-full p-2 mt-1 border rounded focus:ring-primary-500 focus:border-primary-500"
						placeholder="Leave a message..."
						maxLength={maxCommentLength} // Set the maximum length here
						required
					/>
					<p className="text-sm text-gray-500 mt-1">
						{maxCommentLength - newComment.length} characters remaining
					</p>
					<button
						type="button"
						onClick={() => setShowEmojiPicker(true)}
						className="absolute right-2 top-10 text-2xl"
					>
						😊
					</button>
				</div>
				<Button
					type="submit"
					className="w-full bg-primary hover:bg-primary-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
				>
					Send
				</Button>
			</form>

			{/* Emoji Picker Modal */}
			{showEmojiPicker && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div ref={pickerRef} className="relative p-6 rounded-md">
						<button onClick={() => setShowEmojiPicker(false)}></button>
						<Picker data={data} onEmojiSelect={handleEmojiSelect} />
					</div>
				</div>
			)}
		</div>
	);
}
