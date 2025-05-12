import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { fetchInovices } from "../ApiServices/AllInovices";
import { useNavigate } from "react-router-dom";
import { InvoiceStatistics } from "./InvoiceStatistics";
import { InvoiceTable } from "./InvoiceTable";
import { InvoiceSearch } from "./InvoiceSearch";
import { InvoicePagination } from "./InvoicePagination";
function AllInvoices() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState({
    paid_orders: { current: 0, previous: 0, change_rate: 0, increased: false },
    cancelled_orders: {
      current: 0,
      previous: 0,
      change_rate: 0,
      increased: false,
    },
    pending_payment: {
      current: 0, 
      previous: 0,
      change_rate: 0,
      increased: false,
    },
  });
  const [invoicesData, setInvoicesData] = useState([]);

  useEffect(() => {
    const getInvoicesData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchInovices();
        setStatistics(response.statistics || {
          paid_orders: { current: 0, previous: 0, change_rate: 0, increased: false },
          cancelled_orders: { current: 0, previous: 0, change_rate: 0, increased: false },
          pending_payment: { current: 0, previous: 0, change_rate: 0, increased: false },
        });
        setInvoicesData(response.orders || []);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(true);
        console.error(error);
      }
    };
    getInvoicesData();
  }, []);

  const filteredInvoices = useMemo(() => {
    if (!invoicesData || !Array.isArray(invoicesData)) return [];
    return invoicesData.filter(
      (invoice) =>
        invoice.payment_status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.status_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [invoicesData, searchQuery]);

  const pageCount = Math.ceil(filteredInvoices.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return filteredInvoices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredInvoices, currentPage, itemsPerPage]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="bg-gray-100 pb-10 pt-5 flex flex-col min-h-[89vh] mx-5">
      <Helmet>
        <title>Invoices | vertex</title>
      </Helmet>
      <div className="rounded-md p-5 bg-white">
        <p className="text-gray-400 text-12">Menu / Invoices</p>
        <h1 className="mt-2 text-17 font-bold">Invoices</h1>
      </div>
      <div className="bg-white rounded-md p-4 mt-3">
        <InvoiceStatistics statistics={statistics} />
        
        <section>
          <h3 className="text-16 font-bold my-3">Invoices</h3>
          <InvoiceSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCurrentPage={setCurrentPage}
          />
          
          <InvoiceTable
            isLoading={isLoading}
            error={error}
            currentItems={currentItems}
            navigate={navigate}
            searchQuery={searchQuery}
          />
          
          {filteredInvoices.length > 0 && (
            <InvoicePagination
              pageCount={pageCount}
              handlePageClick={handlePageClick}
              currentPage={currentPage}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default AllInvoices;