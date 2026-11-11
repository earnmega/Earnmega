import React from 'react';
import Script from 'next/script';

export const metadata = {
  title: 'EarnMega — Executive Affiliate & Creator Command Centre',
  description: 'Global Digital Product Marketplace & Affiliate Ecosystem by Moses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body { font-family: 'Inter', sans-serif; background-color: #060911; color: #ffffff; margin: 0; }
          .font-mono { font-family: 'JetBrains Mono', monospace; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </head>
      <body className="bg-[#060911] text-white antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
