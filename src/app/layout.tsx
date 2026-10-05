import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Open_Sans, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "JobTrack",
    template: "%s | JobTrack",
  },
  description:
    "Mini job portal yang mempertemukan Job Seeker dan Employer, dari melamar sampai memantau status rekrutmen.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={cn(openSans.variable, poppins.variable)}>
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
