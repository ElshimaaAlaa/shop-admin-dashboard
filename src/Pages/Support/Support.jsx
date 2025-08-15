import { useState } from "react";
import { Helmet } from "react-helmet";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import "./support.scss";
import InfoCard from "./InfoCard";
import SendSupport from "./SendSupport";
import { useTranslation } from "react-i18next";
function Support() {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="bg-white">
      <Helmet>
        <title>
          {t("support")} | {t("vertex")}
        </title>
        <meta name="description" content="Support Page" />
        <meta property="og:title" content="Support | Vertex" />
        <meta property="og:description" content="Support Page" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/logo (2).png" />
        <meta property="og:url" content="https://vertex.com/support" />
      </Helmet>

      <h1 className="font-bold text-center text-lg mt-5">{t("send")}</h1>
      <div className="flex justify-center gap-5 mx-20 rtl:flex-row-reverse">
        <InfoCard />
        <section className="bg-customOrange-mediumOrange p-5 mt-6 w-[430px] md:w-[430px] lg:w-500 rounded-md">
          <div className="flex justify-center">
            <img
              src="/assets/svgs/chats.svg"
              alt="messages"
              className="w-14 mt-2 mb-2"
            />
          </div>
          <h2 className="font-bold text-17 text-center mb-1 rtl:text-[19px]">
            {t("sendProblem")}
          </h2>
          <p className="text-gray-400 text-14 text-center mb-3">
            {t("helpYou")}
          </p>
          <SendSupport onSuccess={() => setShowModal(true)} />
        </section>
      </div>

      {/* Success Modal */}
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center justify-center w-400">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5 rtl:text-[18px]">{t("doneMessage")}</p>
          <button
            className="bg-primary font-bold text-white p-2 w-24 mt-4 rounded-md"
            type="button"
            onClick={() => setShowModal(false)}
          >
            {t("done")}
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}
export default Support;