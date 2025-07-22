import { ClipLoader } from "react-spinners";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
export const CustomerTransactions = ({ isLoading, error, orders }) => {
  const { t } = useTranslation();
  return (
    <section className="bg-white border-gray-200 border rounded-md p-4 mt-3 w-full">
      <h3 className="font-bold text-16">{t("transactions")}</h3>
      {error ? (
        <div className="text-red-500 text-center mt-10">{t("error")}</div>
      ) : isLoading ? (
        <div className="text-gray-400 text-center mt-10">
          <ClipLoader color="#E0A75E" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center mt-10 text-14 text-gray-400">
          {t("noDataFound")}
        </p>
      ) : (
        <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
          <table className="bg-white min-w-full table">
            <thead>
              <tr>
                <th className="px-3 py-3 border-t border-b text-left rtl:text-right">
                  {t("invoiceId")}
                </th>
                <th className="px-3 py-3 text-left rtl:text-right border">{t("date")}</th>
                <th className="px-3 py-3 text-left rtl:text-right border">{t("price")}</th>
                <th className="px-3 py-3 border text-left rtl:text-right w-20">{t("pay")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-3 border-t text-gray-600 text-14 border-r w-250">
                    {order.order_number}
                  </td>
                  <td className="px-3 py-3 border-t text-gray-500 border-r text-13 w-250">
                    <p className="flex items-center gap-2">
                      <IoCalendarNumberOutline color="#69ABB5" size={15} />
                      {order.date}
                    </p>
                  </td>
                  <td className="px-3 py-3 border-t text-gray-600 border-r text-15 w-250">
                    {order.total} $
                  </td>
                  <td className="px-3 py-3 border-t text-gray-600 border-r text-15 w-250">
                    {order.payment_method || t("notProvided")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
