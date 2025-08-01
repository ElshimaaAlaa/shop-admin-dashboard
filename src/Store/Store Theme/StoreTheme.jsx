import { Helmet } from "react-helmet";
import { FaRegEye } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function StoreTheme() {
  const { t } = useTranslation();
  const themeData = JSON.parse(localStorage.getItem("storeThemeData") || "{}");

  const handleViewImage = () => {
    if (themeData.logoBase64) {
      const newWindow = window.open("", "_blank");
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Store Logo</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f5f5f5; }
              img { max-width: 90%; max-height: 90%; object-fit: contain; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
            </style>
          </head>
          <body>
            <img src="${themeData.logoBase64}" alt="Store Logo" />
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  const handleDownloadImage = () => {
    if (themeData.logoBase64) {
      const link = document.createElement("a");
      link.href = themeData.logoBase64;
      link.download = `store-logo-${new Date().toISOString().slice(0,10)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-4">
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

      <section className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">{t("storeTheme")}</h1>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
            <div className="flex-1">
              <h2 className="text-sm font-medium text-gray-500 mb-2">{t("primColor")}</h2>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-10 rounded border border-gray-300 shadow-sm"
                  style={{ backgroundColor: themeData.theme_primary_color || "#6200ee" }}
                ></div>
                <span className="text-sm text-gray-600">
                  {themeData.theme_primary_color || "#6200ee"}
                </span>
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-sm font-medium text-gray-500 mb-2">{t("secColor")}</h2>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-10 rounded border border-gray-300 shadow-sm"
                  style={{ backgroundColor: themeData.theme_secondary_color || "#10B981" }}
                ></div>
                <span className="text-sm text-gray-600">
                  {themeData.theme_secondary_color || "#10B981"}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{t("logo")}</h2>
            
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                {themeData.logoBase64 ? (
                  <div className="relative group">
                    <img 
                      src={themeData.logoBase64} 
                      alt="store logo" 
                      className="w-52 h-auto object-contain rounded-lg border border-gray-200 p-2 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={handleViewImage}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
                    </div>
                  </div>
                ) : (
                  <div className="w-52 h-32 flex items-center justify-center bg-gray-100 rounded-lg border border-dashed border-gray-300">
                    <p className="text-gray-500 text-sm">{t("noImage")}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleViewImage}
                  disabled={!themeData.logoBase64}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${themeData.logoBase64 ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                >
                  <FaRegEye size={16} />
                  {t("view")}
                </button>
                
                <button
                  onClick={handleDownloadImage}
                  disabled={!themeData.logoBase64}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${themeData.logoBase64 ? "bg-green-50 text-green-600 hover:bg-green-100" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
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