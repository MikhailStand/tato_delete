import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NOIR — лазерное удаление татуировок',
  description: 'Безопасное лазерное удаление и осветление татуировок в премиальной студии.',
  openGraph: {
    title: 'NOIR — чистая кожа. Ваше решение.',
    description: 'Лазерное удаление и осветление татуировок в премиальной студии.',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOIR — чистая кожа. Ваше решение.',
    description: 'Лазерное удаление и осветление татуировок в премиальной студии.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
