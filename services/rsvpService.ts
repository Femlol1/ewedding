import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { RSVP, RSVPStats } from "../types/rsvp";

const COLLECTION_NAME = "rsvps";

export const rsvpService = {
	// Create a new RSVP
	async createRSVP(rsvp: Omit<RSVP, "id">): Promise<string> {
		try {
			const docRef = await addDoc(collection(db, COLLECTION_NAME), {
				...rsvp,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			return docRef.id;
		} catch (error) {
			console.error("Error creating RSVP:", error);
			throw error;
		}
	},

	// Get all RSVPs
	async getAllRSVPs(): Promise<RSVP[]> {
		try {
			const q = query(
				collection(db, COLLECTION_NAME),
				orderBy("createdAt", "desc")
			);
			const querySnapshot = await getDocs(q);
			return querySnapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					...data,
					createdAt: data.createdAt?.toDate?.() || new Date(),
					updatedAt: data.updatedAt?.toDate?.() || new Date(),
					confirmedAt: data.confirmedAt?.toDate
						? data.confirmedAt.toDate()
						: undefined,
				} as RSVP;
			});
		} catch (error) {
			console.error("Error fetching RSVPs:", error);
			throw error;
		}
	},

	// Get RSVP by ID
	async getRSVPById(id: string): Promise<RSVP | null> {
		try {
			const docRef = doc(db, COLLECTION_NAME, id);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const data = docSnap.data();
				return {
					id: docSnap.id,
					...data,
					createdAt: data.createdAt?.toDate?.() || new Date(),
					updatedAt: data.updatedAt?.toDate?.() || new Date(),
					confirmedAt: data.confirmedAt?.toDate
						? data.confirmedAt.toDate()
						: undefined,
				} as RSVP;
			}
			return null;
		} catch (error) {
			console.error("Error fetching RSVP:", error);
			throw error;
		}
	},

	// Update RSVP
	async updateRSVP(id: string, updates: Partial<RSVP>): Promise<void> {
		try {
			const docRef = doc(db, COLLECTION_NAME, id);
			await updateDoc(docRef, {
				...updates,
				updatedAt: new Date(),
			});
		} catch (error) {
			console.error("Error updating RSVP:", error);
			throw error;
		}
	},

	// Delete RSVP
	async deleteRSVP(id: string): Promise<void> {
		try {
			const docRef = doc(db, COLLECTION_NAME, id);
			await deleteDoc(docRef);
		} catch (error) {
			console.error("Error deleting RSVP:", error);
			throw error;
		}
	},

	// Get RSVP stats
	async getRSVPStats(): Promise<RSVPStats> {
		try {
			const rsvps = await this.getAllRSVPs();

			const stats: RSVPStats = {
				totalInvited: rsvps.length,
				totalResponded: rsvps.filter((r) => r.responded).length,
				attending: rsvps.filter((r) => r.attendance === "attending").length,
				notAttending: rsvps.filter((r) => r.attendance === "not-attending")
					.length,
				maybe: rsvps.filter((r) => r.attendance === "maybe").length,
				ceremonyOnly: rsvps.filter((r) => r.eventType === "ceremony").length,
				receptionOnly: rsvps.filter((r) => r.eventType === "reception").length,
				both: rsvps.filter((r) => r.eventType === "both").length,
				totalGuestCount: rsvps.reduce(
					(sum, rsvp) => sum + rsvp.numberOfGuests,
					0
				),
			};

			return stats;
		} catch (error) {
			console.error("Error calculating RSVP stats:", error);
			throw error;
		}
	},

	// Get RSVPs by attendance status
	async getRSVPsByAttendance(
		attendance: "attending" | "not-attending" | "maybe"
	): Promise<RSVP[]> {
		try {
			const q = query(
				collection(db, COLLECTION_NAME),
				where("attendance", "==", attendance),
				orderBy("createdAt", "desc")
			);
			const querySnapshot = await getDocs(q);
			return querySnapshot.docs.map((doc) => {
				const data = doc.data();
				return {
					id: doc.id,
					...data,
					createdAt: data.createdAt?.toDate?.() || new Date(),
					updatedAt: data.updatedAt?.toDate?.() || new Date(),
					confirmedAt: data.confirmedAt?.toDate
						? data.confirmedAt.toDate()
						: undefined,
				} as RSVP;
			});
		} catch (error) {
			console.error("Error fetching RSVPs by attendance:", error);
			throw error;
		}
	},
};
