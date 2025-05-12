import { MdPayment } from "react-icons/md";
import { RiRefund2Line } from "react-icons/ri";
import { TbCancel } from "react-icons/tb";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineDone } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import StatisticsCard from "../Pages/Dashboard/ReportItems";
export const OrdersStatistics = ({ statistics }) => (
  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    <StatisticsCard
      icon={MdPayment}
      title="Pending Payment"
      totalNumber={statistics.pending_payment?.change_rate || 0}
      percentage={`${statistics.pending_payment?.current || 0}% vs. previous month`}
      duration={`Last month: ${statistics.pending_payment?.previous || 0}`}
    />
    <StatisticsCard
      icon={RiRefund2Line}
      title="Refund Orders"
      totalNumber={statistics.refund_orders?.change_rate || 0}
      percentage={`${statistics.refund_orders?.current || 0}% vs. previous month`}
      duration={`Last month: ${statistics.refund_orders?.previous || 0}`}
    />
    <StatisticsCard
      icon={TbCancel}
      title="Cancelled Orders"
      totalNumber={statistics.cancelled_orders?.change_rate || 0}
      percentage={`${statistics.cancelled_orders?.current || 0}% vs. previous month`}
      duration={`Last month: ${statistics.cancelled_orders?.previous || 0}`}
    />
    <StatisticsCard
      icon={BsClockHistory}
      title="Ongoing Orders"
      totalNumber={statistics.ongoing_orders?.change_rate || 0}
      percentage={`${statistics.ongoing_orders?.current || 0}% vs. previous month`}
      duration={`Last month: ${statistics.ongoing_orders?.previous || 0}`}
    />
    <StatisticsCard
      icon={MdOutlineDone}
      title="Completed Orders"
      totalNumber={statistics.completed_orders?.change_rate || 0}
      percentage={`${statistics.completed_orders?.current || 0}% vs. previous month`}
      duration={`Last month: ${statistics.completed_orders?.previous || 0}`}
    />
    <StatisticsCard
      icon={GoClockFill}
      title="Payment Refund"
      totalNumber={statistics.payment_refund?.change_rate || 0}
      percentage={`${statistics.payment_refund?.current || 0}% vs. previous month`}
      duration={`Last month: ${statistics.payment_refund?.previous || 0}`}
    />
  </section>
);