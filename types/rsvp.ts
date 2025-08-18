export interface RSVPGuest {
	name: string;
	email?: string;
	phone?: string;
	dietaryRestrictions?: string;
	plusOne?: boolean;
	plusOneName?: string;
}

export interface RSVP {
	id?: string;
	rsvpId: string;
	primaryGuest: RSVPGuest;
	attendance: "attending" | "not-attending" | "maybe";
	eventType: "ceremony" | "reception" | "both";
	numberOfGuests: number;
	guests: RSVPGuest[];
	specialRequests?: string;
	createdAt: Date;
	updatedAt: Date;
	responded: boolean;
	confirmedAt?: Date;
}

export interface RSVPStats {
	totalInvited: number;
	totalResponded: number;
	attending: number;
	notAttending: number;
	maybe: number;
	ceremonyOnly: number;
	receptionOnly: number;
	both: number;
	totalGuestCount: number;
}
