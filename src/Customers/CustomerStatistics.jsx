import { TbInvoice } from "react-icons/tb";
import { FaShippingFast } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";

const Statistics = ({ icon: Icon, title, totalNumber }) => (
  <div className="bg-white rounded-md border border-gray-200 flex-1 min-w-[200px]">
    <div className="flex items-center gap-2 bg-gray-100 rounded-tl-md rounded-tr-md p-3">
      <Icon className="text-xl text-primary" />
      <h3 className="text-gray-600 text-14">{title}</h3>
    </div>
    <h1 className="text-xl font-bold px-4 py-4">$ {totalNumber}</h1>
  </div>
);

export const CustomerStatistics = ({ statistics }) => {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      <Statistics
        icon={TbInvoice}
        title="Total Invoices"
        totalNumber={statistics?.orders_count}
      />
      <Statistics
        icon={FaShippingFast}
        title="Total Orders"
        totalNumber={statistics?.invoices_count}
      />
      <Statistics
        icon={FaSackDollar}
        title="Total Expense"
        totalNumber={statistics?.total_spent}
      />
    </div>
  );
};
