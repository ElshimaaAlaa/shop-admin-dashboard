import PropTypes from "prop-types";
import InputField from "../InputFields/InputField";
import DateRangePicker from "./DateRangePicker";

const PromotionDetails = ({
  values,
  errors,
  touched,
  setFieldValue,
  datesSelected,
  setDatesSelected,
}) => (
  <div className="rounded-md p-5 bg-white w-full h-52">
    <h3 className="font-bold text-16 mb-4">Promotion Details</h3>
    <InputField name="total_price" placeholder="Total price" />
    <div className="mt-4 relative">
      <DateRangePicker
        startDate={values.start_date}
        endDate={values.end_date}
        onStartDateChange={(date) => setFieldValue("start_date", date)}
        onEndDateChange={(date) => setFieldValue("end_date", date)}
        startError={errors.start_date}
        endError={errors.end_date}
        startTouched={touched.start_date}
        endTouched={touched.end_date}
        onChange={(start, end) => {
          if (start && end && !datesSelected) {
            setDatesSelected(true);
          }
        }}
      />
    </div>
  </div>
);

PromotionDetails.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  datesSelected: PropTypes.bool.isRequired,
  setDatesSelected: PropTypes.func.isRequired,
};

export default PromotionDetails;