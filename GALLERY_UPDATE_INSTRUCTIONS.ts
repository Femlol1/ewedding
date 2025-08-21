// Updated Gallery.tsx with Uploadthing video URLs
// Replace the video URLs in your Gallery component with the ones you get from Uploadthing

// Current video entries in your galleryItems array:
/*
{
	id: 20,
	title: "Beautiful Memories Video",
	category: "videos",
	url: "/videos/1 (2).MOV", // Replace this with Uploadthing URL
	isVideo: true,
},
{
	id: 21,
	title: "Special Moments Video", 
	category: "videos",
	url: "/videos/1 (1).MOV", // Replace this with Uploadthing URL
	isVideo: true,
},
*/

// After uploading to Uploadthing, update the URLs to something like:
/*
{
	id: 20,
	title: "Beautiful Memories Video",
	category: "videos", 
	url: "https://uploadthing-prod.s3.us-west-2.amazonaws.com/your-file-key-here", // New Uploadthing URL
	isVideo: true,
},
{
	id: 21,
	title: "Special Moments Video",
	category: "videos",
	url: "https://uploadthing-prod.s3.us-west-2.amazonaws.com/your-other-file-key-here", // New Uploadthing URL
	isVideo: true,
},
*/

export default "Gallery component update instructions";
