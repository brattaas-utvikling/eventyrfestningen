import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
// import Calendar from "./components/Calendar";
import { About } from "./pages/About";
import { Sponsors } from "./pages/Sponsors";

import { AboutShow } from "./pages/AboutShow";
import { Archive } from "./pages/Archive";
import { NewsList, NewsPost } from "./pages/News";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/layout/SrollToTop";


export default function App() {
  return (
      <BrowserRouter>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/forestilling" element={<AboutShow />} />
            <Route path="/nyheter" element={<NewsList />} />
            <Route path="/nyheter/:slug" element={<NewsPost />} />
            <Route path="/om-oss" element={<About />} />
            <Route path="/sponsorer" element={<Sponsors />} />
            <Route path="/arkiv" element={<Archive />} />
            <Route path="/kontakt" element={<Contact />} />
          </Routes>
        </Layout>
      </BrowserRouter>
  );
}
