import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import CancelOrder from "./CancelOrder";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import PhoneNum from "../Svgs/PhoneNum";
import EmailAddress from "../Svgs/EmailAddress";
import Acc from "../Svgs/Acc";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function OrderDetails() {
  const [orderDetail, setOrderDetails] = useState({
    products: [],
    transactions: [],
    history: [],
    user: {},
    sub_total: 0,
    shipping: 0,
    total: 0,
    balance: 0,
    refund_price: 0,
    return_price: 0,
    paid_amount: 0,
  });
  const { orderId } = useParams();
  const location = useLocation();
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const [orderStatus, setOrderStatus] = useState(
    location.state?.status || null
  );
  const [orderStatusName, setOrderStatusName] = useState(
    location.state?.status_name || null
  );
  const { t } = useTranslation();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios({
          url: `https://${live_shop_domain}/api/${role}/orders/${orderId}?dashboard=1`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Accept-Language": "en",
          },
        });
        if (response.status === 200) {
          console.log("Order details response:", response.data.data); // Debug log
          setOrderDetails((prev) => ({
            ...prev,
            ...response.data.data,
            transactions: response.data.data.transactions || [],
            products: response.data.data.products || [],
            history: response.data.data.history || [],
          }));
          if (!orderStatus) {
            setOrderStatus(response.data.data.status);
            setOrderStatusName(response.data.data.status_name);
          }
        }
      } catch (error) {
        console.error("API call failed: ", error.message);
      }
    };
    fetchOrderDetails();
  }, [live_shop_domain, orderId, role, orderStatus]);

  const icons = [
    { icon: <PhoneNum />, label: "Phone" },
    { icon: <EmailAddress />, label: "Email" },
    { icon: <Acc />, label: "Account" },
  ];

  const getOrderProgress = () => {
    const statusWeights = {
      1: 0, // Pending
      2: 25, // Processing
      3: 50, // Shipped
      4: 75, // In Transit
      5: 100, // Delivered
    };
    return statusWeights[orderStatus] || 0;
  };

  const formatCurrency = (value) => {
    const num = typeof value === "number" ? value : parseFloat(value) || 0;
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getStatusDisplayName = (statusName) => {
    switch (statusName) {
      case "Preparing":
        return t("Preparing");
      case "Refunded":
        return t("refund");
      case "Pending":
        return t("pending");
      case "Shipped":
        return t("Shipped");
      case "In Transit":
      case "In-Transit":
      case "On the way": 
        return t("inTransit");
      case "Delivered":
        return t("Delivered");
      case "Cancelled":
        return t("Cancelled");
      default:
        return statusName;
    }
  };
  return (
    <div className="bg-gray-100 pb-10 px-5 pt-5">
      <Helmet>
        <title>
          {t("orderDetail")} | {t("vertex")}
        </title>
      </Helmet>

      <section className="bg-white mb-3 p-5 rounded-md flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-13">{t("viewOrderHead")}</p>
          <h1 className="font-bold text-17 mt-2">{t("orderDetail")}</h1>
        </div>
        <CancelOrder
          orderId={orderDetail.id}
          orderStatus={orderDetail.status}
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 space-y-5">
          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-17">
                {t("orderId")}:{" "}
                <span className="text-14 ms-2">{orderDetail.order_number}</span>
              </h2>
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-12 text-gray-500 mt-5 mb-3">
                <span>{t("orderStatus")}</span>
                <span>
                  {getOrderProgress()}% {t("complete")}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${getOrderProgress()}%` }}
                ></div>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {orderDetail.history?.map((statusItem, index) => {
                // console.log("Status item:", statusItem); // Debug log
                const dateToShow = statusItem.date || t("notProvided");
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <p className="text-14 flex gap-2 items-center">
                      <FaCheckCircle
                        size={20}
                        color={statusItem.active ? "#E0A75E" : "#D1D5DB"}
                      />
                      {getStatusDisplayName(statusItem.status_name)}
                    </p>
                    <span className="text-gray-400 text-12">{dateToShow}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Rest of the component remains the same */}
          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-16">{t("orderDetail")}</h2>
            <div className="flex flex-wrap gap-8 md:gap-36 mt-4">
              <div>
                <h4 className="text-gray-400 text-14">{t("itemNo")}</h4>
                <p className="text-14 mt-3">{orderDetail.items_count || 0}</p>
              </div>
              <div>
                <h4 className="text-gray-400 text-14 mb-3">
                  {t("paymentStatus")}
                </h4>
                <span
                  className={`${
                    orderDetail.payment_status === "paid"
                      ? "text-[#28A513] bg-[#E7F6E5] rounded-md p-2 rtl:py-0 "
                      : "bg-gray-100 text-gray-400 rounded-md p-2 rtl:py-0 "
                  }`}
                >
                  {orderDetail.payment_status === "paid"
                    ? t("paid")
                    : orderDetail.payment_status === "unpaid"
                    ? t("unpaid")
                    : t("notProvided")}
                </span>
              </div>
            </div>
          </section>

          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-16">{t("listItems")}</h2>
            <table className="table mt-3 w-full">
              <tbody>
                {orderDetail.products?.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="px-3 py-3 w-180 border-t border-l border-r">
                      <div className="flex items-center gap-3">
                        {item.product?.images?.[0]?.src && (
                          <img
                            src={item.product.images[0].src}
                            alt={item.product.name}
                            className="w-8 h-8 object-cover rounded-full"
                          />
                        )}
                        <span className="text-13">
                          {item.product?.name ||
                            item.product?.name_ar ||
                            t("notProvided")}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 w-[214px] border-t border-r text-14 text-gray-500">
                      {formatCurrency(item.product?.price)}
                    </td>
                    <td className="px-3 py-3 w-[214px] border-t border-r text-14 text-gray-500">
                      {item.quantity || 0}
                    </td>
                    <td className="px-5 py-3 w-[214px] border-t border-r border-l text-14 text-gray-500">
                      {item.product?.colors?.map((color) => (
                        <div
                          key={color.id}
                          className="w-8 h-8 rounded-full -ms-3 inline-block"
                          style={{ backgroundColor: color.code }}
                          title={color.name}
                        />
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <section className="bg-gray-50 rounded-lg px-3 py-5 mt-4 flex flex-col gap-7">
              <div className="flex items-center justify-between">
                <p className="text-15 font-bold">{t("subTotal")}</p>
                <p className="text-gray-400 text-15">
                  {formatCurrency(orderDetail.sub_total)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-15 font-bold">{t("shipping")}</p>
                <p className="text-gray-400 text-15">
                  {formatCurrency(
                    orderDetail.shipping_price || orderDetail.shipping
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between border-t-2 pt-3">
                <p className="text-15 font-bold">{t("total")}</p>
                <p className="text-gray-400 text-15">
                  {formatCurrency(orderDetail.total)}
                </p>
              </div>
            </section>
          </section>

          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-16">{t("transaction")}</h2>
            {orderDetail.transactions?.length > 0 ? (
              orderDetail.transactions.map((transaction, index) => (
                <div key={index} className="mt-4 flex  justify-between">
                  <p className="text-15 flex flex-col">
                    {t("payment")}{" "}
                    <span className="text-gray-400 text-15">
                      {transaction.payment_method}
                    </span>
                  </p>
                  <p className="text-16 text-gray-600">
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-14 text-gray-500 mt-4 text-center">
                {t("noTransactions")}
              </p>
            )}
          </section>
        </div>

        <div className="space-y-5">
          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-16">{t("shippingAdd")}</h2>
            <p className="text-12 mt-2">
              {orderDetail.shipping_address || t("notProvided")}
            </p>
          </section>

          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-16 mb-4">{t("customerDetails")}</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-14">
                <span className="text-gray-500">{icons[2].icon}</span>
                <span className="underline font-bold">
                  {orderDetail.user?.name || t("notProvided")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-14">
                <span className="text-gray-500">{icons[1].icon}</span>
                <span className="underline font-bold">
                  {orderDetail.user?.email || t("notProvided")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-14">
                <span className="text-gray-500">{icons[0].icon}</span>
                <span className="font-bold underline">
                  {orderDetail.user?.phone || t("notProvided")}
                </span>
              </div>
            </div>
          </section>

          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-16 mb-3">{t("balance")}</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
              <div className="flex justify-between items-center">
                <p className="text-14">{t("orderTotal")}</p>
                <p className="text-gray-400 text-14">
                  {formatCurrency(orderDetail.total)}
                </p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-14">{t("returnTotal")}</p>
                <p className="text-gray-400 text-14">
                  {formatCurrency(orderDetail.return_price)}
                </p>
              </div>
              <hr className="border-gray-300 my-2" />
              <div className="flex justify-between items-center mt-3">
                <p className="text-14">{t("paidByCustomer")}</p>
                <p className="text-gray-400 text-14">
                  {formatCurrency(orderDetail.paid_amount)}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-14">{t("refund")}</p>
                <p className="text-gray-400 text-14">
                  {formatCurrency(orderDetail.refund_price)}
                </p>
              </div>
              <hr className="border-gray-300 my-2" />
              <div className="mt-3 flex justify-between">
                <div>
                  <p className="text-14">{t("balance")}</p>
                  <span className="text-gray-500 text-13">{t("own")}</span>
                </div>
                <p className="text-gray-400 text-15">
                  {formatCurrency(orderDetail.balance)}
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default OrderDetails;
