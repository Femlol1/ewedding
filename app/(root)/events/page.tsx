// pages/events.js
"use client"
import DressCodeModal from '@/components/shared/DressCodeModal';
import EventDetails from '@/components/shared/EventDetails';
import { events } from '@/constants';
import { useState } from 'react';



export default function Events() {
  const [showDressCode, setShowDressCode] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="">
      {events.map((event, index) => (
        <EventDetails
          key={index}
          time={event.time}
          title={event.title}
          location={event.location}
          icon={event.icon}
          heading={event.heading}
          description={event.description}
          gmap={event.gmap}
          setShowDressCode={setShowDressCode}
        />
      ))}
      </div>
      <div className="">
      {showDressCode && (
        <DressCodeModal onClose={() => setShowDressCode(false)} />
      )}
      </div>
    </div>
  );
}

