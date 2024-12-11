import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import HeaderLayout from '../components/Header'
import ReduxProvider from '../providers/ReduxProvider';
import ReacQueryProvider from '../providers/QueryProvider';
import Footer from '../components/Footer';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Reservations of Room App",
  description: "Created by Wojciech",
};

export default function RootLayout({
  children, auth
}: Readonly<{
  children: React.ReactNode;
  auth: any;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ReacQueryProvider>
            <HeaderLayout children={auth}></HeaderLayout>
            <main className="min-h-[100vh]">
              {children}
            </main>
            <Footer />
          </ReacQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
