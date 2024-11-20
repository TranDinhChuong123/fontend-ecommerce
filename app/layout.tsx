import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });



import ClientSessionProvider from "@/providers/ClientSessionProvider";
import CartProvider from "@/providers/CartProvider";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
export const metadata: Metadata = {
  title: "EconoMart",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgb(51 65 85)',
              marginTop: "70px",
              color: '#fff',
      
            }
          }}
        />

        <ClientSessionProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <main className="flex-grow">{children}</main>
              {/* <Footer /> */}
            </div>
          </CartProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
