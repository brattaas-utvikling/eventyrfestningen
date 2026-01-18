// src/components/layout/Layout.tsx (CONDITIONAL PADDING)
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLocation } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  // Home-siden trenger ikke top padding (hero går til toppen)
  const isHome = location.pathname === "/";
  
  return (
    <div className="min-h-screen flex flex-col bg-navy-900">
      <Header />
      {/* Conditional padding: kun på andre sider enn home */}
      <div className={`flex-1 ${!isHome ? 'pt-[72px]' : ''}`}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

// // src/components/layout/Layout.tsx
// import { Header } from "./Header";
// import { Footer } from "./Footer";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="min-h-screen flex flex-col bg-navy-900">
//       <Header />
//       <div className="pt-[72px] flex-1">{children}</div>
//       <Footer />
//     </div>
//   );
// }
