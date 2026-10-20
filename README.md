# Move Logistics Website (React + Vite)

## Requirements
- Node.js (you already installed Node.js)
- VS Code
- Internet connection for first install and Google Fonts

## Run locally
1. Extract this ZIP.
2. Open the extracted `move-logistics-website` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:
   ```bash
   npm install
   ```
5. Then run:
   ```bash
   npm run dev
   ```
6. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Included
- Responsive logistics landing page
- Route/weight estimate calculator (illustrative rates only)
- Demo shipment tracking (sample ID `MOVE12345`)
- Demo booking form that saves orders in this browser's localStorage
- Services, how it works, About, FAQ and contact sections
- Mobile navigation and interactive FAQ

## Important prototype limitations
This is a frontend prototype, not a production logistics platform. It does NOT send real bookings to a company, send SMS/WhatsApp/email notifications, process payments, authenticate users, or provide GPS/live vehicle tracking. Demo orders are stored only in the current browser. Before real use, add a secure backend/database, authentication, real rate logic, validated business contact details, notification integrations and appropriate privacy/security controls. Replace placeholder contact details and verify all routes/prices before publishing.
