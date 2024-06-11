import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Basic Todo App',
  description: 'functionality is basic, not the code!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
