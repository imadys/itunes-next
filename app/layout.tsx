import { PageHeader } from "@/components/page-header";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const IBMPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: "ثمانية",
  description: "مشغل بودكاست برعاية ثمانية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${IBMPlexSansArabic.className} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <PageHeader />

            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
