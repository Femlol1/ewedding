// components/shared/Countdown.js
"use client";
import { useEffect, useState } from "react";

const Countdown = ({ eventDate }) => {
	const [timeLeft, setTimeLeft] = useState("");

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date();
			const event = new Date(eventDate);
			const difference = event - now;

			const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			// const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			setTimeLeft(`${days % 30} days, ${hours} hours, ${minutes} minutes`);
		}, 1000);

		return () => clearInterval(timer);
	}, [eventDate]);

	return (
		<div className="text-center text-sm my-4 font-bold bg-gray-100 p-4 rounded-md shadow-md">
			{timeLeft}
		</div>
	);
};

export default Countdown;
