import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DeleteProduct from "../Delete Product/DeleteProduct";
import { ClipLoader } from "react-spinners";
import { fetchProducts } from "../../ApiServices/AllProuctsApi";
import { Helmet } from "react-helmet";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import Pagination from "../../Components/Pagination/Pagination";
import Header from "../../Components/Header/Header";
import DeleteMutipleProducts from "./DeleteMultipleProducts";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetchProducts();
        if (Array.isArray(response)) {
          setProducts(response);
        } else if (response?.data) {
          setProducts(response.data);
        } else {
          console.warn("Unexpected API response structure:", response);
          setProducts([]);
        }
      } catch (error) {
        setError(true);
        console.error("API call failed: ", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [i18n.language]);

  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    return products.filter(
      (product) =>
        product?.name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        product?.category?.name
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const paginationData = useMemo(() => {
    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return {
      totalItems,
      totalPages,
      currentItems,
      hasItems: totalItems > 0,
    };
  }, [filteredProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectAll(false);
    setSelectedProducts([]);
  }, [searchQuery]);

  useEffect(() => {
    if (!selectAll) return;
    const allCurrentIds = paginationData.currentItems.map((item) => item.id);
    const allSelected = allCurrentIds.every((id) =>
      selectedProducts.includes(id)
    );
    if (!allSelected) {
      setSelectAll(false);
    }
  }, [paginationData.currentItems, selectedProducts, selectAll]);

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== productId
      );
      if (
        updatedProducts.length <= (currentPage - 1) * itemsPerPage &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
      return updatedProducts;
    });
    setSelectedProducts((prev) => prev.filter((id) => id !== productId));
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allProductIds = paginationData.currentItems.map(
        (product) => product.id
      );
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId, isChecked) => {
    if (isChecked) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
      setSelectAll(false);
    }
  };

  const handleDeleteSelected = () => {
    setShowDeleteModal(true);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    setSelectAll(false);
    setSelectedProducts([]);
  };
  useEffect(() => {
    if (showDeleteModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showDeleteModal]);
  return (
    <div className="bg-gray-100 min-h-screen mx-5 pt-5">
      <Helmet>
        <title>
          {t("products")} | {t("vertex")}
        </title>
      </Helmet>
      <Header
        subtitle={t("productHead")}
        title={t("products")}
        className="mb-3"
      />
      <div className="bg-white p-5 rounded-md">
        <SearchBar
          onclick={() => navigate("/Dashboard/addProduct")}
          value={searchQuery}
          onchange={(e) => setSearchQuery(e.target.value)}
          text={t("addNewProduct")}
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
        />

        {selectedProducts.length > 0 && (
          <div className="mt-3 flex justify-between items-center bg-gray-50 p-3 rounded">
            <span>
              {t("selecting")}{" "}
              <span className="text-primary font-bold">
                {selectedProducts.length}
              </span>{" "}
              {t("items")}
            </span>
            <button
              onClick={handleDeleteSelected}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              {t("deleteAll")}
            </button>
          </div>
        )}

        {error ? (
          <div className="text-red-500 text-center mt-10">{t("error")}</div>
        ) : isLoading ? (
          <div className="flex justify-center mt-10">
            <ClipLoader color="#E0A75E" size={40} />
          </div>
        ) : !paginationData.hasItems ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery ? t("noMatchResults") : t("noData")}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg overflow-hidden mt-5">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-b border-r">
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="hidden peer"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            aria-label="Select all products"
                          />
                          <span
                            className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                              selectAll
                                ? "border-primary bg-primary"
                                : "border-gray-300"
                            }`}
                          >
                            {selectAll && (
                              <svg
                                className="w-3 h-3 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                              </svg>
                            )}
                          </span>
                        </label>
                        {t("product")}
                      </div>
                    </th>
                    <th className="px-3 py-3 border-b border-r text-left rtl:text-right">
                      {t("category")}
                    </th>
                    <th className="px-3 py-3 border-r border-b text-left rtl:text-right">
                      {t("price")}
                    </th>
                    <th className="px-3 py-3 border-r border-b text-left rtl:text-right">
                      {t("stock")}
                    </th>
                    <th className="px-3 py-3 border-r text-left border-b rtl:text-right">
                      {t("color")}
                    </th>
                    <th className="px-3 py-3 border-b rtl:border-r text-center">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginationData.currentItems.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td
                        className="px-3 py-3 border-t border-r text-gray-600 text-15 cursor-pointer"
                        onClick={() =>
                          navigate(`/Dashboard/products/${product.id}`)
                        }
                      >
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="hidden peer"
                              checked={selectedProducts.includes(product.id)}
                              onChange={(e) => {
                                handleSelectProduct(
                                  product.id,
                                  e.target.checked
                                );
                                e.stopPropagation();
                              }}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Select product ${product.name}`}
                            />
                            <span
                              className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                                selectedProducts.includes(product.id)
                                  ? "border-primary bg-primary"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedProducts.includes(product.id) && (
                                <svg
                                  className="w-3 h-3 text-white"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                </svg>
                              )}
                            </span>
                          </label>
                          <img
                            className="h-7 w-7 rounded-full object-cover"
                            src={
                              product.images?.[0]?.src ||
                              "/assets/images/default-product.png"
                            }
                            alt={product.name}
                          />
                          {product.name}
                        </div>
                      </td>
                      <td className="px-3 py-3 border-t border-l text-gray-600 text-15 rtl:border-r">
                        <div className="flex items-center gap-3">
                          <img
                            className="h-7 w-7 rounded-full object-cover"
                            src={
                              product.category?.image ||
                              "/assets/images/default-category.png"
                            }
                            alt={product.category?.name}
                          />
                          {product.category?.name}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-gray-600 text-15 border-t border-l w-200">
                        {product.price?.toFixed(2) || "0.00"} $
                      </td>
                      <td className="px-3 text-gray-600 text-15 py-3 border-t border-l w-200">
                        {product.stock}
                      </td>
                      <td className="px-6 py-3 border-t border-l">
                        <div className="flex">
                          {product.colors?.slice(0, 4).map((color, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 -ms-3 rounded-full"
                              style={{ backgroundColor: color.code }}
                              title={color.name}
                            />
                          ))}
                          {product.colors?.length > 4 && (
                            <div className="w-8 h-8 -ms-3 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                              +{product.colors.length - 4}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 border-t border-l">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/Dashboard/EditProduct/${product.id}`, {
                                state: { product },
                              });
                            }}
                            className="text-primary hover:text-primary-dark"
                          >
                            <img
                              src="/assets/svgs/editIcon.svg"
                              alt="Edit"
                              className="w-6 h-6"
                            />
                          </button>
                          <DeleteProduct
                            id={product.id}
                            onDelete={handleDeleteProduct}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {paginationData.totalPages > 1 && (
              <Pagination
                pageCount={paginationData.totalPages}
                onPageChange={handlePageChange}
                forcePage={currentPage - 1}
                isRTL={isRTL}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
              />
            )}
          </>
        )}
        <DeleteMutipleProducts
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          count={selectedProducts.length}
        />
      </div>
    </div>
  );
}
export default AllProducts;