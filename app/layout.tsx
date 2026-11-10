import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed } from 'next/font/google';
import './globals.css';

const headingFont = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-head' });

export const metadata: Metadata = { title: 'Lean & Athletic Tracker' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={headingFont.variable}>
      <body>{children}</body>
    </html>
  );
}
