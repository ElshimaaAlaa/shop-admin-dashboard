import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaCheckCircle } from "react-icons/fa";
import CancelOrder from "./CancelOrder";
import { useParams } from "react-router-dom";
import axios from "axios";
import PhoneNum from "../Svgs/PhoneNum";
import EmailAddress from "../Svgs/EmailAddress";
import Acc from "../Svgs/Acc";
function OrderDetails() {
  const [orderDetail, setOrderDetails] = useState([]);
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
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
          console.log(response.data.data.status);
          console.log(response.data.data.id);
          localStorage.setItem("OrderId", response.data.data.id);
          localStorage.setItem("Order Status", response.data.data.status);
          setIsLoading(false);
        } else {
          console.error("API call failed: ", error.message);
        }
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error.message);
      }
    };
    fetchOrderDetails();
  }, [error.message, live_shop_domain, orderId, role]);
  const icons = [
    {
      icon: <PhoneNum />,
    },
    {
      icon: <EmailAddress />,
    },
    {
      icon: <Acc />,
    },
  ];
  return (
    <div className="bg-gray-100 min-h-[150vh] mx-10 pt-5">
      <Helmet>
        <title>Orders Details | VERTEX</title>
      </Helmet>
      <div className=" bg-white mb-3 p-4 rounded-md flex justify-between items-center">
        <h1 className="font-bold text-17">Order Details</h1>
        <CancelOrder
          orderId={orderDetail.id}
          orderStatus={orderDetail.status}
        />
      </div>
      <div className="flex gap-5">
        <section className="border-1 border-gray-200 rounded-md p-4 bg-white w-full">
          <div className="flex justify-between">
            <h2 className="font-bold text-17">
              Order ID :
              <span className="text-14">{orderDetail.order_number}</span>
            </h2>
            <p
              className={`px-2 py-2 rounded-md text-13 ${
                orderDetail.status_name === "Preparing"
                  ? "bg-customOrange-mediumOrange text-primary"
                  : orderDetail.status_name === "Refunded"
                  ? "bg-red-50 text-red-600"
                  : ""
              }`}
            >
              {orderDetail.status_name}
            </p>
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
              <span className="text-gray-400 text-10">
                {statusItem.date || "Not available"}
              </span>
            </div>
          ))}
        </section>
        <img src="/assets/svgs/map.svg" alt="map" className="w-250" />
      </div>
      <section className="flex gap-3 mt-3">
        <div className="border-1 border-gray-200 rounded-md p-4 bg-white w-full">
          <h2 className="font-bold text-15">Order Details </h2>
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
        </div>
        <section className="border-1 border-gray-200 rounded-md p-4 bg-white w-310">
          <h2 className="font-bold text-15">Shipping Address</h2>
          <p className="text-11 mt-2">
            {orderDetail.shipping_address || "Not Available"}
          </p>
        </section>
      </section>
      <div className="flex gap-3 mt-3">
        <section className="border-1 border-gray-200 rounded-md p-4 bg-white w-full">
          <h2 className="font-bold text-15">List Items </h2>
          <table className="table mt-4">
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
                  <td className="px-3 py-3 w-180 border-t border-r text-13">
                    ${item.product.price?.toFixed(2)}
                  </td>
                  <td className="px-3 py-3 w-180 border-t border-r text-13">
                    {item.quantity}
                  </td>
                  <td className="px-3 py-3 w-180 border-t border-r text-13">
                    {item.colors?.map((color) => (
                      <div
                        key={color.id}
                        className="w-8 h-8 rounded-full -ms-4"
                        style={{ backgroundColor: color.code }}
                      />
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <section className="bg-gray-100 rounded-md px-3 py-5 mt-4 flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <p className="text-15">Subtotal</p>
              <p className="text-gray-400 text-15">{orderDetail.sub_total}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-15">Shipping</p>
              <p className="text-gray-400 text-15">{orderDetail.shipping}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-15">Total</p>
              <p className="text-gray-400 text-15">{orderDetail.total}</p>
            </div>
          </section>
        </section>
        <section className="border-1 border-gray-200 rounded-md p-4 bg-white w-310">
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
      </div>
      <div className="flex gap-3 items-center mt-3">
        <section className="border-1 border-gray-200 rounded-md p-4 bg-white w-full">
          <h2 className="font-bold text-15">Transactions </h2>
        </section>
        <section className="border-1 border-gray-200 rounded-md p-4 bg-white w-310">
          <h2 className="font-bold text-15">Balance</h2>
        </section>
      </div>
    </div>
  );
}
export default OrderDetails;
