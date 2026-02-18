'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-cursive antialiased" suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Navbar />
            <div className=" pb-12">
              {children}

            </div>
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 3000,
              }}
            />
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
