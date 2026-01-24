'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-cursive antialiased">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          {children}
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
            }}
          />
        </QueryClientProvider>
      </body>
    </html>
  );
}
