import { NextRequest, NextResponse } from "next/server";
import { rsvpService } from "../../../services/rsvpService";
import { RSVP } from "../../../types/rsvp";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const attendance = searchParams.get("attendance");
		const stats = searchParams.get("stats");

		if (stats === "true") {
			const rsvpStats = await rsvpService.getRSVPStats();
			return NextResponse.json({ stats: rsvpStats });
		}

		if (id) {
			const rsvp = await rsvpService.getRSVPById(id);
			if (!rsvp) {
				return NextResponse.json({ error: "RSVP not found" }, { status: 404 });
			}
			return NextResponse.json({ rsvp });
		}

		if (attendance) {
			const rsvps = await rsvpService.getRSVPsByAttendance(attendance as any);
			return NextResponse.json({ rsvps });
		}

		const rsvps = await rsvpService.getAllRSVPs();
		return NextResponse.json({ rsvps });
	} catch (error) {
		console.error("Error fetching RSVPs:", error);
		return NextResponse.json(
			{ error: "Failed to fetch RSVPs" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { rsvp }: { rsvp: Omit<RSVP, "id"> } = body;

		// Generate a unique RSVP ID
		const rsvpId = `RSVP-${Date.now()}-${Math.random()
			.toString(36)
			.substr(2, 9)}`;

		const newRsvp = {
			...rsvp,
			rsvpId,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const id = await rsvpService.createRSVP(newRsvp);
		return NextResponse.json({ id, rsvpId }, { status: 201 });
	} catch (error) {
		console.error("Error creating RSVP:", error);
		return NextResponse.json(
			{ error: "Failed to create RSVP" },
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest) {
	try {
		const body = await request.json();
		const { id, ...updates } = body;

		if (!id) {
			return NextResponse.json(
				{ error: "RSVP ID is required" },
				{ status: 400 }
			);
		}

		await rsvpService.updateRSVP(id, updates);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error updating RSVP:", error);
		return NextResponse.json(
			{ error: "Failed to update RSVP" },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "RSVP ID is required" },
				{ status: 400 }
			);
		}

		await rsvpService.deleteRSVP(id);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting RSVP:", error);
		return NextResponse.json(
			{ error: "Failed to delete RSVP" },
			{ status: 500 }
		);
	}
}
