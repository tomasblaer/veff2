import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "next-themes" ;
import "./globals.css";
import Header from "@/components/header/header";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Leikjavefurinn",
  description: "Framleitt með nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-gray-800 font-sans antialiased", fontSans.className)}>
        <ThemeProvider attribute="class">
          <Header /> 
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
