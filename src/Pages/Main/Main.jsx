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
import { useTranslation } from "react-i18next";
function Main() {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("vertexWebsite")}</title>
      </Helmet>
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