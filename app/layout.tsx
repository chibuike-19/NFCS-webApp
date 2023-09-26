import "./globals.css";
import type { Metadata } from "next";
import { Inter, Mulish, Syne } from "next/font/google";
import { AuthService } from "./context/authService";

const inter = Inter({ subsets: ["latin"] });
const syne = Syne({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Nfcs webapp",
  description: "website for Nfcs unilag",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={syne.className}>
        <AuthService>{children}</AuthService>
      </body>
    </html>
  );
}
