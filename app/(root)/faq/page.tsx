// pages/faq.js
"use client";
import Collapsible from "@/components/shared/Collapsible";
import DressCodeModal from "@/components/shared/DressCodeModal";
import HeaderImage from "@/components/shared/HeaderImage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

export default function FAQ() {
	const [showDressCode, setShowDressCode] = useState(false);

	return (
		<div className="flex flex-col md:flex-col md:mt-20">
			{/* Header Image Section */}
			<HeaderImage
				pageId="faq"
				alt="FAQ Header Image"
				title="Frequently Asked Questions"
				fallbackSrc="/assets/images/Faq/FaqHeader.jpg"
			/>
			<div className="container mx-auto px-4 py-8">
				<section className="mb-6">
					<h2 className="text-2xl font-semibold">Contact Us</h2>
					<p>
						If you need to get in touch, please email us at
						femi@Tobilobaandope.com. We would love to hear from you!
					</p>
					<p>
						If it’s regarding the vendors, please reach out to our wedding
						planner at Kahi Company (Ehi) -{" "}
						<span className="text-primary-500 hover:text-primary-700">
							<a href={`tel:${`+2348080918070`}`}>+234(0)808 091 8070</a>
						</span>{" "}
						.{" "}
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-2xl font-semibold">General Questions</h2>
					<Collapsible label="Can I bring a plus one?">
						<p>
							No, our wedding is by invite only. No extra guests unless approved
							by us to maintain a safe, intimate celebration.
						</p>
					</Collapsible>
					<Collapsible label="Can I bring kids to the Wedding?">
						<p>
							We kindly request that you do not bring kids to the wedding to
							ensure a smooth and enjoyable experience for all guests.
						</p>
					</Collapsible>
					<Collapsible label="Who created the website?">
						<p>
							The website was created by Femi with lots of love for his sister.
							If you are interested in his work or would like a website for
							yourself, you can visit his website{" "}
							<Link
								href={"https://www.osifemi.dev"}
								className="underline text-primary-500 hover:text-primary-700"
							>
								here
							</Link>
							.
						</p>
					</Collapsible>
				</section>

				<section className="mb-6">
					<h2 className="text-2xl font-semibold">Asoebi</h2>
					<Collapsible label="Where to get wedding clothes?">
						<p>
							You can get your wedding clothes from the recommended vendors.
							Please contact our wedding planner for more details.
						</p>
					</Collapsible>
					<Collapsible label="How do I get a tailor to sew my clothes?">
						<p>
							We have a list of recommended tailors. Please contact our wedding
							planner for more details.
						</p>
					</Collapsible>
					<Collapsible label="What is the dress code?">
						<p>
							Please see dress code here{" "}
							<Button
								className="text-white btn-fill font-bold py-6 px-6 rounded-full transition duration-200"
								onClick={() => setShowDressCode(true)}
							>
								Dress Code
							</Button>
							{showDressCode && (
								<DressCodeModal onClose={() => setShowDressCode(false)} />
							)}
						</p>
					</Collapsible>
				</section>

				<section>
					<h2 className="text-2xl font-semibold">Travel Information</h2>
					<Collapsible label="How do I apply for a Nigerian visa?">
						<p>
							To apply for a Nigerian visa, visit the official{" "}
							<Link
								className="text-primary-500 hover:text-primary-700 underline"
								href={"https://immigration.gov.ng/"}
							>
								Nigerian immigration website
							</Link>{" "}
							and follow the application instructions.
						</p>
					</Collapsible>
					<Collapsible label="How do I renew my Nigerian Passport?">
						<p>
							To renew your Nigerian passport, visit the official{" "}
							<Link
								className="text-primary-500 hover:text-primary-700 underline"
								href={"https://immigration.gov.ng/"}
							>
								Nigerian immigration website
							</Link>{" "}
							and follow the renewal instructions.
						</p>
					</Collapsible>
					<Collapsible label="How can I get a Nigerian passport for the first time?">
						<p>
							To get a Nigerian passport for the first time, visit the official{" "}
							<Link
								className="text-primary-500 hover:text-primary-700 underline"
								href={"https://immigration.gov.ng/"}
							>
								Nigerian immigration website
							</Link>{" "}
							and follow the application instructions for a new passport.
						</p>
					</Collapsible>
					<Collapsible label="How can I arrange airport pick up?">
						<p>
							If you are staying at the hotel Vintanio, you can arrange pickup
							through the hotel. If not please contact our wedding planner to
							arrange airport pickup. Provide your flight details and arrival
							time for coordination.
						</p>
					</Collapsible>
				</section>
				<section className="fixed bottom-4 right-4 z-20">
					<Link href="/home">
						<Button className="w-12 h-12 text-white btn-fill font-bold py-2 px-3 rounded-full transition duration-200 flex items-center justify-center shadow-lg">
							<FiChevronRight className="text-2xl text-white" />
						</Button>
					</Link>
				</section>
			</div>
		</div>
	);
}
