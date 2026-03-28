import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import WhyChooseDrSharma from "./pages/WhyChoose";
import AreasOfExpertise from "./components/Expertise";
// import About from "../pages/About";
import Services from "./pages/Services";
import Navbar from "./components/Navabar";
import Footer from "./components/Footer";
// import Facilities from "./pages/Facilities";
// import Contact from "./pages/Contact";
// import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/why-choose-DrRakeshSharma" element={<WhyChooseDrSharma />} />
        <Route path="/areas-of-expertise" element={<AreasOfExpertise />} />
        <Route path="/medical-services" element={<Services />} />
        {/* <Route path="/about-srk-hospital" element={<About />} />
        <Route path="/medical-services" element={<Services />} />
        <Route path="/hospital-facilities" element={<Facilities />} />
        <Route path="/contact-srk-hospital" element={<Contact />} /> */}

        {/* 🔥 SEO Pages (HIGH RANKING TARGETS) */}
        <Route path="/best-hospital-in-hisar" element={<Home />} />
        <Route path="/multispeciality-hospital-in-hisar" element={<Home />} />
        <Route path="/24-hours-hospital-in-hisar" element={<Home />} />
        <Route path="/emergency-hospital-in-hisar" element={<Home />} />

        {/* Services SEO */}
        {/* <Route path="/advanced-medical-services-hisar" element={<Services />} />
        <Route path="/surgical-services-hisar" element={<Services />} />
        <Route path="/diagnostic-center-hisar" element={<Facilities />} /> */}

        {/* 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
