# RetailPro – Niss Technology (React Local Demo)

A Create React App project (normal React, no Vite) with two distinct account levels:

1. **Niss Technology Super Admin** creates shop-owner workspaces and issues the owner's Login ID/password.
2. **Shop Owner** signs in to their own isolated workspace, manages shop operations, creates staff logins, and marks staff attendance.
3. **Store Staff** signs in using credentials created by their shop owner and works inside that shop's workspace.

## Super Admin demo login
- Email: `admin@retailpro.demo`
- Password: `admin123`

## Run locally
```bash
npm install
npm start
```
Open http://localhost:3000

## Demo workflow
1. Sign in with the Super Admin demo credentials.
2. Create a shop using the full owner form: shop name/category, owner name, email, login ID, password, phone and address.
3. Log out and sign in using that shop owner's Login ID (or email) and password.
4. From **My Team**, create employee accounts. Login ID/password can be entered manually or generated automatically.
5. From **Attendance**, mark Present / Absent / Half Day and review date-wise history.
6. Add products, customers, purchases and bills. Each shop has its own local browser data.

## Folder structure
- `src/pages/AdminConsole/` – Niss Technology platform admin and create shop-owner workspace form
- `src/pages/Login/` – shared login screen
- `src/pages/Team/` – shop-owner employee account creation and management
- `src/pages/Attendance/` – store attendance and reports
- `src/pages/Dashboard/`, `Inventory/`, `POS/`, `Purchases/`, `Customers/`, `Suppliers/`, `Reports/`, `Settings/` – retail modules
- `src/context/` – session and workspace state
- `src/services/storage.js` – local browser storage helper

## Important demo limitations
This is a **single-browser local demo**. Data is stored in that browser's Local Storage and is not shared across computers or browsers. Passwords are stored locally in plain text for demo purposes only. Do not use real customer data or production passwords. Before launch, connect Firebase Authentication, Firestore, and strict Firestore Security Rules so each shop can access only its own data. For production, passwords must never be stored in Firestore or Local Storage.

## Firebase integration points
Replace the demo login/create-account functions in `src/context/AppContext.js` with Firebase Authentication calls. Store workspace and shop data in Firestore under a workspace ID; validate the signed-in user's role and workspace membership in Security Rules.
