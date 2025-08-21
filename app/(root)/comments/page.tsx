"use client"; // This is important to ensure this component is client-side

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	collection,
	db,
	deleteDoc,
	doc,
	getDocs,
	Timestamp,
	updateDoc,
} from "@/lib/firebase"; // Adjust the import path to your Firebase configuration
import { useCallback, useEffect, useState } from "react";

// Interface for comments
interface Comment {
	id: string;
	name: string;
	comment: string;
	timestamp: Timestamp;
}

// Modal component for editing comments
const EditCommentModal = ({
	show,
	onClose,
	onSave,
	comment,
}: {
	show: boolean;
	onClose: () => void;
	onSave: (updatedComment: { name: string; comment: string }) => void;
	comment: Comment | null;
}) => {
	const [editName, setEditName] = useState(comment?.name || "");
	const [editComment, setEditComment] = useState(comment?.comment || "");

	// Update state when the modal Temitopens with the selected comment data
	useEffect(() => {
		if (comment) {
			setEditName(comment.name);
			setEditComment(comment.comment);
		}
	}, [comment]);

	const handleSave = () => {
		onSave({ name: editName, comment: editComment });
		onClose();
	};

	if (!show || !comment) return null;

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
			<div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
				<h2 className="text-xl font-semibold mb-4">Edit Comment</h2>
				<input
					type="text"
					value={editName}
					onChange={(e) => setEditName(e.target.value)}
					className="w-full p-2 mb-2 border rounded"
					placeholder="Edit Name"
				/>
				<textarea
					value={editComment}
					onChange={(e) => setEditComment(e.target.value)}
					className="w-full p-2 mb-2 border rounded"
					placeholder="Edit Comment"
				/>
				<div className="flex justify-end mt-4">
					<button
						onClick={handleSave}
						className="bg-green-500 text-white px-4 py-2 rounded mr-2"
					>
						Save
					</button>
					<button
						onClick={onClose}
						className="bg-gray-300 text-black px-4 py-2 rounded"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default function AdminCommentsPage() {
	const [comments, setComments] = useState<Comment[]>([]);
	const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchName, setSearchName] = useState("");
	const [editingComment, setEditingComment] = useState<Comment | null>(null);
	const [showEditModal, setShowEditModal] = useState(false);

	// States for date filtering
	const [startDate, setStartDate] = useState<Timestamp | null>(null);
	const [endDate, setEndDate] = useState<Timestamp | null>(null);

	useEffect(() => {
		const fetchComments = async () => {
			const commentsCollection = collection(db, "comments");
			const commentsSnapshot = await getDocs(commentsCollection);
			const commentsList = commentsSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Comment[];
			setComments(commentsList);
			setFilteredComments(commentsList);
			setLoading(false);
		};

		fetchComments();
	}, []);

	const handleDelete = async (id: string) => {
		if (
			confirm(
				"Are you sure you want to delete this message? This action cannot be undone."
			)
		) {
			await deleteDoc(doc(db, "comments", id));
			setComments(comments.filter((comment) => comment.id !== id));
			setFilteredComments(
				filteredComments.filter((comment) => comment.id !== id)
			);
		}
	};

	// Wrap handleSearch in useCallback to ensure it doesn't change on every render
	const handleSearch = useCallback(() => {
		const filtered = comments.filter((comment) => {
			const matchesComment = comment.comment
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesName = (comment.name || "")
				.toLowerCase()
				.includes(searchName.toLowerCase());

			const matchesDateRange =
				(!startDate || comment.timestamp >= startDate) &&
				(!endDate || comment.timestamp <= endDate);

			return matchesComment && matchesName && matchesDateRange;
		});

		setFilteredComments(filtered);
	}, [comments, searchQuery, searchName, startDate, endDate]);

	// useEffect dependency includes handleSearch
	useEffect(() => {
		handleSearch();
	}, [handleSearch]);

	const handleEdit = (comment: Comment) => {
		setEditingComment(comment);
		setShowEditModal(true);
	};

	const handleSaveEdit = async (updatedComment: {
		name: string;
		comment: string;
	}) => {
		if (editingComment) {
			const updatedData = {
				...editingComment,
				...updatedComment,
			};

			await updateDoc(doc(db, "comments", editingComment.id), {
				name: updatedComment.name,
				comment: updatedComment.comment,
			});

			setComments((prevComments) =>
				prevComments.map((comment) =>
					comment.id === editingComment.id ? updatedData : comment
				)
			);
			setFilteredComments((prevComments) =>
				prevComments.map((comment) =>
					comment.id === editingComment.id ? updatedData : comment
				)
			);

			setEditingComment(null);
			setShowEditModal(false);
		}
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="container mx-auto px-4 py-8 mt-20">
			<h1 className="text-3xl font-bold mb-6">Admin Panel - Comments</h1>

			{/* Search Inputs */}
			<div className="mb-6 flex space-x-4">
				<Input
					type="text"
					placeholder="Search by name..."
					value={searchName}
					onChange={(e) => setSearchName(e.target.value)}
					className="w-full p-2 border rounded my-4"
				/>
				<Input
					type="text"
					placeholder="Search comments..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full p-2 border rounded my-4"
				/>
			</div>

			{/* Date Filter Inputs */}
			<div className="mb-6 flex space-x-4">
				<div>
					<Label>start date</Label>
					<Input
						type="date"
						onChange={(e) =>
							setStartDate(Timestamp.fromDate(new Date(e.target.value)))
						}
					/>
				</div>
				<div>
					<Label>End date</Label>

					<Input
						type="date"
						onChange={(e) =>
							setEndDate(Timestamp.fromDate(new Date(e.target.value)))
						}
					/>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full table-auto">
					<thead>
						<tr className="bg-gray-100">
							<th className="px-4 py-2 text-left">Name</th>
							<th className="px-4 py-2 text-left">Comment</th>
							<th className="px-4 py-2 text-left">Edit</th>
							<th className="px-4 py-2 text-left">Delete</th>
						</tr>
					</thead>
					<tbody>
						{filteredComments.map((comment) => (
							<tr key={comment.id} className="border-b">
								<td className="px-4 py-2">{comment.name}</td>
								<td className="px-4 py-2">{comment.comment}</td>
								<td className="px-4 py-2 space-x-2">
									<Button
										className="bg-blue-500 text-white px-4 py-2 rounded"
										onClick={() => handleEdit(comment)}
									>
										Edit
									</Button>
								</td>
								<td className="px-4 py-2 space-x-2">
									<Button
										className="bg-red-500 text-white px-4 py-2 rounded"
										onClick={() => handleDelete(comment.id)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Edit Comment Modal */}
			<EditCommentModal
				show={showEditModal}
				onClose={() => setShowEditModal(false)}
				onSave={handleSaveEdit}
				comment={editingComment}
			/>
		</div>
	);
}
