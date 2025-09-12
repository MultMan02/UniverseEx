import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from "@/components/BackToTop";

export const metadata = {
  title: 'UniverseEx • Mars Rover Gallery',
  description: 'View, search and filter Mars Rover photos from NASA.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}