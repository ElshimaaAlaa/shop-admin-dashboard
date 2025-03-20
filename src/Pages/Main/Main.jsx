import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../../Web Components/NavBar/Navbar";
import Header from "../../Web Components/Header/Header";
import AboutUs from "../../Web Components/Section/AboutUs";
import WhatToDoSection from "../../Web Components/Section/WhatToDoSection";
import FreeTrailSection from "../../Web Components/Section/Free trial Section";
import OurProcess from "../../Web Components/Section/OurProcess";
import Fags from "../../Web Components/Section/Faq";
import OpinionSection from "../../Web Components/Section/OpinionSection";
import ContactUsSection from "../../Web Components/Section/ContactUsSection";
import Footer from "../../Web Components/Footer/Footer";
function Main() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Vertex Website</title>
      </Helmet>
      {/* Main Content */}
      <Navbar />
      <Header />
      <AboutUs />
      <WhatToDoSection />
      <FreeTrailSection />
      <OurProcess />
      <Fags />
      <OpinionSection />
      <ContactUsSection />
      <Footer />
    </div>
  );
}
export default Main;