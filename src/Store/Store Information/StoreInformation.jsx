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

  const handleViewBanner = (bannerBase64) => {
    if (bannerBase64) {
      window.open(bannerBase64, "_blank");
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

  return (
    <div>
      <Helmet>
        <title>{t("storeInformation")}</title>
        <meta name="description" content="Edit Store Information" />
        <meta property="og:title" content="Edit Store Information" />
        <meta property="og:description" content="Edit Store Information" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://vertex-dashboard.com/Store Information"
        />
      </Helmet>
      <section>
        <h1 className="font-bold text-[18px] mb-3">{t("storeInformation")}</h1>
        <div className=" border border-gray-200 rounded-md p-5 w-full">
          <div className="flex flex-col md:flex-row items-center gap-x-96">
            <div className="text-center md:text-left">
              <h2 className="text-15 rtl:text-right text-gray-400">
                {t("name")}
              </h2>
              <p className="mt-2 text-15">{storeInformation.store_name}</p>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-15 text-gray-400 rtl:text-right">
                {t("location")}
              </h2>
              <p className="mt-2 text-15">{storeInformation.address}</p>
            </div>
          </div>
          <h2 className="text-15 mt-5 text-gray-400">{t("bio")}</h2>
          <p className="mt-2 text-15">{storeInformation.bio}</p>
          <div className="flex flex-col lg:flex-row md:flex-row items-end gap-x-[390px]">
            <div>
              <p className="text-1xl font-bold mb-3 mt-7">{t("banners")}</p>
              <div className="flex flex-wrap gap-4">
                {themeData.bannersBase64 && themeData.bannersBase64.length > 0 ? (
                  themeData.bannersBase64.map((banner, index) => (
                    <div key={index} className="relative">
                      <img
                        src={banner}
                        alt={`Banner ${index + 1}`}
                        className="w-64 h-32 object-cover rounded"
                      />
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        <div
                          className="bg-white p-1 rounded cursor-pointer"
                          onClick={() => handleViewBanner(banner)}
                        >
                          <FaRegEye color="#E0A75E" size={16} />
                        </div>
                        <div
                          className="bg-white p-1 rounded cursor-pointer"
                          onClick={() => handleDownloadBanner(banner, index)}
                        >
                          <IoDownloadOutline color="#E0A75E" size={16} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-red-500">{t("noBanners")}</p>
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