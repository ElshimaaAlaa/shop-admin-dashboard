import { MdPayment } from "react-icons/md";
import { BsClockFill } from "react-icons/bs";
import { TbCancel } from "react-icons/tb";
import StatisticsCard from "../Pages/Dashboard/ReportItems";

export const InvoiceStatistics = ({ statistics }) => (
  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    <StatisticsCard
      icon={MdPayment}
      title="Paid Invoices"
      totalNumber={statistics.paid_orders.current || 0}
      percentage={`${statistics.paid_orders.change_rate || 0}% ${
        statistics.paid_orders.increased ? "+" : ""
      } vs. previous month`}
      duration={`Last month: ${statistics.paid_orders.previous || 0}`}
    />
    <StatisticsCard
      icon={BsClockFill}
      title="Pending Invoices"
      totalNumber={statistics.pending_payment.current || 0}
      percentage={`${statistics.pending_payment.change_rate || 0}% ${
        statistics.pending_payment.increased ? "+" : ""
      } vs. previous month`}
      duration={`Last month: ${statistics.pending_payment.previous || 0}`}
    />
    <StatisticsCard
      icon={TbCancel}
      title="Cancelled Invoices"
      totalNumber={statistics.cancelled_orders.current || 0}
      percentage={`${statistics.cancelled_orders.change_rate || 0}% ${
        statistics.cancelled_orders.increased ? "+" : ""
      } vs. previous month`}
      duration={`Last month: ${statistics.cancelled_orders.previous || 0}`}
    />
  </section>
);
