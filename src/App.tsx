import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import { About } from "./pages/About";
import { Sponsors } from "./pages/Sponsors";
import { AboutShow } from "./pages/AboutShow";
import { Archive } from "./pages/Archive";
import { NewsList, NewsPost } from "./pages/News";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/layout/SrollToTop";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";
import { Calendar } from "./pages/Calendar";
import Privacy from "./pages/Privacy";
import { PageViewTracker } from "./components/analytics/PageViewTracker";
import { initGeoAnalytics, destroyGeoAnalytics } from "./lib/analytics";
import { useEffect } from "react";
import Avmeld from "./pages/Avmeld";
import FrivilligPage from "./pages/FrivilligPage";

export default function App() {
  useEffect(() => {
    initGeoAnalytics();
    return () => destroyGeoAnalytics();
    }, []);

  return (
      <BrowserRouter>
        <Layout>
          <ScrollToTop />
          <PageViewTracker />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/om-forestillingen" element={<AboutShow />} />
            <Route path="/program" element={<Calendar />} />
            <Route path="/nyheter" element={<NewsList />} />
            <Route path="/nyheter/:slug" element={<NewsPost />} />
            <Route path="/om-oss" element={<About />} />
            <Route path="/sponsorer" element={<Sponsors />} />
            <Route path="/frivillig" element={<FrivilligPage />} />

            <Route path="/arkiv" element={<Archive />} />
            <Route path="/arkiv/:slug" element={<AboutShow />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/personvern" element={<Privacy />} />
            <Route path="/avmeld" element={<Avmeld />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Analytics />
        </Layout>
      </BrowserRouter>
  );
}
