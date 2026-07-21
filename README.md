# DibiTech Frontend

DibiTech is a full-stack digital product marketplace web application where users can discover, purchase, and sell digital products.

This repository contains the frontend application built with React, Vite, and Tailwind CSS. The application is integrated with a Laravel REST API backend.

## Live Deployment

- Frontend: https://dibitech-frontend-4wir.vercel.app
- Backend API: https://dibitech-marketplace-backend-production.up.railway.app

## Demo Accounts

You can use the following demo accounts to explore different user roles:

### Admin

- Email: `testuser@gmail.com`
- Password: `password123`

### Seller

- Email: `sella@mail.com`
- Password: `password123`

### Buyer

- Email: `sari@mail.com`
- Password: `password123`

## Related Repository

- Frontend Repository: This repository
- Backend Repository: [DibiTech Backend](https://github.com/anggrainyanggi40-bot/dibitech-marketplace-backend)

## Features

### Buyer

- Register and login
- Browse digital products
- Browse products by category
- Search and filter products
- View product details
- Add and remove products from cart
- Checkout products
- Payment integration with Midtrans

### Seller

- Become a seller
- Access seller dashboard
- View own products
- Add new products
- Edit own products
- Delete own products

### Admin

- Access admin features
- View registered users
- Search and filter users
- View user details
- Delete users

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Context API
- React Icons

## Backend Integration

The frontend communicates with a Laravel REST API deployed on Railway.

Authentication is handled using Laravel Sanctum with Bearer tokens. The authentication token and user information are stored in local storage and managed through React Context API.

API requests are handled using Axios with a centralized API client.

## Project Structure

```text
src/
├── api/
├── assets/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── context/
├── hooks/
└── pages/
```

## Installation

Clone the repository:

```bash
git clone https://github.com/anggrainyanggi40-bot/dibitech-frontend.git
```

Navigate to the project directory:

```bash
cd dibitech-frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Make sure the Laravel backend is running locally before starting the frontend.

Run the development server:

```bash
npm run dev
```

## Production Environment

For production deployment, configure the following environment variable:

```env
VITE_API_URL=https://dibitech-marketplace-backend-production.up.railway.app/api
```

The frontend is currently deployed on Vercel and connected to the backend API deployed on Railway.

## Build

Create a production build with:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Current Limitations

- Google OAuth is not yet implemented.
- Product file upload is not yet implemented.
- Secure digital product download is planned for future development.

## Author

**Dwi Pangestu Anggrainy**
