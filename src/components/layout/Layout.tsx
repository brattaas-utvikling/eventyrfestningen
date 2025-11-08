// src/components/layout/Layout.tsx
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-navy-900">
      <Header />
      <div className="pt-[72px] flex-1">{children}</div>
      <Footer />
    </div>
  );
}
