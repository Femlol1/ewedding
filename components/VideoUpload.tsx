"use client";

import { UploadDropzone } from "../lib/uploadthing";

export default function VideoUpload() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="max-w-2xl w-full">
				<h1 className="text-3xl font-bold text-center mb-8">
					Upload Wedding Videos
				</h1>
				<div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
					<UploadDropzone
						endpoint="videoUploader"
						onClientUploadComplete={(res: any) => {
							// Do something with the response
							console.log("Files: ", res);
							alert("Upload Completed");

							// Display the URLs for you to copy
							if (res) {
								const urls = res.map((file: any) => file.url).join("\n");
								console.log("Upload URLs:", urls);
								alert(`Upload completed! URLs:\n${urls}`);
							}
						}}
						onUploadError={(error: Error) => {
							// Do something with the error.
							alert(`ERROR! ${error.message}`);
						}}
					/>
				</div>

				<div className="mt-8 p-4 bg-gray-100 rounded-lg">
					<h2 className="text-xl font-semibold mb-4">Instructions:</h2>
					<ol className="list-decimal list-inside space-y-2">
						<li>Upload your video files using the dropzone above</li>
						<li>Copy the generated URLs from the console or alert</li>
						<li>Update the Gallery component with the new URLs</li>
						<li>Delete the local video files from public/videos/</li>
					</ol>
				</div>
			</div>
		</main>
	);
}
