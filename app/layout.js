import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contextapi/cliniccontext";
import Navbar from "./navbar/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admya Speech & Hearing Clinic - Ayodhya | Book Appointments Online",
  description: "Admya Speech & Hearing Clinic provides specialized care for speech, hearing, and communication disorders in Ayodhya. Book appointments online with qualified therapists for personalized therapy plans.",
  keywords: "Speech therapy, Hearing assessment, Language therapy, Audiology consultation, Ayodhya, Admya Clinic",
  author: "Admya Speech & Hearing Clinic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}

        </AuthProvider>

      </body>
    </html>
  );
}
