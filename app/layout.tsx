import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BODY PARTS TATTOO — лазерное удаление татуировок',
  description: 'Лазерное удаление и осветление татуировок в студии BODY PARTS TATTOO.',
  openGraph: {
    title: 'BODY PARTS TATTOO — чистая кожа. Ваше решение.',
    description: 'Лазерное удаление и осветление татуировок в студии BODY PARTS TATTOO.',
    images: ['/og-body-parts.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BODY PARTS TATTOO — чистая кожа. Ваше решение.',
    description: 'Лазерное удаление и осветление татуировок в студии BODY PARTS TATTOO.',
    images: ['/og-body-parts.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
