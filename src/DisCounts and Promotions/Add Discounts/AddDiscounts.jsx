import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../Components/DropDowns/dateFormatter";
import { API_BASE_URL  ,API_URL} from "../../ApiServices/apiEndpoints";
import PromotionBasicInfo from "../../Components/DropDowns/PromotionBasicInfo";
import PromotionDetails from "../../Components/DropDowns/PromotionDetails";
import Footer from "../../Components/Footer/Footer";
import SuccessModal from "../../Components/Modal/Success Modal/SuccessModal";
const NewPromotion = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [datesSelected, setDatesSelected] = useState(false);
  const navigate = useNavigate();

  const live_shop_domain = localStorage.getItem("live_shop_domain");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get(`${API_URL}${live_shop_domain}/api/${role}/products`, {
            headers: {
              "Accept-Language": "en",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`${API_URL}${live_shop_domain}/api/${role}/categories`, {
            headers: {
              "Accept-Language": "en",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setProducts(productsResponse.data.data);
        setCategories(categoriesResponse.data.data);
      } catch (err) {
        setError("Failed to fetch products or categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [live_shop_domain, role]);

  const initialValues = {
    name: "",
    total_price: "",
    start_date: null,
    end_date: null,
    items: [{ product_id: "", quantity: "" }],
    category_id: "",
    quantity: "",
  };

  const promotionSchema = Yup.object().shape({
    name: Yup.string().required("Promotion name is required"),
    total_price: Yup.number()
      .required("Total price is required")
      .positive("Total price must be positive"),
    start_date: Yup.date().required("Start date is required").nullable(),
    end_date: Yup.date()
      .required("End date is required")
      .nullable()
      .min(Yup.ref("start_date"), "End date must be after start date"),
    items: Yup.array()
      .of(
        Yup.object().shape({
          product_id: Yup.string().required("Product is required"),
          quantity: Yup.string(),
        })
      )
      .min(1, "At least one product is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name[en]", values.name);
      formData.append("name[ar]", values.name);
      formData.append("total_price", values.total_price);
      formData.append("start_date", formatDate(values.start_date));
      formData.append("end_date", formatDate(values.end_date));
      formData.append("category_id", values.category_id);
      formData.append("quantity", values.quantity);
      values.items.forEach((item, index) => {
        formData.append(`items[${index}][product_id]`, item.product_id);
        formData.append(`items[${index}][quantity]`, item.quantity);
      });

      const response = await axios.post(API_BASE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          live_shop_domain: live_shop_domain,
          role: role,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess("Promotion created successfully!");
      setShowModal(true);
      resetForm();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.data?.errors
          ? Object.values(err.response.data.errors).join(", ")
          : "Failed to create promotion");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen relative">
      <Helmet>
        <title>Add New Promotion | vertex</title>
      </Helmet>

      <div className="rounded-md p-5 mx-5 bg-white mt-5">
        <p className="text-12 text-gray-400">Menu / Product / Add Promotion</p>
        <h1 className="mt-3 text-16 font-bold">Add New Promotions</h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={promotionSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue, submitForm, isValid, dirty }) => (
          <Form className="my-3">
            <div className="flex gap-4 mx-5 pb-32">
              <PromotionBasicInfo 
                products={products} 
                categories={categories} 
                values={values}
                setFieldValue={setFieldValue}
              />
              
              <PromotionDetails
                values={values}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                submitForm={submitForm}
                isValid={isValid}
                dirty={dirty}
                datesSelected={datesSelected}
                setDatesSelected={setDatesSelected}
              />
            </div>
            
            <Footer
              saveBtnType="submit"
              saveText="Save"
              cancelText="Cancel"
              cancelBtnType="button"
            />
          </Form>
        )}
      </Formik>

      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center justify-center w-400">
          <img
            src="/assets/images/success.png"
            alt="success"
            className="w-32 mt-6"
          />
          <p className="font-bold mt-5">Promotion added successfully!</p>
          <button
            className="bg-primary text-white rounded-md p-2 text-14 w-48 mt-4"
            onClick={() => navigate("/Dashboard/AllDiscounts")}
          >
            Back to Promotions
          </button>
        </div>
      </SuccessModal>
    </div>
  );
};
export default NewPromotion;