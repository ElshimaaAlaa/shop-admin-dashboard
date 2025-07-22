import PropTypes from "prop-types";
import CustomDropdown from "./CustomDropdown";
import { useTranslation } from "react-i18next";
const CategoryDropdownField = ({ field, form, categories, ...props }) => {
  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  const { t } = useTranslation();
  return (
    <CustomDropdown
      options={options}
      value={field.value}
      onChange={form.setFieldValue}
      name={field.name}
      placeholder={t("selectCat")}
      error={form.errors[field.name]}
      touched={form.touched[field.name]}
      {...props}
      className="text-14 bg-white text-gray-400 rounded-md"
    />
  );
};

CategoryDropdownField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CategoryDropdownField;
