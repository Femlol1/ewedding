# Emmanuel's Wedding Website with E-commerce

A beautiful, responsive wedding website with integrated Aso Ebi shopping functionality, Firebase backend, and payment processing via Stripe and PayPal.

## Features

### 🎉 Wedding Website
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Modern Aesthetic**: Iranti-inspired color scheme (forest green, cream, champagne gold)
- **Smooth Navigation**: Animated scrolling between sections
- **Photo Gallery**: Elegant masonry layout with modal previews
- **RSVP System**: Guest response collection
- **Wedding Details**: Timeline-based ceremony and reception information

### 🛍️ Aso Ebi E-commerce
- **Product Catalog**: 6 curated traditional Nigerian wedding attire items
- **Smart Filtering**: Browse by category (Women, Men, Accessories)
- **Shopping Cart**: Add items with size, color, and quantity selection
- **Secure Checkout**: Multi-step checkout process with customer information
- **Payment Processing**: Integrated Stripe and PayPal payments
- **Order Management**: Real-time order tracking and status updates

### 🔥 Firebase Backend
- **Order Storage**: Secure order data in Firestore
- **Real-time Updates**: Live order status synchronization
- **Customer Management**: Complete customer information storage
- **Order History**: Track all orders by email or order ID

### 💳 Payment Integration
- **Stripe**: Credit/debit card processing for Nigerian Naira
- **PayPal**: International payment support
- **Secure Processing**: PCI-compliant payment handling
- **Order Correlation**: Automatic order-payment linking

## Tech Stack

- **Frontend**: Next.js 15.4.6, React 19.1.1, TypeScript
- **Styling**: Tailwind CSS 4 with custom color system
- **Backend**: Firebase Firestore, Next.js API Routes
- **Payments**: Stripe, PayPal React SDK
- **Deployment**: Vercel-ready

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd ewedding
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Enable Analytics (optional)
5. Go to Project Settings > General > Your apps
6. Add a web app and copy the config

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

### 4. Stripe Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your publishable and secret keys from the API keys section
3. For Nigerian Naira support, ensure your account supports NGN
4. Add your keys to `.env.local`

### 5. PayPal Setup

1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Create a new app
3. Get your Client ID and Client Secret
4. Add your keys to `.env.local`

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the website.

## Usage

### Customer Experience

1. **Browse Aso Ebi**: Navigate to the Aso Ebi section
2. **Add to Cart**: Click on items to select size, color, and quantity
3. **Checkout**: Fill in customer information and choose payment method
4. **Payment**: Complete payment via Stripe or PayPal
5. **Confirmation**: Receive order confirmation with tracking ID

### Admin Management

Visit `/admin` to access the order management dashboard:

- View all orders with customer details
- Filter orders by status
- Update order status (pending → confirmed → processing → shipped → delivered)
- Track revenue and order metrics

## Security Considerations

1. **API Keys**: Never expose secret keys in client-side code
2. **Firebase Rules**: Implement proper Firestore security rules
3. **Payment Processing**: Use HTTPS in production
4. **Order Validation**: Validate order data server-side

## Deployment

Deploy to Vercel by connecting your GitHub repository and adding environment variables.

## License

This project is private and proprietary. All rights reserved.
