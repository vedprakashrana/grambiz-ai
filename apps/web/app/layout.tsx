import './globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { AuthProvider } from '../context/AuthContext';

export const metadata: Metadata = {
  title: 'GramBiz AI | AI-Driven Rural Business Advisory & Financial Structuring',
  description: 'AI-powered hyper-local business feasibility and financial structuring assistant for rural micro-entrepreneurs. MoSJE Problem 2609.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
