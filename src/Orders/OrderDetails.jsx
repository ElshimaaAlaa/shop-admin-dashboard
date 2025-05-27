import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
// import { FaCheckCircle } from "react-icons/fa";
import CancelOrder from "./CancelOrder";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import PhoneNum from "../Svgs/PhoneNum";
import EmailAddress from "../Svgs/EmailAddress";
import Acc from "../Svgs/Acc";
import { StatusDisplay } from "./StatusDisplay";

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
    paid_amount: 0
  });
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
          setOrderDetails(prev => ({
            ...prev,
            ...response.data.data,
            transactions: response.data.data.transactions || [],
            products: response.data.data.products || [],
            history: response.data.data.history || []
          }));
          if (!orderStatus) {
            setOrderStatus(response.data.data.status);
            setOrderStatusName(response.data.data.status_name);
          }
        }
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error.message);
      } finally {
        setIsLoading(false);
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
      1: 0,  // Pending
      2: 25, // Processing
      3: 50, // Shipped
      4: 75, // In Transit
      5: 100 // Delivered
    };
    return statusWeights[orderStatus] || 0;
  };

  const formatCurrency = (value) => {
    const num = typeof value === 'number' ? value : parseFloat(value) || 0;
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="bg-gray-100 pb-10 mx-5 pt-5">
      <Helmet>
        <title>Orders Details | VERTEX</title>
      </Helmet>
      
      <section className="bg-white mb-3 p-5 rounded-md flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-13">Menu / Orders / Received Orders / view order</p>
          <h1 className="font-bold text-17 mt-2">Order Details</h1>
        </div>
        <CancelOrder orderId={orderDetail.id} orderStatus={orderDetail.status} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 space-y-5">
          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-17">
                Order ID: <span className="text-14 ms-2">{orderDetail.order_number}</span>
              </h2>
              <StatusDisplay status={orderStatus} statusName={orderStatusName || orderDetail.status_name} />
            </div>
            {/* Order Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-12 text-gray-500 mt-5 mb-3">
                <span>Order Status</span>
                <span>{getOrderProgress()}% Complete</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${getOrderProgress()}%` }}
                ></div>
              </div>
            </div>
            {/* Status Timeline */}
            {/* <div className="space-y-4">
              {orderDetail.history?.map((statusItem, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle 
                      size={20} 
                      color={statusItem.active ? "#E0A75E" : "#D1D5DB"} 
                    />
                    <p className="text-14">{statusItem.status_name}</p>
                  </div>
                  <span className="text-gray-400 text-12">
                    {statusItem.date || "Pending"}
                  </span>
                </div>
              ))}
            </div> */}
          </section>

          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-16">Order Details</h2>
            <div className="flex flex-wrap gap-8 md:gap-36 mt-4">
              <div>
                <h4 className="text-gray-400 text-14">Item No</h4>
                <p className="text-14 mt-3">{orderDetail.items_count || 0}</p>
              </div>
              <div>
                <h4 className="text-gray-400 text-14 mb-3">Payment</h4>
                <StatusDisplay 
                  statusName={orderDetail.payment_status} 
                  status={orderDetail.payment_status === "paid" ? 2 : 1}
                />
              </div>
            </div>
          </section>

          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-16">List Items</h2>
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
                          {item.product?.name || item.product?.name_ar || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 w-[214px] border-t border-r text-14 text-gray-500">
                      {item.product?.price} $
                    </td>
                    <td className="px-3 py-3 w-[214px] border-t border-r text-14 text-gray-500">
                      {item.quantity || 0}
                    </td>
                    <td className="px-5 py-3 w-[214px] border-t border-r text-14 text-gray-500">
                      {item.product?.colors?.map((color) => (
                        <div
                          key={color.id}
                          className="w-8 h-8 rounded-full -ms-3 inline-block border"
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
                <p className="text-15 font-bold">Subtotal</p>
                <p className="text-gray-400 text-15">
                  {formatCurrency(orderDetail.sub_total)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-15 font-bold">Shipping</p>
                <p className="text-gray-400 text-15">
                  {formatCurrency(orderDetail.shipping)}
                </p>
              </div>
              <div className="flex items-center justify-between border-t-2 pt-3">
                <p className="text-15 font-bold">Total</p>
                <p className="text-gray-400 text-15">
                  {formatCurrency(orderDetail.total)}
                </p>
              </div>
            </section>
          </section>

          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-16">Transactions</h2>
            <div>
              <p className="text-16 mt-6">Payment</p>
              <div className="space-y-2">
                {orderDetail.transactions?.map((method, index) => {
                  const amount = typeof method.amount === 'number' 
                    ? method.amount 
                    : parseFloat(method.amount) || 0;
                  const refundAmount = typeof method.refund_amount === 'number'
                    ? method.refund_amount
                    : parseFloat(method.refund_amount) || 0;

                  return (
                    <div key={`transaction-${index}`}>
                      <div className="flex justify-between border-b-2 pb-4 border-gray-200">
                        <span className="text-14 text-gray-500 mt-1">
                          {method.payment_method || "N/A"}
                        </span>
                        <span className="text-gray-600">
                          {formatCurrency(amount)}
                        </span>
                      </div>
                      {refundAmount > 0 && (
                        <div>
                          <div className="flex justify-between items-center mt-4">
                            <p className="text-16">Refund</p>
                            <p className="text-red-600">-{formatCurrency(refundAmount)}</p>
                          </div>
                          <p className="text-13 text-gray-400 mt-1">To account balance</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
        <div className="space-y-5">
          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-16">Shipping Address</h2>
            <p className="text-12 mt-2">
              {orderDetail.shipping_address || "Not Available"}
            </p>
          </section>

          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-16 mb-4">Customer Details</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-14">
                <span className="text-gray-500">{icons[2].icon}</span>
                <span>{orderDetail.user?.name || "No name provided"}</span>
              </div>
              <div className="flex items-center gap-2 text-14">
                <span className="text-gray-500">{icons[1].icon}</span>
                <span>{orderDetail.user?.email || "No email provided"}</span>
              </div>
              <div className="flex items-center gap-2 text-14">
                <span className="text-gray-500">{icons[0].icon}</span>
                <span>{orderDetail.user?.phone || "No phone provided"}</span>
              </div>
            </div>
          </section>

          <section className="border border-gray-200 rounded-md p-4 bg-white">
            <h2 className="font-bold text-16 mb-3">Balance</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
              <div className="flex justify-between items-center">
                <p className="text-14">Order Total</p>
                <p className="text-gray-400 text-14">
                  {formatCurrency(orderDetail.total)}
                </p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-14">Return Total</p>
                <p className="text-gray-400 text-14">
                  {formatCurrency(orderDetail.return_price)}
                </p>
              </div>
              <hr className="border-gray-300 my-2" />
              <div className="flex justify-between items-center mt-3">
                <p className="text-14">Paid by customer</p>
                <p className="text-gray-400 text-14">
                  {formatCurrency(orderDetail.paid_amount)}
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-14">Refunded</p>
                <p className="text-gray-400 text-14">
                  {formatCurrency(orderDetail.refund_price)}
                </p>
              </div>
              <hr className="border-gray-300 my-2" />
              <div className="mt-3 flex justify-between">
                <div>
                  <p className="text-14">Balance</p>
                  <span className="text-gray-500 text-13">
                    (customer owes you)
                  </span>
                </div>
                <p className="text-gray-400 text-15">
                  {formatCurrency(orderDetail.balance)}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default OrderDetails;