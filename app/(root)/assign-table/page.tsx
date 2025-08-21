"use client";
import RsvpConfirmation from "@/components/shared/RsvpConfirmation";
import { Input } from "@/components/ui/input";
import { collection, db, doc, getDocs, updateDoc } from "@/lib/firebase";
import { RSVP, TableGroup } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { CSVLink } from "react-csv";

const TableAssignmentPage = () => {
	const [rsvps, setRsvps] = useState<RSVP[]>([]);
	const [tableGroups, setTableGroups] = useState<TableGroup[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");

	// Fetch RSVPs and Table Groups concurrently on mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [rsvpSnapshot, tableGroupSnapshot] = await Promise.all([
					getDocs(collection(db, "rsvps")),
					getDocs(collection(db, "tableGroups")),
				]);

				const rsvpList = rsvpSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})) as RSVP[];

				const tableGroupList = tableGroupSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})) as TableGroup[];

				// Sort table groups by table number (ascending)
				tableGroupList.sort((a, b) => a.tableNumber - b.tableNumber);

				setRsvps(rsvpList);
				setTableGroups(tableGroupList);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Handle assignment change for a given RSVP
	const handleTableAssignmentChange = async (
		rsvpId: string,
		newTableGroupId: string
	) => {
		try {
			const rsvpDocRef = doc(db, "rsvps", rsvpId);
			await updateDoc(rsvpDocRef, { tableGroupId: newTableGroupId });
			setRsvps((prev) =>
				prev.map((rsvp) =>
					rsvp.id === rsvpId ? { ...rsvp, tableGroupId: newTableGroupId } : rsvp
				)
			);
		} catch (error) {
			console.error("Error updating table assignment:", error);
		}
	};

	// Filter RSVPs based on search query (match firstName and lastName)
	const filteredRsvps = useMemo(
		() =>
			rsvps.filter((rsvp) =>
				`${rsvp.firstName} ${rsvp.lastName}`
					.toLowerCase()
					.includes(searchQuery.toLowerCase())
			),
		[rsvps, searchQuery]
	);

	// Create lookup for table group details by ID
	const tableGroupMap = useMemo(() => {
		return tableGroups.reduce((acc, group) => {
			acc[group.id] = group;
			return acc;
		}, {} as { [key: string]: TableGroup });
	}, [tableGroups]);

	// Prepare CSV data for filtered RSVPs
	const csvData = useMemo(
		() =>
			filteredRsvps.map((rsvp) => ({
				Name: `${rsvp.firstName} ${rsvp.lastName}`,
				"Table Number": rsvp.tableGroupId
					? tableGroupMap[rsvp.tableGroupId]?.tableNumber || ""
					: "Unassigned",
				"Group Name": rsvp.tableGroupId
					? tableGroupMap[rsvp.tableGroupId]?.groupName || ""
					: "",
				"User Type": rsvp.userType,
				Email: rsvp.email,
				Mobile: rsvp.mobile,
			})),
		[filteredRsvps, tableGroupMap]
	);

	// Group filtered RSVPs by tableGroupId; unassigned RSVPs are grouped under "unassigned"
	const groupedRsvps = useMemo(() => {
		return filteredRsvps.reduce((acc: { [key: string]: RSVP[] }, rsvp) => {
			const key = rsvp.tableGroupId || "unassigned";
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(rsvp);
			return acc;
		}, {});
	}, [filteredRsvps]);

	if (loading) return <p>Loading...</p>;

	return (
		<div className="container mx-auto px-4 py-8 mt-20">
			<div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
				<h1 className="text-xl md:text-3xl font-bold">Table Assignment</h1>
				<div className="flex flex-wrap gap-2">
					{/* Search Input */}
					<Input
						type="text"
						placeholder="Search by name..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="p-2 border rounded text-sm w-full md:w-auto"
					/>
					{/* Print Button */}
					<button
						onClick={() => window.print()}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						Print Sorted List
					</button>
					{/* CSV Export Button */}
					<CSVLink
						data={csvData}
						filename="rsvp_table_assignment.csv"
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
					>
						Download CSV
					</CSVLink>
				</div>
			</div>

			{/* Unassigned RSVPs Section */}
			<div className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">
					Unassigned RSVPs ({groupedRsvps["unassigned"]?.length || 0})
				</h2>
				{groupedRsvps["unassigned"] ? (
					<div className="overflow-x-auto">
						<table className="min-w-full table-auto mb-4 text-sm">
							<thead>
								<tr className="bg-gray-100">
									<th className="px-4 py-2">Name</th>
									<th className="px-4 py-2">Assign Table</th>
									<th className="px-4 py-2">Phone number</th>
									<th className="px-4 py-2">Ticket</th>
								</tr>
							</thead>
							<tbody>
								{groupedRsvps["unassigned"].map((rsvp) => (
									<tr key={rsvp.id} className="border-b">
										<td className="px-4 py-2">
											{rsvp.firstName} {rsvp.lastName}
										</td>
										<td className="px-4 py-2">
											<select
												value={rsvp.tableGroupId || ""}
												onChange={(e) =>
													handleTableAssignmentChange(rsvp.id, e.target.value)
												}
												className="p-2 border rounded w-full md:w-auto"
											>
												<option value="">Select Table</option>
												{tableGroups.map((group) => (
													<option key={group.id} value={group.id}>
														Table {group.tableNumber}{" "}
														{group.groupName ? `- ${group.groupName}` : ""}
													</option>
												))}
											</select>
										</td>
										<td className="px-4 py-2">{rsvp.mobile}</td>
										<td className="px-4 py-2">
											<button className="text-green-500">
												<RsvpConfirmation rsvp={rsvp} />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<p>No unassigned RSVPs.</p>
				)}
			</div>

			{/* Assigned RSVPs Sections */}
			{tableGroups.map((group) => (
				<div key={group.id} className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">
						Table {group.tableNumber}{" "}
						{group.groupName ? `- ${group.groupName}` : ""} (
						{groupedRsvps[group.id]?.length || 0})
					</h2>
					{groupedRsvps[group.id] ? (
						<div className="overflow-x-auto">
							<table className="min-w-full table-auto text-xs">
								<thead>
									<tr className="bg-gray-100">
										<th className="px-2 py-1">Name</th>
										<th className="px-2 py-1">Reassign Table</th>
										<th className="px-2 py-1">Phone number</th>
										<th className="px-2 py-1">Invite</th>
										<th className="px-2 py-1">Ticket</th>
									</tr>
								</thead>
								<tbody>
									{groupedRsvps[group.id].map((rsvp) => (
										<tr key={rsvp.id} className="border-b">
											<td className="px-2 py-1">
												{rsvp.firstName} {rsvp.lastName}
											</td>
											<td className="px-2 py-1">
												<select
													value={rsvp.tableGroupId || ""}
													onChange={(e) =>
														handleTableAssignmentChange(rsvp.id, e.target.value)
													}
													className="p-2 border rounded w-full md:w-auto"
												>
													<option value="">Select Table</option>
													{tableGroups.map((g) => (
														<option key={g.id} value={g.id}>
															Table {g.tableNumber}{" "}
															{g.groupName ? `- ${g.groupName}` : ""}
														</option>
													))}
												</select>
											</td>
											<td className="px-2 py-1">{rsvp.mobile}</td>
											<td className="px-2 py-1">{rsvp.userType}</td>
											<td className="px-2 py-1">
												<button className="text-green-500">
													<RsvpConfirmation rsvp={rsvp} />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<p>No RSVPs assigned to this table yet.</p>
					)}
				</div>
			))}
		</div>
	);
};

export default TableAssignmentPage;
