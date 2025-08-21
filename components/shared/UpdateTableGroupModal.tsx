"use client";

import React, { useEffect, useState } from "react";

interface TableGroup {
	id: string;
	tableNumber: number;
	groupName?: string;
}

interface UpdateTableGroupModalProps {
	show: boolean;
	onClose: () => void;
	onUpdate: (updatedData: Partial<TableGroup>) => void;
	group: TableGroup;
}

const UpdateTableGroupModal: React.FC<UpdateTableGroupModalProps> = ({
	show,
	onClose,
	onUpdate,
	group,
}) => {
	const [tableNumber, setTableNumber] = useState<number>(group.tableNumber);
	const [groupName, setGroupName] = useState<string>(group.groupName || "");

	// Update local state if the group prop changes
	useEffect(() => {
		setTableNumber(group.tableNumber);
		setGroupName(group.groupName || "");
	}, [group]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onUpdate({ tableNumber, groupName });
	};

	if (!show) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4">Update Table Group</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="tableNumber"
							className="block text-sm font-medium text-gray-700"
						>
							Table Number
						</label>
						<input
							id="tableNumber"
							type="number"
							value={tableNumber}
							onChange={(e) => setTableNumber(Number(e.target.value))}
							required
							className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="groupName"
							className="block text-sm font-medium text-gray-700"
						>
							Group Name (optional)
						</label>
						<input
							id="groupName"
							type="text"
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
							className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					<div className="flex justify-end space-x-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateTableGroupModal;
