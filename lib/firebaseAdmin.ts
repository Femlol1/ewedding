// lib/firebaseAdmin.ts
import admin from "firebase-admin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

// Only initialize Firebase Admin if we have the required credentials
if (!admin.apps.length && process.env.FIREBASE_PROJECT_ID) {
	try {
		admin.initializeApp({
			credential: admin.credential.cert({
				projectId: process.env.FIREBASE_PROJECT_ID,
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
				privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
			}),
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		});
	} catch (error) {
		console.warn("Firebase Admin initialization failed:", error);
	}
}

// Export with null checks for build safety
const db = admin.apps.length > 0 ? getFirestore() : null;
const storage = admin.apps.length > 0 ? getStorage() : null;

export { db, storage, Timestamp };
