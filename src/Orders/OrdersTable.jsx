import { IoCalendarNumberOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { StatusDisplay } from "./StatusDisplay";
import { useTranslation } from "react-i18next";
export const OrdersTable = ({
  filteredOrders,
  isLoading,
  error,
  searchQuery,
  debouncedSearchQuery,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        {t("error")}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-gray-400 text-center mt-10">
        <ClipLoader color="#E0A75E" />
      </div>
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="text-gray-400 text-center mt-10">
        {debouncedSearchQuery
          ? t("noMatchResults")
          : t("noMatchResults")}
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
      <table className="bg-white min-w-full table">
        <thead>
          <tr>
            <th className="px-3 py-3  border-b text-left cursor-pointer">
              <p className="flex items-center gap-3">
                <input type="checkbox" className="form-checkbox h-4 w-4" />
                {t("order")}
              </p>
            </th>
            <th className="px-3 py-3 text-left rtl:text-right border-l rtl:border-r">{t("date")}</th>
            <th className="px-3 py-3 text-left rtl:text-right border-l">{t("price")}</th>
            <th className="px-3 py-3 text-left rtl:text-right border-l">{t("items")}</th>
            <th className="px-3 py-3 text-left rtl:text-right border-l">{t("payment")}</th>
            <th className="px-3 py-3 text-left rtl:text-right border-l">{t("status")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() =>
                navigate(`/Dashboard/RecivedOrders/${order.id}`, {
                  state: {
                    status: order.status,
                    status_name: order.status_name,
                  },
                })
              }
            >
              <td className="px-3 py-3 border-t border-r  text-gray-600 text-14">
                <p className="flex items-center gap-3">
                  <input type="checkbox" className="form-checkbox h-4 w-4" />
                  {order.order_number}
                </p>
              </td>
              <td className="flex items-center gap-2 px-3 py-3 border-t border-r rtl:border-r text-gray-600 text-13">
                <IoCalendarNumberOutline color="#69ABB5" size={15} />
                {order.date}
              </td>
              <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                {order.total} $
              </td>
              <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                {order.items_count}
              </td>
              <td className="px-3 py-3 border-t border-r w-36">
                <StatusDisplay
                  statusName={order.payment_status}
                  status={order.payment_status === "paid" ? 2 : 1}
                />
              </td>
              <td className="px-3 py-3 rtl:border-r  border-t w-36 text-center">
                <StatusDisplay
                  status={order.status}
                  statusName={order.status_name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
