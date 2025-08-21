"use client";
// pages/admin/page.tsx
import ModalAdmin from "@/components/shared/ModalAdmin"; // Import the ModalAdmin component
import UpdateRsvpModal from "@/components/shared/UpdateRsvpModal";
import {
	collection,
	db,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "@/lib/firebase"; // Adjust the import according to your setup
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
// At the top of your AdminPage component file:
import RsvpConfirmation from "@/components/shared/RsvpConfirmation";
import ScanButton from "@/components/shared/ScanButton";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { RSVP } from "@/types";

const AdminPage = () => {
	const [rsvps, setRsvps] = useState<RSVP[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState(""); // State for search query
	const [userTypeFilter, setUserTypeFilter] = useState(""); // State for single user type filter
	const [stayingPlaceFilter, setStayingPlaceFilter] = useState(""); // State for staying place filter
	const [asoEbiFilter, setAsoEbiFilter] = useState(""); // State for Asoebi filter
	const [churchFilter, setChurchFilter] = useState(""); // State for church filter
	const [receptionFilter, setReceptionFilter] = useState(""); // State for reception filter
	const [afterPartyFilter, setAfterPartyFilter] = useState(""); // State for after party filter
	const [showModalAdmin, setShowModalAdmin] = useState(false); // State for showing the ModalAdmin
	const [selectedRsvp, setSelectedRsvp] = useState<string | null>(null); // State to store the selected RSVP ID
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
			})) as RSVP[]; // Cast the data as RSVP[]

			// Sort the RSVPs by timestamp (latest first)
			rsvpList.sort((a, b) => {
				const dateA = new Date(a.timestamp.seconds * 1000).getTime();
				const dateB = new Date(b.timestamp.seconds * 1000).getTime();
				return dateB - dateA; // Sort descending (latest first)
			});

			setRsvps(rsvpList);
			setLoading(false);
		};

		fetchRSVPs();
	}, []);

	const handleCheckIn = async (id: string) => {
		const rsvpDocRef = doc(db, "rsvps", id); // Correctly reference the document by ID
		await updateDoc(rsvpDocRef, { checkedIn: true });
		setRsvps((prev) =>
			prev.map((rsvp) => (rsvp.id === id ? { ...rsvp, checkedIn: true } : rsvp))
		);
	};

	const handleCheckOut = async (id: string) => {
		const rsvpDocRef = doc(db, "rsvps", id); // Correctly reference the document by ID
		await updateDoc(rsvpDocRef, { checkedIn: false });
		setRsvps((prev) =>
			prev.map((rsvp) =>
				rsvp.id === id ? { ...rsvp, checkedIn: false } : rsvp
			)
		);
	};

	const handleDelete = async () => {
		if (selectedRsvp) {
			const rsvpDocRef = doc(db, "rsvps", selectedRsvp); // Correctly reference the document by ID
			await deleteDoc(rsvpDocRef);
			setRsvps((prev) => prev.filter((rsvp) => rsvp.id !== selectedRsvp));
			setSelectedRsvp(null);
			setShowModalAdmin(false); // Close the ModalAdmin after deletion
		}
	};

	const confirmDelete = (id: string) => {
		setSelectedRsvp(id); // Set the selected RSVP ID
		setShowModalAdmin(true); // Show the ModalAdmin
	};

	const closeModalAdmin = () => {
		setShowModalAdmin(false);
		setSelectedRsvp(null);
	};

	// Filtered and searched RSVP data
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
	}));

	const TemitopenUpdateModal = (rsvp: RSVP) => {
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

	if (loading) return <p>Loading...</p>;

	return (
		<div className="container mx-auto px-4 py-8 mt-20">
			<h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

			{/* Search and Filter Inputs */}
			<div className="flex flex-col md:flex-row gap-4 mb-8">
				<Input
					type="text"
					placeholder="Search by name..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full md:w-1/2 p-2 border rounded"
				/>

				<select
					value={userTypeFilter}
					onChange={(e) => setUserTypeFilter(e.target.value)}
					className="w-full md:w-1/2 p-2 border rounded"
				>
					<option value="">Filter by User Type</option>
					<option value="vip">VIP</option>
					<option value="opesGuest">Opes Guest</option>
					<option value="TobilobasGuest">Tobilobas Guest</option>
					<option value="osibemekunFamilyGuest">Osibemekun Family Guest</option>
					<option value="oyediranFamilyGuest">Oyediran Family Guest</option>
					<option value="bridalParty">Bridal Party</option>
				</select>

				<select
					value={stayingPlaceFilter}
					onChange={(e) => setStayingPlaceFilter(e.target.value)}
					className="w-full md:w-1/2 p-2 border rounded"
				>
					<option value="">Filter by Staying Place</option>
					<option value="Recommended Hotel Vintanio">Recomended Hotel</option>
					<option value="At home with family">Home</option>
					<option value={"Other"}>Other</option>
					{/* Add other staying place options */}
				</select>

				<select
					value={asoEbiFilter}
					onChange={(e) => setAsoEbiFilter(e.target.value)}
					className="w-full md:w-1/2 p-2 border rounded"
				>
					<option value="">Filter by AsoEbi</option>
					<option value="Yes">Yes</option>
					<option value="No">No</option>
				</select>
				<select
					value={churchFilter}
					onChange={(e) => setChurchFilter(e.target.value)}
					className="w-full md:w-1/2 p-2 border rounded"
				>
					<option value="">Filter by Church</option>
					<option value="Yes">Yes</option>
					<option value="No">No</option>
				</select>
				<select
					value={receptionFilter}
					onChange={(e) => setReceptionFilter(e.target.value)}
					className="w-full md:w-1/2 p-2 border rounded"
				>
					<option value="">Filter by Reception</option>
					<option value="Yes">Yes</option>
					<option value="No">No</option>
				</select>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full table-auto">
					<thead>
						<tr className="bg-gray-100">
							<th className="px-4 py-2 text-left userType">Guest Type</th>
							<th className="px-4 py-2 text-left firstName">First Name</th>
							<th className="px-4 py-2 text-left lastName">Last Name</th>
							<th className="px-4 py-2 text-left email">Email</th>
							<th className="px-4 py-2 text-left mobile">Mobile</th>
							<th className="px-4 py-2 text-left stayingPlace">
								Staying Place
							</th>
							<th className="px-4 py-2 text-left allergies">Allergies</th>
							<th className="px-4 py-2 text-left asoEbi">Asoebi</th>
							<th className="px-4 py-2 text-left church">Church</th>
							<th className="px-4 py-2 text-left reception">Reception</th>
							<th className="px-4 py-2 text-left afterParty">After Party</th>
							<th className="px-4 py-2 text-left checkedIn">Checked In</th>
							<th className="px-4 py-2 text-left actions">
								<ScanButton />
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredRsvps.map((rsvp) => (
							<tr key={rsvp.id} className="border-b">
								<td className="px-4 py-2 userType">{rsvp.userType}</td>
								<td className="px-4 py-2 firstName">{rsvp.firstName}</td>
								<td className="px-4 py-2 lastName">{rsvp.lastName}</td>
								<td className="px-4 py-2 email">{rsvp.email}</td>
								<td className="px-4 py-2 mobile">{rsvp.mobile}</td>
								<td className="px-4 py-2 stayingPlace">
									{rsvp.stayingPlace},{rsvp.otherStaying}
								</td>
								<td className="px-4 py-2 allergies">{rsvp.allergies}</td>
								<td className="px-4 py-2 asoEbi">
									{rsvp.asoEbi} + {rsvp.asoebiType}
								</td>
								<td className="px-4 py-2 church">{rsvp.church}</td>
								<td className="px-4 py-2 reception">{rsvp.reception}</td>
								<td className="px-4 py-2 afterParty">{rsvp.afterParty}</td>
								<td className="px-4 py-2 checkedIn">
									{rsvp.checkedIn ? "Yes" : "No"}
								</td>
								<td className="px-4 py-2">
									<DropdownMenu>
										<DropdownMenuTrigger className="bg-green-500 text-white px-4 py-2 rounded">
											Actions
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												{!rsvp.checkedIn ? (
													<div
														className="text-green-500"
														onClick={() => handleCheckIn(rsvp.id)}
													>
														Check In
													</div>
												) : (
													<div
														className="text-yellow-500"
														onClick={() => handleCheckOut(rsvp.id)}
													>
														Check Out
													</div>
												)}
											</DropdownMenuItem>

											<DropdownMenuItem>
												<div onClick={() => TemitopenUpdateModal(rsvp)}>
													Edit
												</div>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<RsvpConfirmation rsvp={rsvp} />
											</DropdownMenuItem>
											<DropdownMenuItem>
												<div
													className="text-red-500"
													onClick={() => confirmDelete(rsvp.id)}
												>
													Delete
												</div>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="mt-8 text-center">
				<CSVLink
					data={csvData}
					filename={"filtered_rsvp_list.csv"}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Download Filtered CSV
				</CSVLink>
			</div>

			{/* ModalAdmin Component for Confirming Deletion */}
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
};

export default AdminPage;
