import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaRegEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function StoreInformation() {
  const { t } = useTranslation();
  const storeInformation = JSON.parse(
    localStorage.getItem("storeProfileData") || "{}"
  );
  const themeData = JSON.parse(localStorage.getItem("storeThemeData") || "{}");
  const [showBannerPopup, setShowBannerPopup] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
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

  const handleViewBanner = (index) => {
    setCurrentBannerIndex(index);
    setShowBannerPopup(true);
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

  const goToPrev = () => {
    setCurrentBannerIndex(prev => 
      prev === 0 ? themeData.bannersBase64.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentBannerIndex(prev => 
      prev === themeData.bannersBase64.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="py-4 relative">
      <Helmet>
        <title>{t("storeInformation")}</title>
        <meta name="description" content="Edit Store Information" />
      </Helmet>

      {/* Popup Gallery */}
      {showBannerPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div
            ref={popupRef}
            className="rounded-lg max-w-4xl max-h-[90vh] relative"
          >
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
            >
              <FaChevronLeft size={24} />
            </button>
            
            <img
              src={themeData.bannersBase64[currentBannerIndex]}
              alt={`Banner ${currentBannerIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain p-4"
            />
            
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
            >
              <FaChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {themeData.bannersBase64.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`w-3 h-3 rounded-full ${currentBannerIndex === index ? 'bg-white' : 'bg-gray-500'}`}
                />
              ))}
            </div>
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
              <div className="flex flex-col gap-4">
                {themeData.bannersBase64 && themeData.bannersBase64.length > 0 ? (
                  <>
                    {/* Display only the first banner by default */}
                    <div className="group relative">
                      <img
                        src={themeData.bannersBase64[0]}
                        alt="Main Banner"
                        className="w-full h-64 object-cover rounded hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleViewBanner(0)}
                      />
                      <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div
                          className="bg-white p-2 flex items-center justify-center gap-2 rounded-md text-primary cursor-pointer hover:bg-primary hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewBanner(0);
                          }}
                        >
                          <FaRegEye size={16} />
                          <p className="text-14">{t("view")}</p>
                        </div>
                        <div
                          className="bg-white p-2 flex items-center justify-center gap-2 text-primary hover:text-white hover:bg-primary rounded-md cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadBanner(themeData.bannersBase64[0], 0);
                          }}
                        >
                          <IoDownloadOutline size={16} />
                          <p className="text-14">{t("download")}</p>
                        </div>
                      </div>
                    </div>

                    {/* Gallery thumbnails for other banners */}
                    {/* {themeData.bannersBase64.length > 1 && (
                      <div className="mt-4">
                        <h3 className="text-gray-500 mb-2">{t("moreBanners")}</h3>
                        <div className="flex flex-wrap gap-2">
                          {themeData.bannersBase64.slice(1).map((banner, index) => (
                            <div key={index + 1} className="group relative">
                              <img
                                src={banner}
                                alt={`Banner ${index + 2}`}
                                className="w-20 h-20 object-cover rounded hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => handleViewBanner(index + 1)}
                              />
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
                                <FaRegEye 
                                  className="text-white cursor-pointer" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewBanner(index + 1);
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )} */}
                  </>
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