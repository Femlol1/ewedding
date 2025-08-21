import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = params;
		if (!id) {
			return NextResponse.json(
				{ error: "Table Group ID is required" },
				{ status: 400 }
			);
		}

		const groupRef = doc(db, "tableGroups", id);
		const groupSnap = await getDoc(groupRef);

		if (!groupSnap.exists()) {
			return NextResponse.json(
				{ error: "Table Group not found" },
				{ status: 404 }
			);
		}

		const tableGroup = { id: groupSnap.id, ...groupSnap.data() };

		return NextResponse.json(tableGroup, { status: 200 });
	} catch (error) {
		console.error("Error fetching table group:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
