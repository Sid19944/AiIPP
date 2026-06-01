import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/AuthProvider";
import { InterviewProvider } from "@/context/InterviewProvider";
import { ResultProvider } from "@/context/ResultProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepMasterAi",
  description: "Ai Interview placeform",
  icons: {
    icon: "/logo.png",
  },
  verification : {
    google : "79WKNOHZ9krvaHE58cYABoo2YlsnJ9maVcoptbL-ve4"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <InterviewProvider>
            <ResultProvider>
              {children}
              <Toaster reverseOrder={false} position="top-center" />
            </ResultProvider>
          </InterviewProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
