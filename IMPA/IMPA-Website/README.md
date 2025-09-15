# IMPA Egypt Website - Admin System

This is the official website for IMPA (الهيئة العامة لتنفيذ المشروعات الصناعية والتعدينية) - The Industrial Maritime Port Authority of Egypt, featuring an integrated admin system for managing news and projects.

## About IMPA Egypt

IMPA is the leading authority responsible for executing industrial and mining projects across Egypt. Our mission is to drive economic growth and industrial development through strategic project management and infrastructure development.

## Features

### User Features (View-Only)
- **Home Page**: Welcome to IMPA Egypt with featured projects and company overview
- **About Page**: Information about IMPA Egypt's mission, vision, and achievements
- **Projects Page**: **View only** - Browse all IMPA projects with photos, descriptions, and progress
- **News Page**: **View only** - Read latest IMPA news and updates
- **Responsive Design**: Works on all devices
- **Search & Filter**: Users can search and filter projects by status and type

### Admin Features (Management)
- **Secure Login**: Admin access with credentials
- **News Management**: Add, edit, and delete news articles
- **Project Management**: Add, edit, and delete projects with photo uploads
- **Real-time Updates**: Changes appear immediately on user pages

## Important: User vs Admin Separation

- **User Pages (Home, News & Projects)**: **READ-ONLY** - Users can only view content
- **Admin Dashboard**: **FULL ACCESS** - Add, edit, delete, and manage all content
- **No User Editing**: Users cannot add, edit, or delete any content

## Admin Access

### Login Credentials
- **Username**: `user2025`
- **Password**: `1234`

### How to Access Admin
1. Click the "Admin Login" button in the top navigation
2. Enter the credentials above
3. You'll be redirected to the admin dashboard

## Admin Dashboard

### News Management
- **Add News**: Create new news articles with title, content, and date
- **Edit News**: Modify existing news articles
- **Delete News**: Remove news articles
- **Auto-publish**: All news is automatically published to the user pages

### Project Management
- **Add Projects**: Create new projects with:
  - Project name and description
  - Status and type selection
  - Progress percentage
  - **Photo upload** (supports all image formats)
- **Edit Projects**: Modify existing project details and photos
- **Delete Projects**: Remove projects from the system

### Photo Upload
- Supported formats: JPG, PNG, GIF, WebP
- Photos are stored as base64 data in localStorage
- Photos appear on both admin dashboard and user project pages
- Responsive image display with hover effects

## User Experience

### What Users Can Do
- ✅ View all published news articles
- ✅ Browse all projects with photos and details
- ✅ Search and filter projects
- ✅ Read project progress and status
- ✅ Share news and projects
- ✅ Subscribe to newsletter
- ✅ Learn about IMPA Egypt's mission and achievements

### What Users Cannot Do
- ❌ Add news or projects
- ❌ Edit any content
- ❌ Delete any content
- ❌ Upload photos
- ❌ Access admin features

## Technical Details

### Data Storage
- Uses localStorage for data persistence
- Data is shared between admin and user views
- Automatic data synchronization
- Admin changes immediately reflect on user pages

### File Structure
```
src/
├── components/          # React components
├── pages/              # Page components
├── services/           # Data management
│   └── dataService.js  # Central data service
└── assets/styles/      # CSS styles
```

### Key Components
- **Login.jsx**: Admin authentication
- **Dashboard.jsx**: Admin management interface
- **News.jsx**: **User news display (view-only)**
- **Projects.jsx**: **User project display (view-only)**
- **Home.jsx**: **IMPA Egypt welcome page**
- **About.jsx**: **IMPA Egypt company information**
- **dataService.js**: Data management and storage

## Getting Started

1. **Install Dependencies**
   ```bash
   cd impa-frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Website**
   - Open your browser to the local development URL
   - Navigate to any page
   - Click "Admin Login" to access admin features

## Usage Workflow

### For Users
1. Navigate to Home, News, or Projects pages
2. Browse content (read-only)
3. Use search and filters to find specific content
4. Share interesting content
5. Learn about IMPA Egypt's projects and achievements

### For Admins
1. Login as admin
2. Go to News Management tab
3. Click "Add New News"
4. Fill in title, content, and date
5. Click Save
6. News appears immediately on user News page

### Adding Projects (Admin Only)
1. Login as admin
2. Go to Projects Management tab
3. Click "Add New Project"
4. Fill in project details
5. **Upload a photo** (optional but recommended)
6. Set progress percentage
7. Click Save
8. Project appears immediately on user Projects page

## Security Notes

- Admin credentials are hardcoded for demonstration
- In production, implement proper authentication
- Consider adding user roles and permissions
- Implement proper data validation and sanitization
- **User pages have no admin access or editing capabilities**

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Future Enhancements

- Backend API integration
- Database storage
- User authentication system
- Advanced photo management
- Analytics dashboard
- Export functionality
- Arabic-only interface
- User comments and ratings (view-only)
- Project timeline and milestones
- Interactive project maps

## Support

For technical support or questions about the admin system, contact the development team.

---

**Developed by**: Pakinam Khaled & Nouran Mostafa - Software Engineers  
**Organization**: IMPA Egypt (الهيئة العامة لتنفيذ المشروعات الصناعية والتعدينية)  
**Version**: 1.0.0 