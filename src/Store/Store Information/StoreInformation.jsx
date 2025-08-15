import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaRegEye } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function StoreInformation() {
  const { t } = useTranslation();
  const storeInformation = JSON.parse(
    localStorage.getItem("storeProfileData") || "{}"
  );
  const themeData = JSON.parse(localStorage.getItem("storeThemeData") || "{}");
  const [showBannerPopup, setShowBannerPopup] = useState(false);
  const [currentBanner, setCurrentBanner] = useState("");
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowBannerPopup(false);
      }
    };

    if (showBannerPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBannerPopup]);

  const handleViewBanner = (bannerBase64) => {
    if (bannerBase64) {
      setCurrentBanner(bannerBase64);
      setShowBannerPopup(true);
    }
  };

  const handleDownloadBanner = (bannerBase64, index) => {
    if (bannerBase64) {
      const link = document.createElement("a");
      link.href = bannerBase64;
      link.download = `store-banner-${index + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const closePopup = () => {
    setShowBannerPopup(false);
  };

  return (
    <div className="py-4 relative">
      <Helmet>
        <title>{t("storeInformation")}</title>
        <meta name="description" content="Edit Store Information" />
      </Helmet>

      {/* Popup للبانر */}
      {showBannerPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div
            ref={popupRef}
            className="rounded-lg max-w-4xl max-h-[90vh] relative"
          >
            <img
              src={currentBanner}
              alt="Store Banner"
              className="max-w-full max-h-[80vh] object-contain p-4"
            />
          </div>
        </div>
      )}

      <section>
        <h1 className="font-bold text-[18px] mb-3">{t("storeInformation")}</h1>
        <div className="border border-gray-200 rounded-md p-5 w-full">
          <div className="flex flex-col md:flex-row items-center gap-x-96">
            <div className="text-center md:text-left">
              <h2 className="text-15 rtl:text-right text-gray-400">
                {t("name")}
              </h2>
              <p className="mt-2 text-15">
                {storeInformation.store_name || t("notProvided")}
              </p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-15 text-gray-400 rtl:text-right">
                {t("location")}
              </h2>
              <p className="mt-2 text-15">
                {storeInformation.address || t("notProvided")}
              </p>
            </div>
          </div>
          <h2 className="text-15 mt-5 text-gray-400">{t("bio")}</h2>
          <p className="mt-2 text-15">
            {storeInformation.bio || t("notProvided")}
          </p>
          <div className="flex flex-col lg:flex-row md:flex-row items-end gap-x-[390px]">
            <div>
              <p className="text-1xl font-bold mb-3 mt-7">{t("banners")}</p>
              <div className="flex flex-wrap gap-4">
                {themeData.bannersBase64 &&
                themeData.bannersBase64.length > 0 ? (
                  themeData.bannersBase64.map((banner, index) => (
                    <div key={index} className="group flex gap-52 items-center">
                      <img
                        src={banner}
                        alt={`Banner ${index + 1}`}
                        className="w-64 h-32 object-cover rounded hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleViewBanner(banner)}
                      />
                      <div className="flex gap-2 group-hover:opacity-100 transition-opacity">
                        <div
                          className=" p-2 flex items-center justify-center gap-2 rounded-md text-primary cursor-pointer w-20 hover:bg-primary hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewBanner(banner);
                          }}
                        >
                          <FaRegEye size={16} />
                          <p className="text-14"> {t("view")}</p>
                        </div>
                        <div
                          className=" p-2 flex items-center justify-center gap-2 text-primary hover:text-white hover:bg-primary rounded-md cursor-pointer "
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadBanner(banner, index);
                          }}
                        >
                          <IoDownloadOutline size={16} />
                          <p className="text-14">{t("download")}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">{t("noBanners")}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StoreInformation;
