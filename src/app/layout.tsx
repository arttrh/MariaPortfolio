import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter é a única família do sistema — igual ao app de referência (Type.kt),
// que usa Inter de W400 a W800 tanto para display quanto para corpo.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteTitle = "Maria Eduarda — Contadora";
const siteDescription =
  "Maria Eduarda, contadora. Precisão, clareza e confiança em contabilidade.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
