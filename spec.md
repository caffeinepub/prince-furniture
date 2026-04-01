# Prince Furniture

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Full eCommerce-style furniture showroom website with premium branding
- Public pages: Home, About Us, Products, Contact Us
- Product catalog with 6 categories: Beds, Cupboards, Dining Sets, Coffee Tables, Chairs, Sofas
- Product cards with image, name, price, description, and WhatsApp CTA button
- WhatsApp integration: opens wa.me/919370153364 with pre-filled message
- Business info section: address, hours, Instagram, WhatsApp
- Search bar + category filter on Products page
- Featured products section on homepage
- Secure admin dashboard with login (username: Princefurniture / password: PrinceFurniture@Amt)
- Admin can: add/edit/delete products, upload images, manage categories
- Role-based access control via authorization component
- Image uploads via blob-storage component
- Smooth animations and hover effects
- Fully responsive/mobile-optimized design

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend (Motoko):
   - Product data model: id, name, category, price, description, imageUrl, featured, createdAt
   - CRUD operations for products (admin-only write, public read)
   - Category management
   - Admin authentication via authorization component
   - Image storage via blob-storage component

2. Frontend:
   - Color palette: Primary #4B2E2B, Secondary #F5F0E6, Accent #C8A165, Background #FAF9F6
   - Typography: serif for headings, sans-serif for body
   - Pages: Home (hero, featured products, about snippet, contact CTA), Products (grid with filter/search), About, Contact
   - Admin panel at /admin route (protected)
   - WhatsApp button on every product card
   - Mobile-first responsive layout
