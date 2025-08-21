// components/EventDetails.tsx
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button } from "../ui/button";

interface EventDetailsProps {
  time: string;
  title: string;
  location: string;
  setShowDressCode: (show: boolean) => void;
  gmap: string;
  icon: string;
  heading: string;
  description: string;
}

const EventDetails: FC<EventDetailsProps> = ({ time, title, location, setShowDressCode, gmap, icon, description, heading }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h1 className="text-xl font-semibold text-center">{title}</h1>
      <p className="text-gray-600 text-center">{location}</p>
      <p className="text-center text-gray-600">{time}</p>

      {/* Center the icon */}
      <div className="flex justify-center my-4">
        <Image src={icon} alt="Event Icon" width={50} height={50} />
      </div>

      <h2 className="text-lg font-semibold text-center mt-4">{heading}</h2>
      <p className="text-center text-gray-600 text-sm">{description}</p>

      <div className="mt-4 flex justify-center">
        <Link href={gmap}>
          <Button className="text-white btn-fill font-bold py-2 px-4 rounded-full transition duration-200">
            Maps
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventDetails;
