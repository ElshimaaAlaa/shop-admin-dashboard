import { useEffect, useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteProduct from "../Delete Product/DeleteProduct";
import { ClipLoader } from "react-spinners";
import { fetchProducts } from "../../ApiServices/AllProuctsApi";
import { Helmet } from "react-helmet";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isRTL, setIsRtl] = useState(false);
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
    setIsRtl(i18n.language === "ar");
  }, [i18n.language]);

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
  };

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="bg-gray-100 h-[89vh] mx-5 pt-5">
      <Helmet>
        <title>
          {t("products")} | {t("vertex")}
        </title>
      </Helmet>

      <div className="bg-white mb-3 p-4 rounded-md">
        <p className="text-gray-400 text-13">{t("productHead")}</p>
        <h1 className="font-bold text-17 mt-2">{t("products")}</h1>
      </div>

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

        {error ? (
          <div className="text-red-500 text-center mt-10">{t("error")}</div>
        ) : isLoading ? (
          <div className="flex justify-center mt-10">
            <ClipLoader color="#E0A75E" size={40} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery ? t("noMatchResults") : t("noMatchResults")}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg overflow-hidden mt-5">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-b border-r ">
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 rounded text-primary focus:ring-primary border-gray-300"
                        />
                        {t("product")}
                      </p>
                    </th>
                    <th className="px-3 py-3 border-b border-r text-left rtl:text-right ">
                      {t("category")}
                    </th>
                    <th className="px-3 py-3 border-r border-b text-left rtl:text-right ">
                      {t("price")}
                    </th>
                    <th className="px-3 py-3 border-r border-b text-left rtl:text-right ">
                      {t("stock")}
                    </th>
                    <th className="px-3 py-3 border-r text-left border-b rtl:text-right ">
                      {t("color")}
                    </th>
                    <th className="px-3 py-3 border-b rtl:border-r text-center">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td
                        className="px-3 py-3 border-t border-r text-gray-600 text-15 cursor-pointer"
                        onClick={() =>
                          navigate(`/Dashboard/products/${product.id}`)
                        }
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 rounded text-primary focus:ring-primary border-gray-300"
                          />
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
                      <td className="px-3 py-3 border-t border-l text-gray-600 text-15  rtl:border-r">
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
            <div className="flex items-center justify-end  bg-white sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-end">
                <ReactPaginate
                  pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
                  onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                  forcePage={currentPage - 1}
                  containerClassName="flex items-center justify-end mt-5 text-gray-400 text-14"
                  pageClassName="mx-1 px-3 py-1 rounded"
                  pageLinkClassName="page-link"
                  activeClassName="bg-customOrange-lightOrange text-primary"
                  activeLinkClassName="active-link"
                  previousClassName=" px-1 py-1 font-bold text-primary text-[20px] "
                  nextClassName="py-1 px-1 font-bold text-primary text-[20px]"
                  previousLabel={
                    isRTL ? (
                      <ChevronRight className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronLeft className="w-5 h-5 text-center text-primary" />
                    )
                  }
                  nextLabel={
                    isRTL ? (
                      <ChevronLeft className="w-5 h-5 text-center text-primary" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-primary" />
                    )
                  }
                  breakLabel="..."
                  breakClassName=" py-1 text-gray-700"
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default AllProducts;
