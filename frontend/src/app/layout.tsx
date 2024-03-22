import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "tailwindcss/tailwind.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Desafio React",
    description: "Desafio React ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
