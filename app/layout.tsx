import type { Metadata } from "next";
import Script from 'next/script';
import "./globals.css";
import AppShell from '@/components/AppShell';

export const metadata: Metadata = {
  title: "Hinbox",
  description: "A Gmail clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="mathjax-config" strategy="beforeInteractive">
          {`
          window.MathJax = {
            tex: {
              inlineMath: [['$', '$'], ['\\(', '\\)']],
              displayMath: [['$$', '$$'], ['\\[', '\\]']],
              packages: { '[+]': ['noerrors', 'noundefined'] },
            },
            svg: {
              fontCache: 'none',
            },
            startup: {
              typeset: false,
              ready: () => {
                window.MathJax.startup.defaultReady();
                window.dispatchEvent(new Event('MathJaxReady'));
              },
            },
          };
          `}
        </Script>
        <Script
          id="mathjax-cdn"
          strategy="afterInteractive"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
