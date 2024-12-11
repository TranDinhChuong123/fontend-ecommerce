// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "react-hot-toast";
// const inter = Inter({ subsets: ["latin"] });
// import ClientSessionProvider from "@/providers/ClientSessionProvider";
// import CartProvider from "@/providers/CartProvider";
// import NavBar from "./components/nav/NavBar";
// import Footer from "./components/footer/Footer";
// import { ProfileProvider } from "@/contexts/ProfileContext";
// export const metadata: Metadata = {
//   title: "EconoMart",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>

//         <Toaster
//           position="top-center"
//           toastOptions={{
//             style: {
//               background: 'rgb(51 65 85)',
//               marginTop: "70px",
//               color: '#fff',

//             }
//           }}
//         />

//         <ClientSessionProvider>
//           <CartProvider>
//             <ProfileProvider>
//               <div className="flex flex-col min-h-screen">
//                 <main className="flex-grow">{children}</main>
//                 {/* <Footer /> */}
//               </div>
//             </ProfileProvider>

//           </CartProvider>
//         </ClientSessionProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

import { ProfileProvider } from "@/contexts/ProfileContext";
import CartProvider from "@/providers/CartProvider";
import ClientSessionProvider from "@/providers/ClientSessionProvider";
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
      <body className={`${poppins.className} ...`}> 

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
            <ProfileProvider>
              <div className="flex flex-col min-h-screen">
                <main className="flex-grow">{children}</main>
                {/* <Footer /> */}
              </div>
            </ProfileProvider>

          </CartProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
