import { NextRequest, NextResponse } from "next/server";
import { generateRSVPId, rsvpService } from "../../../services/rsvpService";
import { RSVP } from "../../../types/rsvp";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const attendance = searchParams.get("attendance");
		const stats = searchParams.get("stats");
		const download = searchParams.get("download");

		if (stats === "true") {
			const rsvpStats = await rsvpService.getRSVPStats();
			return NextResponse.json({ stats: rsvpStats });
		}

		if (download === "csv") {
			const rsvps = await rsvpService.getAllRSVPs();

			// Sort RSVPs alphabetically by surname (last name)
			const sortedRsvps = rsvps.sort((a, b) => {
				const getSurname = (name: string) => {
					const parts = name.trim().split(" ");
					return parts[parts.length - 1].toLowerCase();
				};

				const surnameA = getSurname(a.primaryGuest.name);
				const surnameB = getSurname(b.primaryGuest.name);

				return surnameA.localeCompare(surnameB);
			});

			// Create CSV content
			const csvHeaders = [
				"RSVP ID",
				"Primary Guest Name",
				"Email",
				"Phone",
				"Attendance",
				"Event Type",
				"Number of Guests",
				"Guest Names",
				"Dietary Restrictions",
				"Special Requests",
				"Created Date",
				"Confirmed Date",
			];

			const csvRows = sortedRsvps.map((rsvp) => [
				rsvp.rsvpId,
				rsvp.primaryGuest.name,
				rsvp.primaryGuest.email || "",
				rsvp.primaryGuest.phone || "",
				rsvp.attendance,
				rsvp.eventType,
				rsvp.numberOfGuests.toString(),
				rsvp.guests.map((g) => g.name).join("; "),
				rsvp.guests
					.map((g) => g.dietaryRestrictions)
					.filter(Boolean)
					.join("; "),
				rsvp.specialRequests || "",
				rsvp.createdAt ? new Date(rsvp.createdAt).toLocaleDateString() : "",
				rsvp.confirmedAt ? new Date(rsvp.confirmedAt).toLocaleDateString() : "",
			]);

			const csvContent = [
				csvHeaders.join(","),
				...csvRows.map((row) =>
					row
						.map((cell) => `"${cell.toString().replace(/"/g, '""')}"`)
						.join(",")
				),
			].join("\n");

			return new NextResponse(csvContent, {
				status: 200,
				headers: {
					"Content-Type": "text/csv",
					"Content-Disposition": 'attachment; filename="rsvps.csv"',
				},
			});
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

		// Generate a unique 8-digit alphanumeric RSVP ID
		const rsvpId = generateRSVPId();

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

export async function PATCH(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const action = searchParams.get("action");

		if (action === "migrate-ids") {
			await rsvpService.migrateRSVPIds();
			return NextResponse.json({
				success: true,
				message: "RSVP IDs migrated successfully",
			});
		}

		return NextResponse.json({ error: "Invalid action" }, { status: 400 });
	} catch (error) {
		console.error("Error in PATCH request:", error);
		return NextResponse.json(
			{ error: "Failed to process request" },
			{ status: 500 }
		);
	}
}
