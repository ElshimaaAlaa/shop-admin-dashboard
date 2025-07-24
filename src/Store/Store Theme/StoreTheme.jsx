import { Helmet } from "react-helmet";
import { FaRegEye } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
function StoreTheme() {
  const { t } = useTranslation();
  const themeData = JSON.parse(localStorage.getItem("storeThemeData") || "{}");

  const imageUrl = themeData.theme_image
    ? `/uploads/${encodeURIComponent(themeData.theme_image)}`
    : null;

  const handleViewImage = () => {
    if (imageUrl) {
      window.open(imageUrl, "_blank");
    }
  };
  const handleDownloadImage = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "store-theme-logo.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      <Helmet>
        <title>{t("storeTheme")}</title>
        <meta name="description" content="Edit Store Theme" />
        <meta property="og:title" content="Edit Store Theme" />
        <meta property="og:description" content="Edit Store Theme" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vertex-dashboard.com/Store Theme"
        />
      </Helmet>

      <section>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="font-bold text-[18px]">{t("storeTheme")}</h1>
        </div>

        <div className="border border-gray-200 rounded-md p-5 w-full mt-3">
          <div className="flex flex-col md:flex-row items-center gap-x-96">
            <div className="text-center md:text-left">
              <h2 className="text-15 text-gray-400">{t("primColor")}</h2>
              <div
                className="mt-2 border border-black p-3 w-16 h-8 rounded"
                style={{ backgroundColor: themeData.theme_primary_color }}
              ></div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-15 text-gray-400">{t("secColor")}</h2>
              <div
                className="mt-2 border border-black p-3 w-16 h-8 rounded"
                style={{ backgroundColor: themeData.theme_secondary_color }}
              ></div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row md:flex-row items-end gap-x-[335px]">
            <div>
              <p className="text-17 font-bold mb-3 mt-7">{t("logo")}</p>
              {imageUrl ? (
                <img src={imageUrl} alt="theme logo" className="w-52" />
              ) : (
                <p className="text-red-500">{t("noImage")}</p>
              )}
            </div>

            <div className="flex items-center gap-8 mb-3">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleViewImage}
              >
                <FaRegEye color="#E0A75E" size={20} />
                <p className="text-15">{t("view")}</p>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleDownloadImage}
              >
                <IoDownloadOutline color="#E0A75E" size={20} />
                <p className="text-15">{t("download")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default StoreTheme;