import React from "react";
import PropTypes from "prop-types";
import { Field, FieldArray } from "formik";
import { RiDeleteBinLine } from "react-icons/ri";
import InputField from "../InputFields/InputField";
import CategoryDropdownField from "./CategoryDropdownField";
import ProductDropdownField from "./ProductDropdownField";
const PromotionBasicInfo = ({
  products,
  categories,
  values,
  setFieldValue,
}) => (
  <div className="bg-white rounded-md p-5 w-full">
    <h2 className="text-16 font-bold mb-4">Basic Information</h2>
    <div className="flex flex-col gap-2">
      <InputField name="name" placeholder="Promotion Name" />
      <InputField name="quantity" placeholder="Enter quantity" />

      <div className="">
        <input
          placeholder="Product Number"
          type="number"
          min="1"
          value={values.items.length}
          onChange={(e) => {
            const num = parseInt(e.target.value) || 1;
            const newLength = num > 0 ? num : 1;
            const newItems = [...values.items];

            while (newItems.length < newLength) {
              newItems.push({ product_id: "", quantity: "" });
            }
            while (newItems.length > newLength) {
              newItems.pop();
            }

            setFieldValue("items", newItems);
          }}
          className="w-full h-14 p-2 border-2 rounded-md outline-none focus:border-primary"
        />
      </div>

      <div className="bg-customOrange-mediumOrange rounded-md p-4 my-5">
        <FieldArray name="items">
          {({ remove }) => (
            <div className="space-y-4">
              {values.items.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold mb-3 text-primary">
                      Product {index + 1}
                    </h4>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="font-bold text-red-600 text-sm"
                      >
                        <RiDeleteBinLine size={20} height={25} />
                      </button>
                    )}
                  </div>
                  <div className="">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-full">
                        <Field
                          name={`items[${index}].product_id`}
                          component={ProductDropdownField}
                          products={products}
                        />
                      </div>
                      <div className="w-full">
                        <Field
                          name="category_id"
                          component={CategoryDropdownField}
                          categories={categories}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <InputField
                        name={`items[${index}].quantity`}
                        placeholder="Enter quantity"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </FieldArray>
      </div>
    </div>
  </div>
);

PromotionBasicInfo.propTypes = {
  products: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default PromotionBasicInfo;
