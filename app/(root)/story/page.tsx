"use client";

import Gallery from "@/components/shared/Gallery";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

type StoryKey = "Temitope" | "Tobiloba";

export default function OurStory() {
	const [selectedStory, setSelectedStory] = useState<StoryKey | null>(null);

	const handleStorySelect = (story: StoryKey) => {
		setSelectedStory(story);
	};

	const stories: Record<StoryKey, JSX.Element> = {
		Temitope: (
			<div>
				<div className="relative">
					<Image
						src="/assets/images/OurStoryPage/OpeStoryClose.jpg" // Replace with your image path
						alt="Ope"
						width={150}
						height={150}
						className="border-4 border-primary flex-shrink-0 transition-transform duration-300 transform hover:scale-110 rounded-full"
					/>
				</div>
				<h2 className="text-2xl font-semibold text-gray-700">By Temitope</h2>
				<p>
					The first time I encountered Tobi was during the planning of a concert
					I organized for a client of mine who we were in need of a band. I
					needed to speak to various team members and Tobi was amongst the
					musicians. It was the negotiation process of his asking payment that I
					think left my name or presence known to him as he said at the time he
					was like “Who’s this Ijebu woman that’s wanting to cut my rate in
					half”
				</p>
				<p>
					we ran into one another in person during another event where I was an
					organizer and I don’t think I noticed him but I’m guessing he noticed
					me but was still shy to say hello. Not too long after he started
					messaging me more after in the DMs as I personally wasn’t looking for
					anything at the time we just became close friends and even started
					calling one another brothers and sisters.
				</p>
				<p>
					Time went by and he started asking more inquisitive questions , as his
					“sister” he started coming up that he’d like to be serious and needs a
					wife a serious one as well and he’d like them to look like me. Time
					went by again and he still asked and pushed on the same question so I
					mentioned I didn’t have friends I had sisters that were God fearing,
					aligned, go getters and are in a waiting season. So if he’s serious
					he’d have to buckle up and be ready to meet them at their level, not
					know he was secretly asking of my current stage of courtship and I was
					giving him the answers without even knowing.
				</p>
				<p>
					More time went by and he finally confessed that although he was asking
					for someone like me and I should help him find a wife he didn’t want
					names anymore he wanted me to be that person. We spoke I explained in
					depth where I was at in my season and with prayer and discernment we
					started talking and saw how clear and intentional we both were about
					the kind of love we wanted and saw we could fulfill that with the help
					of Christ in our lives and his approval of our decision to keep moving
					forward together.
				</p>
				<p>
					I can say in the years I’ve known, I’ve never experienced a chivalrous
					love like the one I share with Tobi. Tobiloba is a true testament of
					Gods promise to me. Everything I asked for in a man God gave it to me
					through Tobi. He is intentional apart every aspect and way he pours
					into me. He sharpens me in the word and our devotionals. We keep our
					faith in God, our hopes high in the most positive way and neither of
					us are perfect but we keep going and don’t give up and keep God deeply
					rooted and centered in our lives. To find your person and soulmate and
					everything around you continues to confirm Gods approval of our
					alignment is absolutely thrilling and heart warming.
				</p>
				<br />
				<Image
					src="/assets/images/OurStoryPage/OpeStoryBottom.jpg" // Replace with your image path
					alt="ope buttom picture"
					width={450}
					height={450}
					className="border-4 border-primary flex-shrink-0 transition-transform duration-300 transform hover:scale-110"
				/>
			</div>
		),
		Tobiloba: (
			<div>
				<div className=" container relative">
					<Image
						src="/assets/images/OurStoryPage/TobilobaStoryClose.jpg" // Replace with your image path
						alt="Tobiloba"
						width={150}
						height={150}
						className="border-4 border-primary flex-shrink-0 transition-transform duration-300 transform hover:scale-110 rounded-full"
					/>
				</div>
				<h2 className="text-2xl font-semibold text-gray-700">By Tobiloba</h2>
				<p>
					Our love story began at an event where she was the project manager.
					Our first interaction was on WhatsApp, not about love but about my fee
					for the job. She thought it was too high, I stood my ground, and in
					the end, I got my full payment.
				</p>
				<p>
					Months later, we met again at a gathering of believers where she was
					hosting. Her energy, confidence, and presence caught my attention, and
					we soon became close friends. She even became my stylist, making sure
					I always looked my best.
				</p>
				<p>
					Over time, our conversations grew deeper. We spoke about life,
					purpose, and faith, and I began to see her heart and her love for God,
					Noticed qualities in her that were rare, and the way she genuinely
					cared for people. I prayed about it, and over time, I felt God
					confirming that she was the one.
				</p>
				<p>
					When I finally shared my feelings, we continued to talk and pray,
					allowing God to guide us. That friendship has now grown into a love
					that is strong, joyful, and God centered. I thank him every day for
					bringing us together, and I can’t wait to spend the rest of
					my life with her.
				</p>

				<br />
				<Image
					src="/assets/images/OurStoryPage/TobilobaStoryButtom.jpg" // Replace with your image path
					alt="Tobiloba buttom picture"
					width={450}
					height={450}
					className="border-4 border-primary flex-shrink-0 transition-transform duration-300 transform hover:scale-110"
				/>
			</div>
		),
	};

	return (
		<div className="flex flex-col md:flex-col md:mt-20">
			{/* Image Section */}
			<section className="relative w-full h-64 ">
				<Image
					src="/assets/images/OurStoryPage/2S6A1507.jpg" // Replace with your image path
					alt="Welcome Image"
					fill
					style={{ objectFit: "cover" }}
					priority={true} // {false} | {true}
					quality={100}
					className="z-0"
				/>
				<div className="absolute inset-0 bg-black opacity-50 z-10"></div>
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20">
					<h3 className="text-3xl md:text-5xl font-bold mt-2">Our Story</h3>
				</div>
			</section>

			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
					{/* Temitope's Story */}

					<div className="flex items-start gap-4">
						<Image
							src="/assets/images/OurStoryPage/OpeStoryClose.jpg" // Replace with your image path
							alt="Temitope"
							width={150}
							height={150}
							className="border-4 border-primary flex-shrink-0 transition-transform duration-300 transform hover:scale-110 rounded-full"
						/>
						<div className="flex flex-col justify-between">
							<div className=" text-xl flex font-bold flex-row">
								Temitope&rsquo;s Story
							</div>

							<p className="text-gray-700 line-clamp-3">
								We first met in November 2022 at a TLC Vibe, a Christian youth
								group...
							</p>
							<Dialog>
								<DialogTrigger asChild>
									<Link
										className="mt-2 text-primary-500 hover:text-primary-700"
										href={""}
									>
										Read More
									</Link>
								</DialogTrigger>
								<DialogContent className="max-h-[80vh] overflow-y-auto bg-white">
									<DialogTitle className="DialogTitle"></DialogTitle>
									<DialogHeader>
										<DialogDescription>{stories.Temitope}</DialogDescription>
									</DialogHeader>
								</DialogContent>
							</Dialog>
						</div>
					</div>

					{/* Tobiloba's Story */}
					<div className="flex items-start gap-4">
						<Image
							src="/assets/images/OurStoryPage/TobilobaStoryClose.jpg" // Replace with your image path
							alt="Tobiloba"
							width={150}
							height={150}
							className="border-4 border-primary flex-shrink-0 transition-transform duration-300 transform hover:scale-110 rounded-full"
						/>
						<div className="flex flex-col justify-between">
							<div className=" text-xl flex font-bold flex-row">
								Tobiloba&rsquo;s Story
							</div>

							<p className="text-gray-700 line-clamp-3">
								Our love story began when we met through a mutual friend at
								Vibe, TLC&rsquo;s young adult church meeting...
							</p>
							<Dialog>
								<DialogTrigger asChild>
									<Link
										className="mt-2 text-primary-500 hover:text-primary-700"
										href={""}
									>
										Read More
									</Link>
								</DialogTrigger>

								<DialogContent className="max-h-[80vh] overflow-y-auto bg-white">
									<DialogTitle></DialogTitle>
									<DialogHeader>
										<DialogDescription>{stories.Tobiloba}</DialogDescription>
									</DialogHeader>
								</DialogContent>
							</Dialog>
						</div>
					</div>
				</div>
				{/* Proposal Video Section */}
				<section className="mt-10">
					<div className="wrapper h3-bold text-center">THE PROPOSAL</div>
					<div className="flex justify-center mt-4">
						<video
							width="800"
							controls
							className="border-4 border-primary rounded-lg shadow-lg"
						>
							<source
								src="https://3ddco28mb0.ufs.sh/f/T5kSgOemEcy7l1JYBW3Q4fAHsYzPVoEguXw9OBmS1i6rvG5a"
								type="video/mp4"
							/>
							Your browser does not support the video tag.
						</video>
					</div>
				</section>

				<section className="mt-10">
					<div className="wrapper h3-bold text-center">GALLERY</div>
					<Gallery />
				</section>

				<section className="fixed bottom-4 right-4 z-20">
					<Link href="/gifts">
						<Button className="w-12 h-12 text-white btn-fill font-bold py-2 px-3 rounded-full transition duration-200 flex items-center justify-center shadow-lg">
							<FiChevronRight className="text-2xl text-white" />
						</Button>
					</Link>
				</section>
			</div>
		</div>
	);
}
