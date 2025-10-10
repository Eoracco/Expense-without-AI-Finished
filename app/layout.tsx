import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider, } from '@clerk/nextjs'
import Header from "@/components/header";

const roboto = Roboto({
  variable: "--font-roboto", // ✅ 使用与字体匹配的变量名
  subsets: ["latin"],
  weight: ["400", "700"], // 建议指定需要的字重
  display: "swap",
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses and create a budget",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.variable} antialiased`}>
          <Header />
          <main className="container">
            {children}
          </main>

        </body>
      </html>
    </ClerkProvider >
  );
}
