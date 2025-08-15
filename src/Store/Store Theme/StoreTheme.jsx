import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaRegEye } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function StoreTheme() {
  const { t } = useTranslation();
  const themeData = JSON.parse(localStorage.getItem("storeThemeData") || "{}");
  const [showImagePopup, setShowImagePopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowImagePopup(false);
      }
    };

    if (showImagePopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showImagePopup]);

  const handleViewImage = () => {
    if (themeData.logoBase64) {
      setShowImagePopup(true);
    }
  };

  const handleDownloadImage = () => {
    if (themeData.logoBase64) {
      const link = document.createElement("a");
      link.href = themeData.logoBase64;
      link.download = `store-logo-${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="py-4 relative">
      <Helmet>
        <title>{t("storeTheme")}</title>
        <meta name="description" content="Edit Store Theme" />
      </Helmet>

      {/* Popup للصورة */}
      {showImagePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div
            ref={popupRef}
            className=" rounded-lg max-w-4xl max-h-[90vh] relative"
          >
            <img
              src={themeData.logoBase64}
              alt="Store Logo"
              className="max-w-full max-h-[80vh] object-contain p-4"
            />
          </div>
        </div>
      )}

      <section className="bg-white rounded-lg shadow-sm">
        <h1 className="text-xl font-semibold mb-3 p-5">{t("storeTheme")}</h1>
        <div>
          <div className="flex border rounded-md p-5 gap-72 mb-8">
            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-2">
                {t("primColor")}
              </h2>
              <div
                className="w-16 h-10 rounded border border-gray-300 shadow-sm"
                style={{ backgroundColor: themeData.theme_primary_color }}
              ></div>
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-500 mb-2">
                {t("secColor")}
              </h2>
              <div
                className="w-16 h-10 rounded border border-gray-300 shadow-sm"
                style={{
                  backgroundColor: themeData.theme_secondary_color,
                }}
              ></div>
            </div>
          </div>

          <div className="border rounded-md p-5">
            <h2 className="text-lg font-semibold mb-4">{t("logo")}</h2>

            <div className="flex gap-36">
              <div>
                {themeData.logoBase64 ? (
                  <div className="relative group">
                    <img
                      src={themeData.logoBase64}
                      alt="store logo"
                      className="w-60 h-32 object-cover rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                      onClick={handleViewImage}
                    />
                  </div>
                ) : (
                  <div className="w-52 h-32 flex items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 text-sm">{t("noImage")}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleViewImage}
                  disabled={!themeData.logoBase64}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                    themeData.logoBase64
                      ? "text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FaRegEye size={16} />
                  {t("view")}
                </button>

                <button
                  onClick={handleDownloadImage}
                  disabled={!themeData.logoBase64}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                    themeData.logoBase64
                      ? "text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <IoDownloadOutline size={16} />
                  {t("download")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StoreTheme;
