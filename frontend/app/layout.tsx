import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "../components/ClientProviders"; // React Query setup

export const metadata: Metadata = {
  title: "UNC Course Search",
  description: "Find courses at UNC using semantic search",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-all duration-300">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
