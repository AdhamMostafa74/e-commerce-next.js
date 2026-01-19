'use client'

import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-cursive antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <Navbar />
          {children}
          <Footer />
        </QueryClientProvider>
      </body>
    </html>


  );
}
