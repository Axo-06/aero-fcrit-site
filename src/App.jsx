import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import NewsTicker from "./components/NewsTicker.jsx";
import Hero from "./components/Hero.jsx";
import ContactForm from "./components/ContactForm.jsx";
import About from "./pages/About.jsx";
import Drones from "./pages/Drones.jsx";
import Aircraft from "./pages/Aircraft.jsx";
import Achievements from "./pages/Achievements.jsx";
import Team from "./pages/Team.jsx";
import Blog from "./pages/Blog.jsx";
import News from "./pages/News.jsx";
import Alumni from "./pages/Alumni.jsx";
import Sponsors from "./pages/Sponsors.jsx";
import FAQ from "./pages/FAQ.jsx";
import NotFound from "./pages/NotFound.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";

const TICKER_HEADLINES = [
  "Aero FCRIT is heading to Technoxian 2026",
  "Add your latest club headline here",
  "Placeholder — new sponsor announcement goes here",
  "Placeholder — upcoming competition date goes here",
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return <Hero />;
}

export default function App() {
  const [tickerOpen, setTickerOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-hangar text-ink font-body">
        <ScrollToTop />
        {tickerOpen && (
          <NewsTicker headlines={TICKER_HEADLINES} onDismiss={() => setTickerOpen(false)} />
        )}
        <Navbar stickyTop={tickerOpen ? 36 : 0} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/drones" element={<Drones />} />
            <Route path="/aircraft" element={<Aircraft />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/team" element={<Team />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/news" element={<News />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  );
}
