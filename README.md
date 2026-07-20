# DibiTech Frontend

DibiTech is a digital product marketplace web application where users can discover, purchase, and sell digital products.

This repository contains the frontend application built with React and Vite.

## Related Repository

- Frontend Repository: This repository
- Backend API Repository: [DibiTech Backend](https://github.com/anggrainyanggi40-bot/dibitech-marketplace-backend)

## Features

### Buyer

- Register and login
- Browse products
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
- React Icons

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

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

Run the application:

```bash
npm run dev
```

## Build

Create a production build with:

```bash
npm run build
```

## Current Limitations

- Google OAuth is not yet implemented.
- Product file upload is not yet implemented.
- Secure digital product download is planned for future development.

## Author

Dwi Pangestu Anggrainy
