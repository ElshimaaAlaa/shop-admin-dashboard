import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaCheckCircle } from "react-icons/fa";
import CancelOrder from "./CancelOrder";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import PhoneNum from "../Svgs/PhoneNum";
import EmailAddress from "../Svgs/EmailAddress";
import Acc from "../Svgs/Acc";

function OrderDetails() {
  const [orderDetail, setOrderDetails] = useState([]);
  const { orderId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const [orderStatus, setOrderStatus] = useState(location.state?.status || null);
  const [orderStatusName, setOrderStatusName] = useState(location.state?.status_name || null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios({
          url: `${API_BASE_URL}${live_shop_domain}/api/${role}/orders/${orderId}?dashboard=1`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Accept-Language": "en",
          },
        });
        if (response.status === 200) {
          setOrderDetails(response.data.data);
          if (!orderStatus) {
            setOrderStatus(response.data.data.status);
            setOrderStatusName(response.data.data.status_name);
          }
          // localStorage.setItem("OrderId", response.data.data.id);
          // localStorage.setItem("Order Statusid", response.data.data.status);
          // localStorage.setItem("Order Status", response.data.data.status_name);
          setIsLoading(false);
        }
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error.message);
      }
    };
    fetchOrderDetails();
  }, [live_shop_domain, orderId, role, orderStatus]);

  const icons = [
    { icon: <PhoneNum /> },
    { icon: <EmailAddress /> },
    { icon: <Acc /> },
  ];

  // Status display component
  const StatusDisplay = () => (
    <p
      className={`px-2 py-2 rounded-md text-13 ${
        orderStatus === 1 || orderStatus === 2
          ? "bg-customOrange-mediumOrange text-primary"
          : orderStatus === 8 || orderStatusName === "Refunded"
          ? "bg-red-50 text-red-600"
          : ""
      }`}
    >
      {orderStatusName || orderDetail.status_name}
    </p>
  );
  return (
    <div className="bg-gray-100 pb-10 mx-5 pt-5">
      <Helmet>
        <title>Orders Details | VERTEX</title>
      </Helmet>
      <section className="bg-white mb-3 p-5 rounded-md flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-12">Menu / Orders / Received Orders / view order</p>
          <h1 className="font-bold text-17 mt-3">Order Details</h1>
        </div>
        <CancelOrder
          orderId={orderDetail.id}
          orderStatus={orderDetail.status}
        />
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 space-y-2">
          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <div className="flex justify-between">
              <h2 className="font-bold text-17">
                Order ID:
                <span className="text-14">{orderDetail.order_number}</span>
              </h2>
              <StatusDisplay />
            </div>
            {orderDetail.history?.map((statusItem, index) => (
              <div
                key={index}
                className="flex items-center justify-between mt-5 first:mt-5"
              >
                <p className="text-14 flex gap-2 items-center">
                  <FaCheckCircle
                    size={20}
                    color={statusItem.active ? "#E0A75E" : "#D1D5DB"}
                  />
                  {statusItem.status_name}
                </p>
                <span className="text-gray-400 text-12">
                  {statusItem.date || "Not available"}
                </span>
              </div>
            ))}
          </section>
          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-15">Order Details</h2>
            <div className="flex gap-36 mt-4">
              <div>
                <h4 className="text-gray-400 text-15">Item No</h4>
                <p className="text-14">{orderDetail.items_count}</p>
              </div>
              <div>
                <h4 className="text-gray-400 text-15">Payment</h4>
                <p
                  className={`px-2 py-2 rounded-md text-13 mt-1 ${
                    orderDetail.payment_status === "unpaid"
                      ? "bg-gray-100 text-gray-400"
                      : orderDetail.payment_status === "paid"
                      ? "text-[#28A513] bg-[#E7F6E5]"
                      : orderDetail.payment_status === "refund"
                      ? "text-red-600 bg-red-50"
                      : ""
                  }`}
                >
                  {orderDetail.payment_status}
                </p>
              </div>
            </div>
          </section>
          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-15">List Items</h2>
            <table className="table mt-4 w-full">
              <tbody>
                {orderDetail.products?.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="px-3 py-3 w-180 border-t border-l border-r">
                      <div className="flex items-center gap-3">
                        {item.product.images?.[0]?.src && (
                          <img
                            src={item.product.images[0].src}
                            alt={item.product.name}
                            className="w-8 h-8 object-cover rounded-full"
                          />
                        )}
                        <span className="text-13">
                          {item.product.name || item.product.name_ar}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 w-[214px] border-t border-r text-13">
                      ${item.product.price?.toFixed(2)}
                    </td>
                    <td className="px-3 py-3 w-[214px] border-t border-r text-13">
                      {item.quantity}
                    </td>
                    <td className="px-5 py-3 w-[214px] border-t border-r text-13">
                      {item.product.colors?.map((color) => (
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
                <p className="text-15">Subtotal</p>
                <p className="text-gray-400 text-15">
                  $ {orderDetail.sub_total || 0}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-15">Shipping</p>
                <p className="text-gray-400 text-15">
                  $ {orderDetail.shipping || 0}
                </p>
              </div>
              <div className="flex items-center justify-between border-t-2">
                <p className="text-15 mt-5">Total</p>
                <p className="text-gray-400 text-15">
                  $ {orderDetail.total || 0}
                </p>
              </div>
            </section>
          </section>
          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-15">Transactions</h2>
            <div className="mt-2">
              <p className="text-16 mt-6">Payment</p>
              <div className="space-y-2">
                {orderDetail.transactions?.map((method, index) => (
                  <div
                    key={`transaction-${index}`}
                    className="flex justify-between"
                  >
                    <span className="text-gray-400 text-15">
                      {method.payment_method || "N/A"}
                    </span>
                    <span className="text-gray-600">
                      $ {method.amount || 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-2">
            <section className="border border-gray-200 rounded-md p-4 bg-white">
              <h2 className="font-bold text-15">Shipping Address</h2>
              <p className="text-12 mt-2">
                {orderDetail.shipping_address || "Not Available"}
              </p>
            </section>
            <section className="border border-gray-200 rounded-md p-4 bg-white">
              <h2 className="font-bold text-15 mb-4">Customer Details</h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-14 font-bold underline">
                  <span className="text-gray-500">{icons[2]?.icon}</span>
                  <span>{orderDetail.user?.name || "No name provided"}</span>
                </div>
                <div className="flex items-center gap-2 text-14 font-bold underline">
                  <span className="text-gray-500">{icons[1]?.icon}</span>
                  <span>{orderDetail.user?.email || "No email provided"}</span>
                </div>
                <div className="flex items-center gap-2 text-14 font-bold underline">
                  <span className="text-gray-500">{icons[0]?.icon}</span>
                  <span>{orderDetail.user?.phone || "No phone provided"}</span>
                </div>
              </div>
            </section>
            <section className="border border-gray-200 rounded-md p-4 bg-white">
              <h2 className="font-bold text-15 mb-3">Balance</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                <div className="flex justify-between items-center">
                  <p className="text-14">Order Total</p>
                  <p className="text-gray-400 text-14">0</p>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <p className="text-14">Return Total</p>
                  <p className="text-gray-400 text-14">0</p>
                </div>
                <hr className="border-gray-300 my-2" />
                <div className="flex justify-between items-center mt-5">
                  <p className="text-14">Paid by customer</p>
                  <p className="text-gray-400 text-14">0</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-14 mt-5">Refunded</p>
                  <p className="text-gray-400 text-14">0</p>
                </div>
                <hr className="border-gray-300 my-2" />
                <div className="mt-5 flex justify-between">
                  <div>
                    <p>Balance</p>
                    <span className="text-gray-500 text-13">
                      (customer owes you)
                    </span>
                  </div>
                  <p className="text-gray-400 text-15">0</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderDetails;