"use client";
import ModalAdmin from "@/components/shared/ModalAdmin";
import ScanButton from "@/components/shared/ScanButton";
import UpdateRsvpModal from "@/components/shared/UpdateRsvpModal";
import { Input } from "@/components/ui/input";
import {
	collection,
	db,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "@/lib/firebase";
import { RSVP, TableGroup } from "@/types";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

export default function CheckInPage() {
	const [rsvps, setRsvps] = useState<RSVP[]>([]);
	const [groups, setGroups] = useState<TableGroup[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [userTypeFilter, setUserTypeFilter] = useState("");
	const [stayingPlaceFilter, setStayingPlaceFilter] = useState("");
	const [asoEbiFilter, setAsoEbiFilter] = useState("");
	const [churchFilter, setChurchFilter] = useState("");
	const [receptionFilter, setReceptionFilter] = useState("");
	const [afterPartyFilter, setAfterPartyFilter] = useState("");
	const [showModalAdmin, setShowModalAdmin] = useState(false);
	const [selectedRsvp, setSelectedRsvp] = useState<string | null>(null);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [selectedRsvpToUpdate, setSelectedRsvpToUpdate] = useState<RSVP | null>(
		null
	);

	useEffect(() => {
		const fetchRSVPs = async () => {
			const rsvpCollection = collection(db, "rsvps");
			const querySnapshot = await getDocs(rsvpCollection);
			const rsvpList = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as RSVP[];

			const groupCollection = collection(db, "tableGroups");
			const groupSnapshot = await getDocs(groupCollection);
			const groupsData = groupSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as TableGroup[];

			groupsData.sort((a, b) => a.tableNumber - b.tableNumber);

			// Sort the RSVPs by timestamp (latest first)
			rsvpList.sort((a, b) => {
				const dateA = new Date(a.timestamp.seconds * 1000).getTime();
				const dateB = new Date(b.timestamp.seconds * 1000).getTime();
				return dateB - dateA; // Sort descending (latest first)
			});

			setRsvps(rsvpList);
			setGroups(groupsData);
			setLoading(false);
		};

		fetchRSVPs();
	}, []);

	const handleCheckIn = async (id: string) => {
		const rsvpDocRef = doc(db, "rsvps", id);
		await updateDoc(rsvpDocRef, { checkedIn: true });
		setRsvps((prev) =>
			prev.map((rsvp) => (rsvp.id === id ? { ...rsvp, checkedIn: true } : rsvp))
		);
	};

	const handleCheckOut = async (id: string) => {
		const rsvpDocRef = doc(db, "rsvps", id);
		await updateDoc(rsvpDocRef, { checkedIn: false });
		setRsvps((prev) =>
			prev.map((rsvp) =>
				rsvp.id === id ? { ...rsvp, checkedIn: false } : rsvp
			)
		);
	};

	const handleDelete = async () => {
		if (selectedRsvp) {
			const rsvpDocRef = doc(db, "rsvps", selectedRsvp);
			await deleteDoc(rsvpDocRef);
			setRsvps((prev) => prev.filter((rsvp) => rsvp.id !== selectedRsvp));
			setSelectedRsvp(null);
			setShowModalAdmin(false);
		}
	};

	const confirmDelete = (id: string) => {
		setSelectedRsvp(id);
		setShowModalAdmin(true);
	};

	const closeModalAdmin = () => {
		setShowModalAdmin(false);
		setSelectedRsvp(null);
	};

	const filteredRsvps = rsvps.filter((rsvp) => {
		const matchesSearch = `${rsvp.firstName} ${rsvp.lastName}`
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesUserType = userTypeFilter
			? rsvp.userType === userTypeFilter
			: true;
		const matchesStayingPlace = stayingPlaceFilter
			? rsvp.stayingPlace === stayingPlaceFilter
			: true;
		const matchesAsoEbi = asoEbiFilter ? rsvp.asoEbi === asoEbiFilter : true;
		const matchesChurch = churchFilter ? rsvp.church === churchFilter : true;
		const matchesReception = receptionFilter
			? rsvp.reception === receptionFilter
			: true;
		const matchesAfterParty = afterPartyFilter
			? rsvp.afterParty === afterPartyFilter
			: true;

		return (
			matchesSearch &&
			matchesUserType &&
			matchesStayingPlace &&
			matchesAsoEbi &&
			matchesChurch &&
			matchesReception &&
			matchesAfterParty
		);
	});

	// CSV Data preparation based on filtered data
	const csvData = filteredRsvps.map((rsvp) => ({
		"Guest Type": rsvp.userType,
		Relations: rsvp.relations,
		"First Name": rsvp.firstName,
		"Last Name": rsvp.lastName,
		Email: rsvp.email,
		Mobile: rsvp.mobile,
		"Staying Place": rsvp.stayingPlace ? rsvp.stayingPlace : "N/A",
		Allergies: rsvp.allergies ? rsvp.allergies : "None",
		Asoebi: rsvp.asoEbi ? `${rsvp.asoEbi} - ${rsvp.asoebiType}` : "No",
		Church: rsvp.church ? "Yes" : "No",
		Reception: rsvp.reception ? "Yes" : "No",
		"After Party": rsvp.afterParty ? "Yes" : "No",
		"Checked In": rsvp.checkedIn ? "Yes" : "No",
		"RSVP Timestamp": new Date(rsvp.timestamp?.seconds * 1000).toLocaleString(),
		"Table Number": rsvp.tableGroupId
			? groups.find(
					(group: { id: string | undefined }) => group.id === rsvp.tableGroupId
			  )?.tableNumber
			: "N/A",
	}));

	const handleUpdateModal = (rsvp: RSVP) => {
		setSelectedRsvpToUpdate(rsvp);
		setShowUpdateModal(true);
	};

	const closeUpdateModal = () => {
		setShowUpdateModal(false);
		setSelectedRsvpToUpdate(null);
	};

	const handleUpdateRsvp = async (updatedRsvp: Partial<RSVP>) => {
		if (!selectedRsvpToUpdate) return;
		const rsvpDocRef = doc(db, "rsvps", selectedRsvpToUpdate.id);

		await updateDoc(rsvpDocRef, updatedRsvp);

		setRsvps((prev) =>
			prev.map((rsvp) =>
				rsvp.id === selectedRsvpToUpdate.id ? { ...rsvp, ...updatedRsvp } : rsvp
			)
		);
		closeUpdateModal();
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-64">
				<div className="text-lg">Loading check-in data...</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Guest Check-In</h1>
					<p className="text-gray-600 mt-1">
						Manage guest check-ins and check-outs for the wedding events
					</p>
				</div>
				<CSVLink
					data={csvData}
					filename={"filtered_check_in_list.csv"}
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
				>
					Download CSV
				</CSVLink>
			</div>

			{/* Quick Stats */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="bg-white p-4 rounded-lg shadow-sm border">
					<h3 className="text-sm font-medium text-gray-600">Total Guests</h3>
					<p className="text-2xl font-bold text-gray-900">{rsvps.length}</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow-sm border">
					<h3 className="text-sm font-medium text-gray-600">Checked In</h3>
					<p className="text-2xl font-bold text-green-600">
						{rsvps.filter((rsvp) => rsvp.checkedIn).length}
					</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow-sm border">
					<h3 className="text-sm font-medium text-gray-600">
						Church Attendees
					</h3>
					<p className="text-2xl font-bold text-blue-600">
						{rsvps.filter((rsvp) => rsvp.church === "yes").length}
					</p>
				</div>
				<div className="bg-white p-4 rounded-lg shadow-sm border">
					<h3 className="text-sm font-medium text-gray-600">
						Reception Attendees
					</h3>
					<p className="text-2xl font-bold text-purple-600">
						{rsvps.filter((rsvp) => rsvp.reception === "yes").length}
					</p>
				</div>
			</div>

			{/* Search and Filter Controls */}
			<div className="bg-white p-6 rounded-lg shadow-sm border">
				<h3 className="text-lg font-semibold mb-4">Search and Filter</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					<Input
						type="text"
						placeholder="Search by name..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full"
					/>

					<select
						value={userTypeFilter}
						onChange={(e) => setUserTypeFilter(e.target.value)}
						className="w-full p-2 border rounded-md"
					>
						<option value="">Filter by User Type</option>
						<option value="vip">VIP</option>
						<option value="opesGuest">Temitopes Guest</option>
						<option value="TobilobasGuest">Tobilobas Guest</option>
						<option value="osibemekunFamilyGuest">
							Temitopes Family Guest
						</option>
						<option value="oyediranFamilyGuest">Tobilobas Family Guest</option>
						<option value="bridalParty">Bridal Party</option>
					</select>

					<select
						value={stayingPlaceFilter}
						onChange={(e) => setStayingPlaceFilter(e.target.value)}
						className="w-full p-2 border rounded-md"
					>
						<option value="">Filter by Staying Place</option>
						<option value="Recommended Hotel Vintanio">
							Recommended Hotel
						</option>
						<option value="At home with family">Home</option>
						<option value="Other">Other</option>
					</select>

					<select
						value={churchFilter}
						onChange={(e) => setChurchFilter(e.target.value)}
						className="w-full p-2 border rounded-md"
					>
						<option value="">Filter by Church</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>

					<select
						value={receptionFilter}
						onChange={(e) => setReceptionFilter(e.target.value)}
						className="w-full p-2 border rounded-md"
					>
						<option value="">Filter by Reception</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>

					<select
						value={asoEbiFilter}
						onChange={(e) => setAsoEbiFilter(e.target.value)}
						className="w-full p-2 border rounded-md"
					>
						<option value="">Filter by AsoEbi</option>
						<option value="Yes">Yes</option>
						<option value="No">No</option>
					</select>
				</div>
			</div>

			{/* Check-in Table */}
			<div className="bg-white rounded-lg shadow-sm border overflow-hidden">
				<div className="px-6 py-4 border-b flex justify-between items-center">
					<h3 className="text-lg font-semibold">
						Guest List ({filteredRsvps.length})
					</h3>
					<ScanButton />
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Table
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Guest Name
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Allergies
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Church
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Reception
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredRsvps.map((rsvp) => (
								<tr
									key={rsvp.id}
									className={rsvp.checkedIn ? "bg-green-50" : ""}
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{rsvp.tableGroupId
											? groups.find(
													(group: { id: string | undefined }) =>
														group.id === rsvp.tableGroupId
											  )?.tableNumber || "N/A"
											: "N/A"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm font-medium text-gray-900">
											{rsvp.firstName} {rsvp.lastName}
										</div>
										<div className="text-sm text-gray-500">{rsvp.userType}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{rsvp.allergies || "None"}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												rsvp.church === "yes"
													? "bg-green-100 text-green-800"
													: "bg-gray-100 text-gray-800"
											}`}
										>
											{rsvp.church === "yes" ? "Yes" : "No"}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												rsvp.reception === "yes"
													? "bg-green-100 text-green-800"
													: "bg-gray-100 text-gray-800"
											}`}
										>
											{rsvp.reception === "yes" ? "Yes" : "No"}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												rsvp.checkedIn
													? "bg-green-100 text-green-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
										>
											{rsvp.checkedIn ? "Checked In" : "Not Checked In"}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
										{!rsvp.checkedIn ? (
											<button
												onClick={() => handleCheckIn(rsvp.id)}
												className="text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 px-3 py-1 rounded"
											>
												Check In
											</button>
										) : (
											<button
												onClick={() => handleCheckOut(rsvp.id)}
												className="text-yellow-600 hover:text-yellow-900 bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded"
											>
												Check Out
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modals */}
			<ModalAdmin
				show={showModalAdmin}
				title="Confirm Deletion"
				message="Are you sure you want to delete this RSVP? This action cannot be undone."
				onClose={closeModalAdmin}
				onConfirm={handleDelete}
				confirmText="Delete"
				closeText="Cancel"
			/>
			<UpdateRsvpModal
				show={showUpdateModal}
				onClose={closeUpdateModal}
				onUpdate={handleUpdateRsvp}
				rsvp={selectedRsvpToUpdate}
			/>
		</div>
	);
}
