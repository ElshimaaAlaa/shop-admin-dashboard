import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { notificationService } from "../ApiServices/Notificaitions";

function Notifications() {
  const { t, i18n } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const isRTL = i18n.language === "ar";
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationsData = await notificationService({
          language: i18n.language,
        });
        setNotifications(notificationsData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [i18n.language]);

  return (
    <div className={`h-[89vh] py-5 px-20 bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}>
      <h1 className="font-bold text-lg">{t("allNotifications")}</h1>
      {notifications.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-17">
          {t("noNotifications")}
        </p>
      ) : (
        <ul className={`flex flex-col gap-3 mt-5 ${isRTL ? "rtl" : "ltr"}`}>
          {notifications.map((item) => (
            <li
              key={item.id}
              className="border-l-4 border-l-primary  p-3 bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <h3 className="font-bold">{item.title}</h3>
                <span>{item.data.order_number}</span>
              </div>

              <p className="text-gray-500 mt-3">{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Notifications;