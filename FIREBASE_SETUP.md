# Firebase Setup Guide

## Step 1: Enable Firestore API
1. Go to: https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=etwedding-19ec2
2. Click "ENABLE" button

## Step 2: Create Firestore Database
1. Go to Firebase Console: https://console.firebase.google.com/project/etwedding-19ec2
2. Click on "Firestore Database" in the left sidebar
3. Click "Create database"
4. Choose "Start in test mode" (for development)
5. Select a location (any location close to you)
6. Click "Done"

## Step 3: Set Up Security Rules (Manual Method)
1. In Firebase Console, go to Firestore Database
2. Click on "Rules" tab
3. Replace the default rules with this:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to orders collection
    match /orders/{document} {
      allow read, write: if true;
    }
    
    // Allow read/write access to rsvps collection
    match /rsvps/{document} {
      allow read, write: if true;
    }
    
    // Allow read/write access to any other collections
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

4. Click "Publish"

## Step 4: Alternative - Deploy Rules via CLI (Advanced)
If you want to use Firebase CLI:

```bash
# Login to Firebase
npx firebase login

# Initialize Firebase in your project
npx firebase init firestore

# Deploy the rules
npx firebase deploy --only firestore:rules
```

## Step 5: Test the Setup
After completing the above steps:
1. Restart your development server (Ctrl+C then npm run dev)
2. Try submitting an RSVP at http://localhost:3000/rsvp
3. Try adding items to cart and placing an order
4. Check the admin dashboard at http://localhost:3000/admin

## Security Note
The rules above (allow read, write: if true) are for development only.
For production, you should implement proper authentication and more restrictive rules.

## If you still get errors:
1. Wait 5-10 minutes after enabling the API
2. Clear browser cache
3. Restart the development server
4. Check that your .env.local file has the correct Firebase config values
