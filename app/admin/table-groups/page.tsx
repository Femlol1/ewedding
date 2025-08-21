"use client";
import ModalAdmin from "@/components/shared/ModalAdmin"; // For deletion confirmation
import UpdateTableGroupModal from "@/components/shared/UpdateTableGroupModal";
import {
	addDoc,
	collection,
	db,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "@/lib/firebase"; // Adjust the import according to your Firebase setup
import { RSVP, TableGroup } from "@/types";
import { useEffect, useState } from "react";

const TableGroupsAdminPage = () => {
	const [groups, setGroups] = useState<TableGroup[]>([]);
	const [rsvps, setRsvps] = useState<RSVP[]>([]);
	const [loading, setLoading] = useState(true);
	// States for the "Add Group" form
	const [newTableNumber, setNewTableNumber] = useState<number | "">("");
	const [newGroupName, setNewGroupName] = useState("");
	// States for modals
	const [selectedGroup, setSelectedGroup] = useState<TableGroup | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);

	// Fetch table groups and RSVPs from Firebase
	useEffect(() => {
		const fetchData = async () => {
			// Fetch table groups
			const groupCollection = collection(db, "tableGroups");
			const groupSnapshot = await getDocs(groupCollection);
			const groupsData = groupSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as TableGroup[];

			groupsData.sort((a, b) => a.tableNumber - b.tableNumber);

			// Fetch RSVPs
			const rsvpCollection = collection(db, "rsvps");
			const rsvpSnapshot = await getDocs(rsvpCollection);
			const rsvpData = rsvpSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as RSVP[];

			setGroups(groupsData);
			setRsvps(rsvpData);
			setLoading(false);
		};

		fetchData();
	}, []);

	// Add a new table group
	const handleAddGroup = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newTableNumber === "") return;

		const groupData = {
			tableNumber: Number(newTableNumber),
			groupName: newGroupName,
			// Not relying on a stored names array for dynamic counting
		};

		const docRef = await addDoc(collection(db, "tableGroups"), groupData);
		const newGroup: TableGroup = { id: docRef.id, ...groupData };

		// Update the list and sort
		const updatedGroups = [...groups, newGroup].sort(
			(a, b) => a.tableNumber - b.tableNumber
		);
		setGroups(updatedGroups);

		// Clear the form
		setNewTableNumber("");
		setNewGroupName("");
	};

	// Delete a table group after confirmation
	const handleDeleteGroup = async () => {
		if (!selectedGroup) return;
		const groupDocRef = doc(db, "tableGroups", selectedGroup.id);
		await deleteDoc(groupDocRef);
		setGroups((prev) => prev.filter((group) => group.id !== selectedGroup.id));
		setShowDeleteModal(false);
		setSelectedGroup(null);
	};

	// Temitopen the delete confirmation modal
	const confirmDelete = (group: TableGroup) => {
		setSelectedGroup(group);
		setShowDeleteModal(true);
	};

	// Temitopen the update modal with the selected group
	const TemitopenUpdateModal = (group: TableGroup) => {
		setSelectedGroup(group);
		setShowUpdateModal(true);
	};

	// Handle update after the update modal is submitted
	const handleUpdateGroup = async (updatedData: Partial<TableGroup>) => {
		if (!selectedGroup) return;
		const groupDocRef = doc(db, "tableGroups", selectedGroup.id);
		await updateDoc(groupDocRef, updatedData);
		setGroups((prev) =>
			prev.map((group) =>
				group.id === selectedGroup.id ? { ...group, ...updatedData } : group
			)
		);
		setShowUpdateModal(false);
		setSelectedGroup(null);
	};

	// Compute the number of RSVPs assigned to a specific table group
	const getAssignedCount = (groupId: string) => {
		return rsvps.filter((rsvp) => rsvp.tableGroupId === groupId).length;
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Manage Table Groups</h1>

			{/* Add New Group Form */}
			<form onSubmit={handleAddGroup} className="mb-6">
				<div className="flex flex-col md:flex-row gap-4 items-center">
					<input
						type="number"
						placeholder="Table Number"
						value={newTableNumber}
						onChange={(e) =>
							setNewTableNumber(
								e.target.value === "" ? "" : Number(e.target.value)
							)
						}
						className="p-2 border rounded"
						required
					/>
					<input
						type="text"
						placeholder="Group Name (optional)"
						value={newGroupName}
						onChange={(e) => setNewGroupName(e.target.value)}
						className="p-2 border rounded"
					/>
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Add Group
					</button>
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded"
						onClick={() => (window.location.href = "/admin/assign-table")}
					>
						Assign Table
					</button>
				</div>
			</form>

			{/* Table Groups List */}
			<table className="min-w-full table-auto">
				<thead>
					<tr className="bg-gray-100">
						<th className="px-4 py-2">Table Number</th>
						<th className="px-4 py-2">Group Name</th>
						<th className="px-4 py-2">Number of Names</th>
						<th className="px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{groups.map((group) => (
						<tr key={group.id} className="border-b">
							<td className="px-4 py-2">{group.tableNumber}</td>
							<td className="px-4 py-2">{group.groupName}</td>
							<td className="px-4 py-2">{getAssignedCount(group.id)}</td>
							<td className="px-4 py-2">
								<button
									className="text-blue-500 mr-2"
									onClick={() => TemitopenUpdateModal(group)}
								>
									Edit
								</button>
								<button
									className="text-red-500"
									onClick={() => confirmDelete(group)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Delete Confirmation Modal */}
			{showDeleteModal && selectedGroup && (
				<ModalAdmin
					show={showDeleteModal}
					title="Confirm Deletion"
					message={`Are you sure you want to delete Table ${selectedGroup.tableNumber}? This action cannot be undone.`}
					onClose={() => setShowDeleteModal(false)}
					onConfirm={handleDeleteGroup}
					confirmText="Delete"
					closeText="Cancel"
				/>
			)}

			{/* Update Table Group Modal */}
			{showUpdateModal && selectedGroup && (
				<UpdateTableGroupModal
					show={showUpdateModal}
					onClose={() => setShowUpdateModal(false)}
					onUpdate={handleUpdateGroup}
					group={selectedGroup}
				/>
			)}
		</div>
	);
};

export default TableGroupsAdminPage;
