import PropTypes from "prop-types";
import CustomDropdown from "./CustomDropdown";

const ProductDropdownField = ({ field, form, products, ...props }) => {
  const options = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  const error =
    form.errors.items &&
    form.errors.items[field.name.split("[")[1].split("]")[0]]?.product_id;
  const touched =
    form.touched.items &&
    form.touched.items[field.name.split("[")[1].split("]")[0]]?.product_id;

  return (
    <CustomDropdown
      options={options}
      value={field.value}
      onChange={form.setFieldValue}
      name={field.name}
      placeholder="Select product"
      touched={touched}
      {...props}
      className="text-14 bg-white text-gray-400 h-12 rounded-lg"
    />
  );
};

ProductDropdownField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductDropdownField;