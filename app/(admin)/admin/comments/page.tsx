"use client";

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
} from "@/lib/firebase";
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
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
				<h2 className="text-xl font-semibold mb-4">Edit Comment</h2>
				<Input
					type="text"
					value={editName}
					onChange={(e) => setEditName(e.target.value)}
					className="w-full mb-4"
					placeholder="Edit Name"
				/>
				<textarea
					value={editComment}
					onChange={(e) => setEditComment(e.target.value)}
					className="w-full p-3 border rounded-md resize-none"
					rows={4}
					placeholder="Edit Comment"
				/>
				<div className="flex justify-end mt-4 space-x-2">
					<Button
						onClick={handleSave}
						className="bg-green-600 hover:bg-green-700 text-white"
					>
						Save
					</Button>
					<Button onClick={onClose} variant="outline">
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
};

export default function CommentsPage() {
	const [comments, setComments] = useState<Comment[]>([]);
	const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchName, setSearchName] = useState("");
	const [editingComment, setEditingComment] = useState<Comment | null>(null);
	const [showEditModal, setShowEditModal] = useState(false);
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

			// Sort by timestamp (latest first)
			commentsList.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

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
		return (
			<div className="flex justify-center items-center min-h-64">
				<div className="text-lg">Loading comments...</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Comment Management</h1>
				<p className="text-gray-600 mt-1">
					Manage and moderate guest comments and messages
				</p>
			</div>

			{/* Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-white p-4 rounded-lg shadow-sm border">
					<h3 className="text-sm font-medium text-gray-600">Total Comments</h3>
					<p className="text-2xl font-bold text-gray-900">{comments.length}</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow-sm border">
					<h3 className="text-sm font-medium text-gray-600">
						Filtered Results
					</h3>
					<p className="text-2xl font-bold text-blue-600">
						{filteredComments.length}
					</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow-sm border">
					<h3 className="text-sm font-medium text-gray-600">Recent Comments</h3>
					<p className="text-2xl font-bold text-green-600">
						{
							comments.filter((comment) => {
								const dayAgo = new Date();
								dayAgo.setDate(dayAgo.getDate() - 1);
								return comment.timestamp.toDate() > dayAgo;
							}).length
						}
					</p>
				</div>
			</div>

			{/* Search and Filter */}
			<div className="bg-white p-6 rounded-lg shadow-sm border">
				<h3 className="text-lg font-semibold mb-4">Search and Filter</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
					<Input
						type="text"
						placeholder="Search by name..."
						value={searchName}
						onChange={(e) => setSearchName(e.target.value)}
					/>
					<Input
						type="text"
						placeholder="Search comments..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Label className="text-sm font-medium">Start Date</Label>
						<Input
							type="date"
							onChange={(e) =>
								setStartDate(
									e.target.value
										? Timestamp.fromDate(new Date(e.target.value))
										: null
								)
							}
						/>
					</div>
					<div>
						<Label className="text-sm font-medium">End Date</Label>
						<Input
							type="date"
							onChange={(e) =>
								setEndDate(
									e.target.value
										? Timestamp.fromDate(new Date(e.target.value))
										: null
								)
							}
						/>
					</div>
				</div>
			</div>

			{/* Comments Table */}
			<div className="bg-white rounded-lg shadow-sm border overflow-hidden">
				<div className="px-6 py-4 border-b">
					<h3 className="text-lg font-semibold">
						Comments ({filteredComments.length})
					</h3>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Name
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Comment
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredComments.map((comment) => (
								<tr key={comment.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm font-medium text-gray-900">
											{comment.name}
										</div>
									</td>
									<td className="px-6 py-4">
										<div className="text-sm text-gray-900 max-w-xs truncate">
											{comment.comment}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{comment.timestamp?.toDate?.()?.toLocaleDateString() ||
											"N/A"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
										<Button
											size="sm"
											onClick={() => handleEdit(comment)}
											className="bg-blue-600 hover:bg-blue-700 text-white"
										>
											Edit
										</Button>
										<Button
											size="sm"
											variant="destructive"
											onClick={() => handleDelete(comment.id)}
										>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{filteredComments.length === 0 && (
						<div className="text-center py-8 text-gray-500">
							No comments found matching your criteria.
						</div>
					)}
				</div>
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
