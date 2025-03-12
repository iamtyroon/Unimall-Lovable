
# Unimall - E-Commerce Platform

Unimall is a modern e-commerce platform built with React and TypeScript, featuring a clean UI with Tailwind CSS and shadcn-ui components.

## Features

- **Product Browsing**: Browse through various product categories
- **Product Details**: View detailed information about each product
- **Shopping Cart**: Add items to cart, modify quantities, and remove items
- **Checkout Process**: Seamless checkout experience with multiple payment options
- **M-Pesa Integration**: Support for M-Pesa mobile payment system
- **Responsive Design**: Optimized for all device sizes

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static type-checking for JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn-ui**: High-quality React components built with Radix UI and Tailwind
- **React Router**: Declarative routing for React
- **React Hook Form**: Form handling with validation
- **Zod**: TypeScript-first schema validation
- **React Query**: Data-fetching library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/unimall.git
   cd unimall
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/         # UI components
├── contexts/           # React contexts (cart, auth, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── Index.tsx       # Homepage
│   ├── Shopping.tsx    # Product listing
│   ├── ProductDetail.tsx # Product details
│   ├── Checkout.tsx    # Checkout process
│   └── OrderConfirmation.tsx # Order confirmation
└── main.tsx            # Application entry point
```

## Payment Integration

### M-Pesa Integration

The platform includes integration with M-Pesa mobile payment system, allowing customers to make payments directly from their mobile phones. The integration includes:

- Phone number validation
- Secure payment processing
- Transaction confirmation

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Vite](https://vitejs.dev/) for the fast development environment
- All open-source contributors whose libraries were used in this project
