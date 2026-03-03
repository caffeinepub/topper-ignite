# Topper Ignite

## Current State

The website is a Class 12 Math YouTube channel site (Topper Ignite) with:
- Navbar with logo, nav links, Subscribe button
- Hero section
- Stats section
- Videos section (YouTube embeds)
- About section
- Footer
- No backend logic (empty actor)
- No authentication or file storage

## Requested Changes (Diff)

### Add
- **Authorization system**: Login/signup for students using Internet Identity
- **Blob storage**: Store and serve PDF files (formula sheets) uploaded by admin
- **Admin PDF upload panel**: Logged-in admin can upload PDFs (formula sheets) with a title
- **Protected PDF viewer page**: Only logged-in students can view PDFs; non-logged-in users see a "Login to view" prompt
- **Formulas section** in the website: Lists available formula PDFs; clicking opens an in-browser PDF viewer (no download button, right-click disabled, text selection disabled)
- **Navbar update**: Add "Formulas" nav link; show Login/Logout button

### Modify
- Navbar: Add "Formulas" link and Login/Logout button
- App.tsx: Add Formulas section and routing between main page and PDF viewer

### Remove
- Nothing removed

## Implementation Plan

1. Select `authorization` and `blob-storage` Caffeine components
2. Generate backend with:
   - Authorization (admin role for uploader, student role for viewer)
   - PDF metadata storage (title, blobId, uploadedAt)
   - CRUD: admin can upload PDF metadata, list all PDFs, delete PDF
   - Students can list PDFs (read-only)
3. Frontend:
   - Add Login/Logout button in Navbar using authorization hook
   - Add "Formulas" nav link/section
   - FormulasList component: shows PDF cards; if not logged in, shows login prompt
   - PDFViewer component: renders PDF in iframe/embed with right-click disabled, no download, text-select disabled, context menu blocked
   - AdminPanel component: only visible to admin; allows PDF upload (title + file) using blob-storage
   - Wire blob-storage upload to backend PDF metadata save
