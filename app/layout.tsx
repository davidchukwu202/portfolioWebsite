import type React from 'react';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/navigation';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Chukwuebuka Chukwu — Software Engineer & Founder',
  description:
    'Backend Engineering & Clean Energy Innovation. Building scalable solutions that power real-world impact.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="bg-gray-900 text-white transition-colors duration-300">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
