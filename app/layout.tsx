// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext'; // ✨ Import

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sorang Kim Portfolio',
  description: 'Interactive Developer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider> {/* ✨ 감싸기 */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}