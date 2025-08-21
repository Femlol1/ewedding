# Admin Panel Setup and Usage

## Overview
Your wedding website now has a comprehensive admin panel for managing RSVPs and the gallery. The admin section provides a clean interface for all administrative tasks.

## Admin Routes

### 1. Dashboard - `/admin/dashboard`
The main admin landing page with:
- Overview statistics (RSVPs, check-ins, gallery images)
- Quick action cards for navigation
- RSVP summary with attendance rates
- Quick gallery upload widget

### 2. RSVP Management - `/admin` or `/admin/rsvps`
Complete RSVP management interface with:
- View all guest responses
- Search and filter capabilities
- Check-in/check-out functionality
- Export to CSV
- Edit guest information
- Delete RSVP entries
- Bulk operations

### 3. Gallery Management - `/admin/gallery`
Comprehensive gallery management with:
- Upload multiple images (up to 10 at once, max 4MB each)
- View images in grid or list layout
- Sort by date, name, or file size
- Bulk select and delete operations
- Image preview functionality
- Storage statistics

## Navigation
The admin panel includes a consistent navigation header with:
- **Dashboard**: Overview and quick actions
- **RSVPs**: Detailed guest management
- **Gallery**: Photo management
- **View Site**: Return to the public website

## Features

### Dashboard Features
- **Real-time Statistics**: Total RSVPs, check-ins, gallery images
- **Quick Actions**: Direct links to main admin functions
- **RSVP Summary**: Church vs reception attendance breakdown
- **Quick Upload**: Upload gallery images without leaving the dashboard

### RSVP Management Features
- **Advanced Search**: Find guests by name, email, or phone
- **Multiple Filters**: Filter by user type, staying place, event attendance
- **Check-in System**: Mark guests as checked in/out
- **Data Export**: Download guest list as CSV
- **Guest Editing**: Update guest information and preferences
- **Bulk Operations**: Delete multiple entries

### Gallery Management Features
- **Bulk Upload**: Multiple image upload with progress tracking
- **Cloud Storage**: Images stored on UploadThing CDN
- **Database Integration**: Metadata stored in Firebase Firestore
- **Flexible Views**: Switch between grid and list layouts
- **Smart Sorting**: Sort by upload date, filename, or file size
- **Bulk Actions**: Select and delete multiple images
- **Image Preview**: Full-size image preview with metadata

## Access Control
Currently, the admin panel is accessible via direct URL. For production, consider adding:
- Authentication middleware
- Role-based access control
- Session management
- Password protection

## Technical Details

### Database Structure
- **RSVPs**: Stored in Firebase Firestore `rsvps` collection
- **Gallery**: Metadata in `gallery` collection, files on UploadThing CDN

### API Endpoints
- `GET/POST/DELETE /api/gallery/uploadthing` - Gallery management
- `POST /api/uploadthing` - File upload handling
- Various RSVP endpoints for guest management

### File Storage
- **Provider**: UploadThing CDN
- **Limits**: 4MB per file, 10 files per upload
- **Formats**: All common image formats (JPEG, PNG, WebP, etc.)
- **Backup**: Metadata stored in Firestore for redundancy

## Quick Start Guide

1. **Access Admin Panel**: Navigate to `/admin/dashboard`
2. **Upload Gallery Images**: Use the dashboard widget or go to Gallery section
3. **Manage RSVPs**: View and edit guest responses in the RSVP section
4. **Monitor Stats**: Dashboard provides real-time overview of all activities

## Troubleshooting

**Can't access admin panel:**
- Ensure you're using the correct URL (`/admin/dashboard`)
- Check for JavaScript errors in browser console

**Gallery upload failing:**
- Verify UploadThing configuration in environment variables
- Check file size (must be under 4MB)
- Ensure proper image format

**RSVP data not loading:**
- Verify Firebase configuration
- Check network connectivity
- Look for console errors
