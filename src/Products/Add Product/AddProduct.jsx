import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddProduct = () => {
  const initialValues = {
    name_ar: "",
    name_en: "",
    description_ar: "",
    description_en: "",
    stock: "",
    price: "",
    category_id: "",
    tag_number: "",
    gender: "",
    discount_percentage: "",
    cost: "",
    revenue: "",
    discount_expire_at: "",
    tags: [],
    images: [],
  };

  const validationSchema = Yup.object({
    name_ar: Yup.string().required("الاسم باللغة العربية مطلوب"),
    name_en: Yup.string().required("Name in English is required"),
    description_ar: Yup.string().required("الوصف باللغة العربية مطلوب"),
    description_en: Yup.string().required("Description in English is required"),
    stock: Yup.number().required("Stock is required"),
    price: Yup.number().required("Price is required"),
    category_id: Yup.number().required("Category is required"),
    tag_number: Yup.string().required("Tag number is required"),
    gender: Yup.string().required("Gender is required"),
    discount_percentage: Yup.number().required("Discount is required"),
    cost: Yup.number().required("Cost is required"),
    revenue: Yup.number().required("Revenue is required"),
    discount_expire_at: Yup.date().required("Discount expiry date is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const formData = new FormData();
      formData.append("name[ar]", values.name_ar);
      formData.append("name[en]", values.name_en);
      formData.append("description[ar]", values.description_ar);
      formData.append("description[en]", values.description_en);
      formData.append("stock", values.stock);
      formData.append("price", values.price);
      formData.append("category_id", values.category_id);
      formData.append("tag_number", values.tag_number);
      formData.append("gender", values.gender);
      formData.append("discount_percentage", values.discount_percentage);
      formData.append("cost", values.cost);
      formData.append("revenue", values.revenue);
      formData.append("discount_expire_at", values.discount_expire_at);
  
      // ✅ Fix: Convert tags string to array
      const tagsArray = typeof values.tags === "string" ? values.tags.split(",").map(tag => tag.trim()) : values.tags;
      tagsArray.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
  
      // ✅ Handling images properly
      values.images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
  
      console.log("Submitting data:", Object.fromEntries(formData.entries())); // Debugging the request
  
      const response = await axios.post(
        "https://demo.vrtex.duckdns.org/api/shop/products/store",
        formData,
        {
          headers:{
          "Accept-Language": "ar", // Assuming the form is in Arabic
          Authorization: `Bearer ${localStorage.getItem("token")}`
          }, // Assuming token is stored in localStorage
        }
      );
  
      console.log("Response:", response.data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error);
      setErrors({ submit: error.response?.data?.message || "Submission failed" });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div>
      <h2>Add New Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, errors }) => (
          <Form>
            <div>
              <label>Name (Arabic)</label>
              <Field type="text" name="name_ar" />
              <ErrorMessage name="name_ar" component="div" className="error" />
            </div>

            <div>
              <label>Name (English)</label>
              <Field type="text" name="name_en" />
              <ErrorMessage name="name_en" component="div" className="error" />
            </div>

            <div>
              <label>Description (Arabic)</label>
              <Field as="textarea" name="description_ar" />
              <ErrorMessage name="description_ar" component="div" className="error" />
            </div>

            <div>
              <label>Description (English)</label>
              <Field as="textarea" name="description_en" />
              <ErrorMessage name="description_en" component="div" className="error" />
            </div>

            <div>
              <label>Stock</label>
              <Field type="number" name="stock" />
              <ErrorMessage name="stock" component="div" className="error" />
            </div>

            <div>
              <label>Price</label>
              <Field type="number" name="price" />
              <ErrorMessage name="price" component="div" className="error" />
            </div>

            <div>
              <label>Category ID</label>
              <Field type="number" name="category_id" />
              <ErrorMessage name="category_id" component="div" className="error" />
            </div>

            <div>
              <label>Tag Number</label>
              <Field type="text" name="tag_number" />
              <ErrorMessage name="tag_number" component="div" className="error" />
            </div>

            <div>
              <label>Gender</label>
              <Field as="select" name="gender">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="error" />
            </div>

            <div>
              <label>Discount (%)</label>
              <Field type="number" name="discount_percentage" />
              <ErrorMessage name="discount_percentage" component="div" className="error" />
            </div>

            <div>
              <label>Cost</label>
              <Field type="number" name="cost" />
              <ErrorMessage name="cost" component="div" className="error" />
            </div>

            <div>
              <label>Revenue</label>
              <Field type="number" name="revenue" />
              <ErrorMessage name="revenue" component="div" className="error" />
            </div>

            <div>
              <label>Discount Expiry Date</label>
              <Field type="date" name="discount_expire_at" />
              <ErrorMessage name="discount_expire_at" component="div" className="error" />
            </div>

            <div>
              <label>Tags</label>
              <Field type="text" name="tags" placeholder="Comma separated tags" />
              <ErrorMessage name="tags" component="div" className="error" />
            </div>

            <div>
              <label>Images</label>
              <input
                type="file"
                multiple
                onChange={(event) => {
                  const files = Array.from(event.currentTarget.files);
                  setFieldValue("images", files);
                }}
              />
              <ErrorMessage name="images" component="div" className="error" />
            </div>

            {errors.submit && <div className="error">{errors.submit}</div>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Add Product"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
