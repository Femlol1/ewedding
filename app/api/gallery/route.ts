import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        // Redirect to the new UploadThing-based gallery endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/gallery/uploadthing`);
        const images = await response.json();
        
        // Transform the new format to the old format for backward compatibility
        const imageUrls = images.map((image: any) => image.url);
        
        return NextResponse.json(imageUrls);
    } catch (error) {
        console.error('Failed to fetch gallery images:', error);
        
        // Fallback to old method if new one fails
        try {
            const fs = require('fs');
            const path = require('path');
            const imagesDirectory = path.join(process.cwd(), 'public/assets/images/wedding');
            const filenames = fs.readdirSync(imagesDirectory);
            const images = filenames.map((name: string) => encodeURI(`/assets/images/wedding/${name}`));
            return NextResponse.json(images);
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            return NextResponse.json({ error: 'Failed to load images.' }, { status: 500 });
        }
    }
}