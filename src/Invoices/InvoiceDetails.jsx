import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./invoiceStyle.scss"
import { FaCircleCheck } from "react-icons/fa6";

function InvoiceDetails() {
  const API_BASE_URL = "https://";
  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const invoiceRef = useRef();

  useEffect(() => {
    const getInvoicesDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios({
          url: `${API_BASE_URL}${live_shop_domain}/api/${role}/invoices/${id}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": "ar",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setData(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    };
    getInvoicesDetails();
  }, [id]);

  const downloadPdf = () => {
    setIsGeneratingPdf(true);
    const input = invoiceRef.current;
    input.classList.add("printing-pdf");
    
    html2canvas(input, {
      scale: 2,
      logging: false,
      useCORS: true,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice_${data.invoice_number || id}.pdf`);
      input.classList.remove("printing-pdf");
      setIsGeneratingPdf(false);
    }).catch((error) => {
      console.error("Error generating PDF:", error);
      setIsGeneratingPdf(false);
      input.classList.remove("printing-pdf");
    });
  };

  return (
    <div className="bg-gray-100 pb-10 pt-3 flex flex-col min-h-[89vh] mx-3">
      <Helmet>
        <title>Invoice Details | vertex</title>
      </Helmet>
      <section className="rounded-md p-5 bg-white">
        <p className="text-gray-400 text-12">Menu / Invoice Details</p>
        <div className="flex justify-between items-center">
          <h1 className="mt-2 text-17 font-bold">Invoice Details</h1>
          <button
            onClick={downloadPdf}
            disabled={isGeneratingPdf || isLoading}
            className="bg-primary text-white p-3 w-52  rounded-md flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {isGeneratingPdf ? (
              <ClipLoader color="#ffffff"  size={22} />
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download Invoice
              </>
            )}
          </button>
        </div>
      </section>
      
      <section ref={invoiceRef} className="rounded-xl border-1 border-gray-200 py-6 px-5 bg-white mt-3">
        {/* Invoice Header */}
        <div className="flex justify-between rounded-xl border-2 border-primary bg-customOrange-mediumOrange py-8 ps-3 pe-7">
          <div className="">
            <div>
              <img
                src="/assets/svgs/vertex.svg"
                alt="logo"
                className="h-12 w-56"
              />
            </div>
            <div className="flex items-center justify-between mt-10 gap-14 ms-6">
              <div>
                <p className="text-gray-500 text-15">Issued on</p>
                <p className="text-15 mt-2">{data.date}</p>
              </div>
              <div>
                <p className="text-gray-500 text-15">Payment Due</p>
                <p className="mt-2 text-15">{data.payment_date}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-4">
            <p className="text-gray-500 text-15 text-right">Invoice No.</p>
            <p className="font-bold text-2xl">{data.invoice_number}</p>
            <p
              className={`px-2 py-2 flex items-center justify-center gap-1  w-20 rounded-md text-14 ${
                data.payment_status === "unpaid"
                  ? "bg-gray-500 text-white"
                  : data.payment_status === "paid"
                  ? "text-white bg-[#28A513]"
                  : data.payment_status === "refund"
                  ? "text-white bg-red-600"
                  : ""
              }`}
            >
              <FaCircleCheck size={16}/>{data.payment_status}
            </p>
          </div>
        </div>
        {/* Issue From and For */}
        <div className="mt-8 flex items-center gap-32 mx-1">
          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-16 mb-4">Issue From :</h2>
            <p className="flex items-center gap-8 text-15">
              Name
              <span className="text-gray-500">
                {data.customer_name || "N/A"}
              </span>
            </p>
            <p className="flex items-center gap-8 text-15">
              Email
              <span className="text-gray-500">
                {data.customer_email || "N/A"}
              </span>
            </p>
            <p className="flex items-center gap-8 text-15">
              Phone
              <span className="text-gray-500">
                {data.customer_phone || "N/A"}
              </span>
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-16 mb-4">Issue For :</h2>
            <p className="flex items-center gap-8 text-15">
              Name
              <span className="text-gray-500">
                {data.issued_for?.name || "N/A"}
              </span>
            </p>
            <p className="flex items-center gap-8 text-15">
              Email
              <span className="text-gray-500">
                {data.issued_for?.email || "N/A"}
              </span>
            </p>
            <p className="flex items-center gap-8 text-15">
              Phone
              <span className="text-gray-500">
                {data.issued_for?.phone || "N/A"}
              </span>
            </p>
          </div>
        </div>

        {/* Products Table */}
        <section>
          <h2 className="font-bold text-17 mt-8 mb-4 mx-1">Products</h2>
          {error ? (
            <div className="text-red-500 text-center mt-10">
              Failed to fetch products. Please try again.
            </div>
          ) : isLoading ? (
            <div className="flex justify-center mt-10">
              <ClipLoader color="#E0A75E" size={40} />
            </div>
          ) : data.products?.length === 0 ? (
            <div className="text-gray-400 text-center mt-10">
              No products available
            </div>
          ) : (
            <>
              <div className="overflow-hidden mx-1">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left text-gray-600 font-light px-3 py-3">
                        Items
                      </th>
                      <th className="text-gray-600 font-light py-3 text-left">
                        Qty.
                      </th>
                      <th className="text-gray-600 font-light py-3 text-left">
                        Price
                      </th>
                      <th className="text-gray-600 font-light py-3 text-left">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.products?.map((product) => (
                      <tr key={product.id}>
                        <td className="px-3 py-3 text-16">
                          <div className="">
                            <div className="flex gap-3">
                              <img
                                className="h-7 w-7 rounded-full object-cover"
                                src={
                                  product.images?.[0]?.src ||
                                  "/assets/images/product.png"
                                }
                                alt={product.product_name}
                              />
                              {product.product_name}
                            </div>

                            <div className="flex flex-col ms-12">
                              <span className="text-gray-500 text-13">
                                size : {product.size}
                              </span>
                              <span className="text-gray-500 text-13">
                                color :
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "15px",
                                    height: "15px",
                                    backgroundColor: product.color,
                                    borderRadius: "50%",
                                    marginLeft: "5px",
                                    verticalAlign: "middle",
                                    border: "1px solid #ddd",
                                  }}
                                  title={product.color}
                                ></span>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-15">
                          {product.quantity}
                        </td>
                        <td className="px-3 py-3 text-15">
                          {product.price?.toFixed(2) || "0.00"} $
                        </td>
                        <td className="px-3 text-15 py-3">
                          {(product.price * product.quantity)?.toFixed(2) || "0.00"} $
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
        {/* Totals Section */}
        <section className="flex justify-end">
          <div className="flex flex-col gap-5 mt-7 w-400 justify-end bg-gray-50 rounded-xl p-5">
            <p className="text-15 flex items-center justify-between">
              Subtotal
              <span className="text-gray-500">{data.sub_total?.toFixed(2) || "0.00"} $</span>
            </p>
            <p className="text-15 flex items-center justify-between">
              Shipping
              <span className="text-gray-500">{data.shipping_price?.toFixed(2) || "0.00"} $</span>
            </p>
            <hr />
            <p className="text-15 flex items-center justify-between">
              Total<span className="text-gray-500">{data.total?.toFixed(2) || "0.00"} $</span>
            </p>
          </div>
        </section>
      </section>
    </div>
  );
}
export default InvoiceDetails;