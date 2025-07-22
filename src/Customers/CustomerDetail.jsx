import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { CustomerBalance } from "./CustomerBalance";
import { CustomerPersonalInfo } from "./CustomerPersonalInfo";
import { CustomerStatistics } from "./CustomerStatistics";
import { CustomerTransactions } from "./CustomerTransactions";
import { useTranslation } from "react-i18next";
function CustomerDetail() {
  const [customerData, setCustomerData] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const { customerId } = useParams();
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const { t } = useTranslation();
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

  const copyPhoneNumber = () => {
    if (customerData.personal_info?.phone) {
      navigator.clipboard
        .writeText(customerData.personal_info?.phone)
        .then(() => {
          alert(t("successCopy"));
        })
        .catch((err) => {
          console.error("Failed to copy phone number: ", err);
          alert(t("faildCopy"));
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
      <section className="bg-white mb-3 p-5 rounded-md w-full">
        <p className="text-gray-400 text-13">{t("customerDetailsHead")}</p>
        <h1 className="font-bold text-17 mt-2">{t("customerDetails")}</h1>
      </section>
      <CustomerBalance balance={customerData.personal_info?.balance} />
      <div className="mt-3 flex gap-3">
        <CustomerPersonalInfo
          customerData={customerData}
          copyPhoneNumber={copyPhoneNumber}
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