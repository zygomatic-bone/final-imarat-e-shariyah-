import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Imarat-e-Shariyah Karnataka | Islamic Judicial Authority",
  description:
    "Preserving Shariah. Serving Ummah. Building Harmony. The supreme Islamic judicial authority of Karnataka, delivering Sharia-based justice and community guidance since 1971.",
  keywords: ["Imarat-e-Shariyah", "Karnataka", "Islamic", "Shariah", "Darul Qaza", "Muslim"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
