import { useEffect, useRef, useState } from "react";
import { notificationService } from "../../ApiServices/Notificaitions";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function UserNotifications() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLanguage = i18n.language;
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationService({
          language: currentLanguage,
        });
        if (response) {
          const formattedNotifications = response.map((notification) => ({
            ...notification,
          }));
          setNotifications(formattedNotifications);
          setUnreadCount(
            formattedNotifications.filter((n) => !n.is_read).length
          );
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [currentLanguage]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadCount > 0) {
      const updatedNotifications = notifications.map((n) => ({
        ...n,
        is_read: true,
      }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${currentLanguage === "ar" ? "rtl" : "ltr"}`}>
      <button
        ref={triggerRef} 
        onClick={toggleNotifications}
        className="p-2 bg-gray-50 rounded-md border relative"
        aria-label={t("notifications")}
      >
        <IoMdNotificationsOutline size={24} color="#71717A" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div
          ref={dropdownRef} 
          className={`absolute p-5 ${
            currentLanguage === "ar" ? "left-0" : "right-0"
          } mt-2 w-80 bg-white rounded-md shadow-lg z-50 border border-gray-200`}
        >
          <div className="border-gray-200 flex items-center justify-between">
            <h3 className="font-bold">{t("notifications")}</h3>
            <button
              className="underline text-gray-400 text-14"
              onClick={() => {
                navigate("/Dashboard/Notifications");
                setShowNotifications(false);
              }}
            >
              {t("viewAll")}
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 my-4 border-b border-l-4 border-l-primary bg-gray-50 cursor-pointer ${
                    !notification.is_read ? "bg-blue-50" : ""
                  }`}
                  onClick={() => {
                    if (notification.link) {
                      navigate(notification.link);
                      setShowNotifications(false);
                    }
                  }}
                >
                  <div className="flex items-center gap-2 text-14">
                    <h4 className="font-bold">{notification.title}</h4>
                    <span>{notification.data.order_number}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {notification.body}
                  </p>
                  <p className="text-gray-400 text-12 text-right rtl:text-left mt-3 ">
                    {notification.time}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 mt-6 text-center text-15 text-gray-500">
                {t("noNotifications")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default UserNotifications;