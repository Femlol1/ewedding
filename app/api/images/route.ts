import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// ✅ Prevent this API from being pre-rendered at build time
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
	try {
		const imagesDirectory = path.join(
			process.cwd(),
			"public/assets/images/proposal"
		);
		const filenames = fs.readdirSync(imagesDirectory);

		const images = filenames.map((name) =>
			encodeURI(`/assets/images/proposal/${name}`)
		);

		return NextResponse.json(images);
	} catch (error) {
		console.error("Failed to read images directory:", error);
		return NextResponse.json({ error: "Failed to load images." });
	}
}
