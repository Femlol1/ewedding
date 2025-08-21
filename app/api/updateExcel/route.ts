import { storage } from '@/lib/firebaseAdmin';
import { Workbook } from 'exceljs';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

// ✅ Prevent this API from being pre-rendered at build time
export const dynamic = "force-dynamic";

const EXCEL_FILE_NAME = 'rsvps.xlsx';

export async function POST(req: NextRequest) {
  try {
    // Check if Firebase Admin is available
    if (!storage) {
      return NextResponse.json(
        { message: "Storage service is not available" },
        { status: 503 }
      );
    }

    const data = await req.json();

    const bucket = storage.bucket(process.env.FIREBASE_STORAGE_BUCKET);
    const file = bucket.file(EXCEL_FILE_NAME);

    let workbook = new Workbook();
    let sheet;

    const exists = await file.exists();
    if (exists[0]) {
      const [fileContents] = await file.download();
      await workbook.xlsx.load(fileContents);
      sheet = workbook.getWorksheet('RSVPs');
    } else {
      sheet = workbook.addWorksheet('RSVPs');
      sheet.columns = [
        { header: 'Document ID', key: 'docId' },
        // ... other columns
        { header: 'Timestamp', key: 'timestamp' },
      ];
    }

    if (!sheet) {
      throw new Error('Worksheet could not be created or accessed.');
    }

    const formattedData = {
      ...data,
      timestamp: data.timestamp.toDate().toISOString(),
    };
    sheet.addRow(formattedData);

    const buffer = await workbook.xlsx.writeBuffer();
    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    await file.save(bufferStream, {
      metadata: { contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
    });

    return NextResponse.json({ message: 'Excel updated successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error updating Excel:', error);
    return NextResponse.json({ message: 'Error updating Excel.' }, { status: 500 });
  }
}
