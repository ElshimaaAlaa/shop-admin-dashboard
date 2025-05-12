import React, { useState } from "react";
import { Helmet } from "react-helmet";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
import "./support.scss";
import InfoCard from "./InfoCard";
import SendSupport from "./SendSupport";

function Support() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white">
      <Helmet>
        <title>Support | Vertex</title>
        <meta name="description" content="Support Page" />
        <meta property="og:title" content="Support | Vertex" />
        <meta property="og:description" content="Support Page" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/logo (2).png" />
        <meta property="og:url" content="https://vertex.com/support" />
      </Helmet>

      <h1 className="font-bold text-center text-17 mt-6">
        Send us Your Problem and we are <br /> contact with you
      </h1>
      <div className="flex justify-center gap-5 mx-20">
        <InfoCard />
        <section className="bg-customOrange-mediumOrange p-5 mt-10 w-[430px] md:w-[430px] lg:w-500 rounded-md">
          <div className="flex justify-center">
            <img
              src="/assets/svgs/chats.svg"
              alt="messages"
              className="w-14 mt-4 mb-2"
            />
          </div>
          <h2 className="font-bold text-17 text-center mb-1">
            Send your problem
          </h2>
          <p className="text-gray-400 text-14 text-center mb-2">
            We are here to help you
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
          <p className="font-bold mt-5">Message sent successfully!</p>
          <button
            className="bg-primary text-white p-2 w-40 mt-4 rounded-md"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Done!
          </button>
        </div>
      </SuccessModal>
    </div>
  );
}

export default Support;