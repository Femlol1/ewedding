// pages/travel.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";

export default function Travel() {
	return (
		<div className="flex flex-col md:flex-col md:mt-20">
			{/* Image Section */}
			<section className="relative w-full h-64 ">
				<Image
					src="/assets/images/Travel/Lagos.jpg" // Replace with your image path
					alt="Welcome Image"
					fill
					style={{ objectFit: "cover" }}
					quality={100}
					className="z-0"
				/>
				<div className="absolute inset-0 bg-black opacity-50 z-10"></div>
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
					<h3 className="text-3xl md:text-5xl font-bold mt-2">Lagos</h3>
				</div>
			</section>
			<div className="container mx-auto px-4 py-8">
				<section className="mb-6">
					<h2 className="text-2xl font-semibold">Hotels recommendations</h2>
					<p className="mt-2">
						For your convenience, we have reserved a block of rooms at the
						following hotels. Please mention our wedding when booking to receive
						a special rate.
					</p>

					<div className="mt-4 flex flex-col md:flex-row items-center md:items-start gap-4">
						<Image
							src="/assets/images/Travel/1709116341696.jpeg" // Replace with the actual image path
							alt="Hotel Vintanio"
							width={300}
							height={200}
							className="rounded-lg w-full md:w-1/3 object-cover"
						/>
						<div className="md:w-2/3">
							<h3 className="text-xl font-semibold">Hotel Vintanio</h3>
							<p>
								We recommend Hotel Vintanio in Lekki for those seeking
								accommodation at{" "}
								<TbCurrencyNaira className="inline-flex mb-1" />
								100,000 per night. It is approximately 10 minutes to FourSquare
								and 20 minutes to Monarch. Please contact the wedding planner at{" "}
								<span className="text-primary-500 hover:text-primary-700">
									<a href={`tel:${`+2348080918070`}`}>+234(0)8080918070</a>
								</span>{" "}
								to book a room at our discounted rate.
							</p>
							<p>
								More information:{" "}
								<Link
									className="text-primary-500 hover:text-primary-700 underline"
									href="https://vintanohotel.com/"
								>
									{" "}
									Hotel Vintanio Website{" "}
								</Link>
							</p>
						</div>
					</div>
					<div className="mt-4 flex flex-col md:flex-row items-center md:items-start gap-4">
						<Image
							src="/assets/images/Travel/albergohotels.jpg" // Replace with the actual image path
							alt="albergohotels"
							width={300}
							height={200}
							className="rounded-lg w-full md:w-1/3 object-cover"
						/>
						<div className="md:w-2/3">
							<h3 className="text-xl font-semibold">Albergo Hotel</h3>
							<p>
								We recommend Albergo Hotel in Lekki for those seeking
								accommodation at{" "}
								<TbCurrencyNaira className="inline-flex mb-1" />
								100,000 per night. It is approximately 10 minutes to FourSquare
								and 20 minutes to Monarch. Please contact the wedding planner at{" "}
								<span className="text-primary-500 hover:text-primary-700">
									<a href={`tel:${`+2348080918070`}`}>+234(0)8080918070</a>
								</span>{" "}
								to book a room at our discounted rate.
							</p>
							<p>
								More information:{" "}
								<Link
									className="text-primary-500 hover:text-primary-700 underline"
									href="https://www.albergohotels.com"
								>
									{" "}
									Albergo Hotel Website{" "}
								</Link>
							</p>
						</div>
					</div>
					<div className="mt-4 flex flex-col md:flex-row items-center md:items-start gap-4">
						<Image
							src="/assets/images/Travel/The-Corniche-Hotel.jpg" // Replace with the actual image path
							alt="The-Corniche-Hotel"
							width={300}
							height={200}
							className="rounded-lg w-full md:w-1/3 object-cover"
						/>
						<div className="md:w-2/3">
							<h3 className="text-xl font-semibold">The Corniche Hotel</h3>
							<p>
								We recommend The Corniche Hotel in Lekki for those seeking
								accommodation at{" "}
								<TbCurrencyNaira className="inline-flex mb-1" />
								65,000 per night. It is approximately 15 minutes to FourSquare
								and 22 minutes to Monarch. Please contact the wedding planner at{" "}
								<span className="text-primary-500 hover:text-primary-700">
									<a href={`tel:${`+2348080918070`}`}>+234(0)8080918070</a>
								</span>{" "}
								to book a room at our discounted rate.
							</p>
							<p>
								More information:{" "}
								<Link
									className="text-primary-500 hover:text-primary-700 underline"
									href="https://www.thecornichehotel.com/room-and-suites/"
								>
									{" "}
									The Corniche Hotel Website{" "}
								</Link>
							</p>
						</div>
					</div>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">Airbnb Options</h2>
					<p className="mt-2">
						There are also numerous Airbnb options available around the event
						locations. Here is a link to Airbnb listings recommended for their
						quality and proximity to our wedding events:{" "}
						<span>
							<Link
								className="text-primary-500 hover:text-primary-700 underline"
								href="https://www.airbnb.co.uk/s/Yaba--Lagos--Nigeria/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2024-12-01&monthly_length=3&monthly_end_date=2025-03-01&price_filter_input_type=2&channel=EXPLORE&zoom_level=11.54261450728684&search_type=user_map_move&price_filter_num_nights=5&date_picker_type=calendar&source=structured_search_input_header&query=Yaba%2C%20Lagos%2C%20Nigeria&place_id=ChIJSz-LNYyMOxARNITfQ73PUlU&search_mode=regular_search&ne_lat=6.528988197900934&ne_lng=3.6121034529260214&sw_lat=6.296074799515078&sw_lng=3.3942637454658495&zoom=11.54261450728684&search_by_map=true"
							>
								Airbnbs near Lagos
							</Link>
						</span>
					</p>
				</section>

				<section>
					<h2 className="text-2xl font-semibold mt-6">Things to do in Lagos</h2>
					<p className="mt-2">
						Lagos is a vibrant city with plenty to offer. Whether you are
						interested in cultural sites, shopping, or outdoor activities,
						there&apos;s something for everyone. Below are some recommendations:{" "}
						<Link
							className="text-primary-500 hover:text-primary-700 underline"
							href="https://www.tripadvisor.co.uk/Attractions-g304026-Activities-Lagos_Lagos_State.html"
							target="_blank"
						>
							Explore Top Attractions on TripAdvisor
						</Link>
						{"   ,  "}
						<Link
							className="text-primary-500 hover:text-primary-700 underline"
							href="https://www.viator.com/Nigeria/d22316-ttd"
							target="_blank"
						>
							Explore Tours and Activities on Viator
						</Link>
					</p>
					<ul className="mt-4 list-disc list-inside space-y-2 flex-row">
						<li></li>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
							<li>
								<div className="flex flex-col items-center gap-4">
									<Image
										src="/assets/images/Travel/Market-Lagos-Nigeria.jpg"
										alt="Lekki Market"
										width={300}
										height={200}
										className="rounded-lg w-full object-cover"
									/>
									<p className="text-gray-700 text-center">
										Enjoy the bustling markets like{" "}
										<strong>Lekki Market or Balogun Market</strong> where you
										can buy local crafts and souvenirs.
									</p>
								</div>
							</li>
							<li>
								<div className="flex flex-col items-center gap-4">
									<Image
										src="/assets/images/Travel/NikeArt.jpg"
										alt="Nike Art Gallery"
										width={300}
										height={200}
										className="rounded-lg w-full object-cover"
									/>
									<p className="text-gray-700 text-center">
										Visit the <strong>Nike Art Gallery</strong>, one of the
										largest art galleries in West Africa, showcasing the best of
										Nigerian art.
									</p>
								</div>
							</li>
							<li>
								<div className="flex flex-col items-center gap-4">
									<Image
										src="/assets/images/Travel/Beach-3.jpg"
										alt="Tarkwa Bay Beach"
										width={300}
										height={200}
										className="rounded-lg w-full object-cover"
									/>
									<p className="text-gray-700 text-center">
										Spend a day at <strong>Tarkwa Bay Beach</strong>, an ideal
										spot for relaxation and water sports.
									</p>
								</div>
							</li>
							<li>
								<div className="flex flex-col items-center gap-4">
									<Image
										src="/assets/images/Travel/national-museum-bg.jpg"
										alt="Lagos National Museum"
										width={300}
										height={200}
										className="rounded-lg w-full object-cover"
									/>
									<p className="text-gray-700 text-center">
										Discover the history of Lagos at the{" "}
										<strong>National Museum</strong>, where you can learn about
										Nigeria’s rich cultural heritage.
									</p>
								</div>
							</li>
						</div>
					</ul>
					<p className="mt-4 text-gray-700">
						For more personalized recommendations and assistance with bookings,
						feel free to reach out to our wedding planner at{" "}
						<span className="text-primary-500 hover:text-primary-700">
							<a href={`tel:${`+2348080918070`}`}>+234(0)8080918070</a>
						</span>
						.
					</p>
				</section>

				<section className="fixed bottom-4 right-4 z-20">
					<Link href="/faq">
						<Button className="w-12 h-12 text-white btn-fill font-bold py-2 px-3 rounded-full transition duration-200 flex items-center justify-center shadow-lg">
							<FiChevronRight className="text-2xl text-white" />
						</Button>
					</Link>
				</section>
			</div>
		</div>
	);
}
