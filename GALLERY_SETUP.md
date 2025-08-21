# Gallery Setup with UploadThing

## Overview
Your gallery now uses UploadThing for image storage and management. Images are stored on UploadThing's CDN and metadata is saved in Firebase Firestore.

## Setup Instructions

### 1. Create UploadThing Account
1. Go to [uploadthing.com](https://uploadthing.com)
2. Sign up for an account
3. Create a new app
4. Get your API keys from the dashboard

### 2. Environment Variables
Add these variables to your `.env.local` file:

```env
UPLOADTHING_SECRET=your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production, set `NEXT_PUBLIC_BASE_URL` to your actual domain.

### 3. Admin Access
To access admin features (upload/delete images):

1. Go to the Gallery page (`/gallery`) or Story page (`/story`)
2. Click on the "GALLERY" title 5 times quickly
3. An admin toggle will appear
4. Check the "Admin Mode" checkbox
5. You can now upload new images and delete existing ones

### 4. Features

#### For Visitors:
- View all uploaded images in a responsive grid
- Click images to open in a carousel view
- Full-screen gallery with thumbnails

#### For Admins:
- Upload multiple images (up to 10 at once, max 4MB each)
- Delete images with confirmation
- Images are automatically saved to Firebase Firestore

### 5. Database Structure
Images are stored in Firebase Firestore under the `gallery` collection with this structure:

```javascript
{
  id: "firestore-document-id",
  url: "https://uploadthing.com/image-url",
  name: "image-name.jpg",
  size: 1234567,
  uploadedAt: 1642723200000,
  createdAt: "2024-01-01T00:00:00.000Z"
}
```

### 6. API Endpoints

- `GET /api/gallery/uploadthing` - Fetch all gallery images
- `POST /api/gallery/uploadthing` - Add image metadata to database
- `DELETE /api/gallery/uploadthing?id=<image-id>` - Remove image from database
- `POST /api/uploadthing` - UploadThing upload endpoint

### 7. Troubleshooting

**Images not loading:**
- Check your UploadThing API keys
- Ensure Firebase is properly configured
- Check browser console for errors

**Upload failing:**
- Verify file size is under 4MB
- Ensure file type is a supported image format
- Check UploadThing dashboard for quota limits

**Admin mode not appearing:**
- Ensure you clicked the "GALLERY" title exactly 5 times
- Check browser console for JavaScript errors
