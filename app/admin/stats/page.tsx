"use client";
import SendEmailsButton from "@/components/shared/SendEmailsButton";
import SendSpecEmailsButton from "@/components/shared/SendSpecEmailsButton";
import { collection, db, getDocs } from "@/lib/firebase";
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

export default function StatsPage() {
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
			let opesGuest = 0;
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
				if (data.church === "yes") attendingChurch += 1;
				if (data.reception === "yes") attendingReception += 1;
				if (data.afterParty === "yes") attendingAfterParty += 1;
				if (data.checkedIn) checkedIn += 1;
				if (data.userType === "vip") vipUser += 1;
				if (data.userType === "opesGuest") opesGuest += 1;
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
				position: "top",
			},
			title: {
				display: true,
				text: "Event Statistics Overview",
			},
		},
	};

	const userTypeStats = [
		{ label: "VIP Users", value: stats.vipUser, color: "bg-purple-500" },
		{ label: "Temitopes Guests", value: stats.opesGuest, color: "bg-blue-500" },
		{
			label: "Tobilobas Guests",
			value: stats.TobilobasGuest,
			color: "bg-green-500",
		},
		{
			label: "Temitopes Family",
			value: stats.osibemekunFamilyGuest,
			color: "bg-yellow-500",
		},
		{
			label: "Tobilobas Family",
			value: stats.oyediranFamilyGuest,
			color: "bg-red-500",
		},
		{ label: "Bridal Party", value: stats.bridalParty, color: "bg-pink-500" },
	];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Event Statistics</h1>
				<p className="text-gray-600 mt-1">
					Comprehensive overview of wedding event data and guest responses
				</p>
			</div>

			{/* Main Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<h2 className="text-lg font-semibold text-gray-700">Total RSVPs</h2>
					<p className="text-3xl font-bold text-blue-600">{stats.totalRSVPs}</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<h2 className="text-lg font-semibold text-gray-700">Checked In</h2>
					<p className="text-3xl font-bold text-green-600">{stats.checkedIn}</p>
				</div>
				<div className="bg-white p-6 rounded-lg shadow-sm border">
					<h2 className="text-lg font-semibold text-gray-700">Check-in Rate</h2>
					<p className="text-3xl font-bold text-purple-600">
						{stats.totalRSVPs > 0
							? Math.round((stats.checkedIn / stats.totalRSVPs) * 100)
							: 0}
						%
					</p>
				</div>
			</div>

			{/* Event Attendance */}
			<div className="bg-white p-6 rounded-lg shadow-sm border">
				<h3 className="text-lg font-semibold mb-4">Event Attendance</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="text-center">
						<div className="text-2xl font-bold text-blue-600">
							{stats.attendingChurch}
						</div>
						<div className="text-sm text-gray-600">Church Ceremony</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-green-600">
							{stats.attendingReception}
						</div>
						<div className="text-sm text-gray-600">Reception</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-purple-600">
							{stats.attendingAfterParty}
						</div>
						<div className="text-sm text-gray-600">After Party</div>
					</div>
				</div>
			</div>

			{/* Asoebi Statistics */}
			<div className="bg-white p-6 rounded-lg shadow-sm border">
				<h3 className="text-lg font-semibold mb-4">Asoebi Statistics</h3>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div className="text-center">
						<div className="text-2xl font-bold text-green-600">
							{stats.yesToAsoebi}
						</div>
						<div className="text-sm text-gray-600">Yes to Asoebi</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-red-600">
							{stats.noToAsoebi}
						</div>
						<div className="text-sm text-gray-600">No to Asoebi</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-blue-600">
							{stats.maleAsoebi}
						</div>
						<div className="text-sm text-gray-600">Male Asoebi</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-pink-600">
							{stats.femaleAsoebi}
						</div>
						<div className="text-sm text-gray-600">Female Asoebi</div>
					</div>
				</div>
			</div>

			{/* Guest Types */}
			<div className="bg-white p-6 rounded-lg shadow-sm border">
				<h3 className="text-lg font-semibold mb-4">Guest Categories</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{userTypeStats.map((stat, index) => (
						<div key={index} className="flex items-center space-x-3">
							<div className={`w-4 h-4 rounded ${stat.color}`}></div>
							<div className="flex-1">
								<div className="text-sm font-medium text-gray-700">
									{stat.label}
								</div>
								<div className="text-lg font-bold">{stat.value}</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Chart */}
			<div className="bg-white p-6 rounded-lg shadow-sm border">
				<h3 className="text-lg font-semibold mb-4">Visual Overview</h3>
				<div className="h-96">
					<Bar data={data} options={options} />
				</div>
			</div>

			{/* Email Management */}
			<div className="bg-white p-6 rounded-lg shadow-sm border">
				<h3 className="text-lg font-semibold mb-4">Email Management</h3>
				<p className="text-gray-600 mb-4">Send email notifications to guests</p>
				<div className="flex flex-col sm:flex-row gap-4">
					<SendEmailsButton />
					<SendSpecEmailsButton />
				</div>
			</div>
		</div>
	);
}
