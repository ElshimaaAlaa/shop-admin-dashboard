import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { CustomerBalance } from "./CustomerBalance";
import { CustomerPersonalInfo } from "./CustomerPersonalInfo";
import { CustomerStatistics } from "./CustomerStatistics";
import { CustomerTransactions } from "./CustomerTransactions";
import { useTranslation } from "react-i18next";
import Header from "../Components/Header/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCopyOutline } from "react-icons/io5";

function CustomerDetail() {
  const [customerData, setCustomerData] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const { customerId } = useParams();
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  useEffect(() => {
    const CustomerDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios({
          url: `https://${live_shop_domain}/api/${role}/customers/${customerId}`,
          method: "GET",
          headers: {
            "Accept-Language": "en",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setIsLoading(false);
          setCustomerData(response.data.data);
          setStatistics(response.data.data.statistics);
          setOrders(response.data.data.orders);
        }
      } catch (error) {
        setIsLoading(false);
        setError(true);
        console.error("Failed to fetch Customer", error);
      }
    };
    CustomerDetails();
  }, [customerId, live_shop_domain, role]);

  const copyPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      navigator.clipboard
        .writeText(phoneNumber)
        .then(() => {
          toast.success(t("successCopy"), {
            position: isRTL ? "top-left" : "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          toast.error(t("copyFailed"), {
            position: isRTL ? "top-left" : "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <div className="bg-gray-100 mx-5 py-5">
      <Helmet>
        <title>
          {t("customerDetails")} | {t("vertex")}
        </title>
      </Helmet>
      <ToastContainer rtl={isRTL} />
      <Header
        subtitle={t("customerDetailsHead")}
        title={t("customerDetails")}
      />
      <CustomerBalance balance={customerData.personal_info?.balance} />
      <div className="mt-3 flex gap-3">
        <CustomerPersonalInfo
          customerData={customerData}
          copyPhoneNumber={copyPhoneNumber}
          CopyIcon={IoCopyOutline}
        />
        <div className="w-full">
          <CustomerStatistics statistics={statistics} />
          <CustomerTransactions
            isLoading={isLoading}
            error={error}
            orders={orders}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;