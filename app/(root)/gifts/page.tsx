// pages/gifts.js

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const Gifts = () => {
	return (
		<div className="flex flex-col md:flex-col md:mt-20">
			{/* Image Section */}
			<section className="relative w-full h-64">
				<Image
					src="/assets/images/whatsapp/222.jpeg" // Replace with your image path
					alt="Welcome Image"
					fill
					style={{ objectFit: "cover" }}
					quality={100}
					className="z-0"
				/>
				<div className="absolute inset-0 bg-black opacity-50 z-10"></div>
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
					<h3 className="text-3xl md:text-5xl font-bold mt-2">Gifts</h3>
				</div>
			</section>

			<div className="container mx-auto px-4 py-5">
				<p className=" text-lg text-center text-gray-700 leading-relaxed">
					Your presence at our wedding is the greatest gift we could ask for. If
					you would like to contribute further, a cash gift towards our
					honeymoon or Amazon wishlist for our new home would be greatly
					appreciated. Thank you for your love and support.
				</p>

				<div className="mt-10">
					<h2 className="text-2xl font-semibold text-gray-900">Bank Details</h2>
					<div className="mt-6 space-y-6">
						<div className="border border-gray-200 p-4 rounded-lg shadow-md">
							<h3 className="font-semibold flex items-center">
								<span className="inline-block mr-2">
									<Image
										src="/assets/icons/usa.png" // Replace with your image path
										alt="USA logo"
										width={20}
										height={20}
										className="pb-0.5 transition-transform duration-300 transform hover:scale-110"
									/>
								</span>
								United States
							</h3>
							<p className="text-gray-700 mt-2">
								<strong>Bank of America</strong>
								<br />
								<strong>Account name:</strong> Tobilobawanimi Oyediran <br />
								<strong>Account number:</strong> 446055799865 <br />
								<strong>For Zelle:</strong> Tobilobaoyed26@gmail.com
							</p>
						</div>
						<div className="border border-gray-200 p-4 rounded-lg shadow-md">
							<h3 className="font-semibold flex items-center">
								<span className="inline-block mr-2">
									<Image
										src="/assets/icons/united-kingdom.png" // Replace with your image path
										alt="UK logo"
										width={20}
										height={20}
										className="pb-0.5 transition-transform duration-300 transform hover:scale-110"
									/>
								</span>
								United Kingdom
							</h3>
							<p className="text-gray-700 mt-2">
								<strong>Account name:</strong> Temitope Osibemekun <br />
								<strong>Account number:</strong> 81453566
								<br />
								<strong>Sort code:</strong> 60-84-07
							</p>
						</div>
						<div className="border border-gray-200 p-4 rounded-lg shadow-md">
							<h3 className="font-semibold flex items-center">
								<span className="inline-block mr-2">
									<Image
										src="/assets/icons/nigeria.png" // Replace with your image path
										alt="Nigeria logo"
										width={20}
										height={20}
										className="pb-0.5 transition-transform duration-300 transform hover:scale-110"
									/>
								</span>
								Nigeria
							</h3>
							<p className="text-gray-700 mt-2">
								<strong>GTBank</strong>
								<br />
								<strong>Account name:</strong> OSIBEMEKUN TemitopeOLUWA
								EFUNYINKA <br />
								<strong>Account number:</strong> 0170585078
							</p>
						</div>
					</div>

					<h2 className="mt-8 text-2xl font-semibold text-gray-900">PayPal</h2>
					<p className="mt-4 text-gray-700">
						For convenience, you can also use{" "}
						<Link
							className="text-primary underline hover:text-primary-600"
							href={"https://www.paypal.me/OpeOsibemekun"}
						>
							PayPal
						</Link>{" "}
						to send your gift.
					</p>

					<h2 className="mt-8 text-2xl font-semibold text-gray-900">
						Amazon Wishlist
					</h2>
					<p className="mt-4 text-gray-700">
						You can also view our wishlist on Amazon for more personalized
						gifts:{" "}
						<Link
							className="text-primary underline hover:text-primary-600"
							href="https://www.amazon.co.uk/wedding/registry/33LO6NU0J2CXU"
							target="_blank"
						>
							Amazon Wishlist
						</Link>
					</p>
				</div>

				<section className="fixed bottom-4 right-4 z-20">
					<Link href="/guest">
						<Button className="w-12 h-12 text-white btn-fill font-bold py-2 px-3 rounded-full transition duration-200 flex items-center justify-center shadow-lg hover:bg-primary-600">
							<FiChevronRight className="text-2xl text-white" />
						</Button>
					</Link>
				</section>
			</div>
		</div>
	);
};

export default Gifts;
