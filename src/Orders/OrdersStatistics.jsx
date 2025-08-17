import { MdPayment } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { TbCancel } from "react-icons/tb";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineDone } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import StatisticsCard from "../Pages/Dashboard/ReportItems";
import { useTranslation } from "react-i18next";
export const OrdersStatistics = ({ statistics }) => {
  const { t } = useTranslation();
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <StatisticsCard
        icon={MdPayment}
        title={t("pendingPayment")}
        totalNumber={statistics.pending_payment?.change_rate || 0}
        percentage={`${
          statistics.pending_payment?.current || 0
        }% ${t("vs")} ${t("previousMonth")}`}
        duration={`${t("lastMonth")} ${statistics.pending_payment?.previous || 0}`}
      />
      <StatisticsCard
        icon={RiRefund2Line}
        title={t("refundOrders")}
        totalNumber={statistics.refund_orders?.change_rate || 0}
        percentage={`${
          statistics.refund_orders?.current || 0
        }% ${t("vs")} ${t("previousMonth")}`}
        duration={`${t("lastMonth")} ${statistics.refund_orders?.previous || 0}`}
      />
      <StatisticsCard
        icon={TbCancel}
        title={t("cancelledOrders")}
        totalNumber={statistics.cancelled_orders?.change_rate || 0}
        percentage={`${
          statistics.cancelled_orders?.current || 0
        }% ${t("vs")} ${t("previousMonth")}`}
        duration={`${t("lastMonth")} ${statistics.cancelled_orders?.previous || 0}`}
      />
      <StatisticsCard
        icon={BsClockHistory}
        title={t("ongoingOrders")}
        totalNumber={statistics.ongoing_orders?.change_rate || 0}
        percentage={`${
          statistics.ongoing_orders?.current || 0
        }% ${t("vs")} ${t("previousMonth")}`}
        duration={`${t("lastMonth")} ${statistics.ongoing_orders?.previous || 0}`}
      />
      <StatisticsCard
        icon={MdOutlineDone}
        title={t("completedOrders")}
        totalNumber={statistics.completed_orders?.change_rate || 0}
        percentage={`${
          statistics.completed_orders?.current || 0
        }% ${t("vs")} ${t("previousMonth")}`}
        duration={`${t("lastMonth")} ${statistics.completed_orders?.previous || 0}`}
      />
      <StatisticsCard
        icon={GoClockFill}
        title={t("paymentRefund")}
        totalNumber={statistics.payment_refund?.change_rate || 0}
        percentage={`${
          statistics.payment_refund?.current || 0
        }% ${t("vs")} ${t("previousMonth")}`}
        duration={`${t("lastMonth")} ${statistics.payment_refund?.previous || 0}`}
      />
    </section>
  );
};