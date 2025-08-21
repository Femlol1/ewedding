"use client";
import SendEmailsButton from "@/components/shared/SendEmailsButton";
import SendSpecEmailsButton from "@/components/shared/SendSpecEmailsButton";
import { collection, db, getDocs } from "@/lib/firebase"; // Adjust the import according to your setup
import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	ChartOptions,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	ArcElement
);
const StatsPage = () => {
	const [stats, setStats] = useState({
		totalRSVPs: 0,
		yesToAsoebi: 0,
		noToAsoebi: 0,
		maleAsoebi: 0,
		femaleAsoebi: 0,
		attendingChurch: 0,
		attendingReception: 0,
		attendingAfterParty: 0,
		checkedIn: 0,
		vipUser: 0,
		opesGuest: 0,
		TobilobasGuest: 0,
		osibemekunFamilyGuest: 0,
		oyediranFamilyGuest: 0,
		bridalParty: 0,
	});

	useEffect(() => {
		const fetchStats = async () => {
			const rsvpCollection = collection(db, "rsvps");
			const querySnapshot = await getDocs(rsvpCollection);

			let totalRSVPs = 0;
			let yesToAsoebi = 0;
			let noToAsoebi = 0;
			let maleAsoebi = 0;
			let femaleAsoebi = 0;
			let attendingChurch = 0;
			let attendingReception = 0;
			let attendingAfterParty = 0;
			let checkedIn = 0;
			let vipUser = 0;
			let TemitopesGuest = 0;
			let TobilobasGuest = 0;
			let osibemekunFamilyGuest = 0;
			let oyediranFamilyGuest = 0;
			let bridalParty = 0;

			querySnapshot.docs.forEach((doc) => {
				const data = doc.data();

				totalRSVPs += 1;
				if (data.asoEbi === "Yes") yesToAsoebi += 1;
				if (data.asoEbi === "No") noToAsoebi += 1;
				if (data.asoebiType === "Male") maleAsoebi += 1;
				if (data.asoebiType === "Female") femaleAsoebi += 1;
				if (data.church === "Yes") attendingChurch += 1;
				if (data.reception === "Yes") attendingReception += 1;
				if (data.afterParty === "Yes") attendingAfterParty += 1;
				if (data.checkedIn) checkedIn += 1;
				if (data.userType === "vip") vipUser += 1;
				if (data.userType === "opesGuest") TemitopesGuest += 1;
				if (data.userType === "TobilobasGuest") TobilobasGuest += 1;
				if (data.userType === "osibemekunFamilyGuest")
					osibemekunFamilyGuest += 1;
				if (data.userType === "oyediranFamilyGuest") oyediranFamilyGuest += 1;
				if (data.userType === "bridalParty") bridalParty += 1;
			});

			setStats({
				totalRSVPs,
				yesToAsoebi,
				noToAsoebi,
				maleAsoebi,
				femaleAsoebi,
				attendingChurch,
				attendingReception,
				attendingAfterParty,
				checkedIn,
				vipUser,
				opesGuest,
				TobilobasGuest,
				osibemekunFamilyGuest,
				oyediranFamilyGuest,
				bridalParty,
			});
		};

		fetchStats();
	}, []);

	const data = {
		labels: [
			"RSVPs",
			"Yes to Asoebi",
			"No to Asoebi",
			"Male Asoebi",
			"Female Asoebi",
			"Church",
			"Reception",
			"After Party",
			"Checked In",
		],
		datasets: [
			{
				label: "Event Statistics",
				data: [
					stats.totalRSVPs,
					stats.yesToAsoebi,
					stats.noToAsoebi,
					stats.maleAsoebi,
					stats.femaleAsoebi,
					stats.attendingChurch,
					stats.attendingReception,
					stats.attendingAfterParty,
					stats.checkedIn,
				],
				backgroundColor: [
					"#4A90E2",
					"#50E3C2",
					"#F5A623",
					"#BD10E0",
					"#B8E986",
					"#F8E71C",
					"#7ED321",
					"#D0021B",
					"#9013FE",
				],
				borderColor: [
					"#4A90E2",
					"#50E3C2",
					"#F5A623",
					"#BD10E0",
					"#B8E986",
					"#F8E71C",
					"#7ED321",
					"#D0021B",
					"#9013FE",
				],
				borderWidth: 1,
			},
		],
	};

	const options: ChartOptions<"bar"> = {
		responsive: true,
		plugins: {
			legend: {
				position: "top", // use a valid position here: 'top', 'left', 'bottom', 'right'
			},
			title: {
				display: true,
				text: "Event Statistics Overview",
			},
		},
	};

	return (
		<div className="container mx-auto px-4 py-8 mt-20">
			<h1 className="text-3xl font-bold mb-6">Event Statistics</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Total RSVPs</h2>
					<p className="text-3xl font-bold">{stats.totalRSVPs}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Yes to Asoebi</h2>
					<p className="text-3xl font-bold">{stats.yesToAsoebi}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">No to Asoebi</h2>
					<p className="text-3xl font-bold">{stats.noToAsoebi}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Male Asoebi</h2>
					<p className="text-3xl font-bold">{stats.maleAsoebi}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Female Asoebi</h2>
					<p className="text-3xl font-bold">{stats.femaleAsoebi}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Attending Church</h2>
					<p className="text-3xl font-bold">{stats.attendingChurch}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Attending Reception</h2>
					<p className="text-3xl font-bold">{stats.attendingReception}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Attending After Party</h2>
					<p className="text-3xl font-bold">{stats.attendingAfterParty}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Checked In</h2>
					<p className="text-3xl font-bold">{stats.checkedIn}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">Vip users</h2>
					<p className="text-3xl font-bold">{stats.vipUser}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">opesGuest</h2>
					<p className="text-3xl font-bold">{stats.opesGuest}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">TobilobasGuest</h2>
					<p className="text-3xl font-bold">{stats.TobilobasGuest}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">osibemekunFamilyGuest</h2>
					<p className="text-3xl font-bold">{stats.osibemekunFamilyGuest}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">oyediranFamilyGuest</h2>
					<p className="text-3xl font-bold">{stats.oyediranFamilyGuest}</p>
				</div>
				<div className="bg-gray-100 p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold">bridalParty</h2>
					<p className="text-3xl font-bold">{stats.bridalParty}</p>
				</div>
			</div>

			<div className="mt-8">
				<Bar data={data} options={options} />
			</div>
			<SendEmailsButton />
			<SendSpecEmailsButton />
		</div>
	);
};

export default StatsPage;
