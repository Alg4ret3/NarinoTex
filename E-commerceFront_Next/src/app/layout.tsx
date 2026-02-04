import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NariñoTex | Alta Moda & Excelencia Textil",
  description: "Líderes en la creación de textiles premium. Diseñamos con pasión desde Nariño para el mundo.",
};

import { ThemeProvider } from '@/context/ThemeContext';
import { WhatsAppButton } from '@/components/atoms/WhatsAppButton';
import { CartProvider } from '@/context/CartContext';
import { UserProvider } from '@/context/UserContext';
import { CartDrawer } from '@/components/organisms/CartDrawer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <CartProvider>
            <UserProvider>
              {children}
            </UserProvider>
            <WhatsAppButton />
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
