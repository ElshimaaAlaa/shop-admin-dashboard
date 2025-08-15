import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import "./style.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomCalendar = ({ selectedDate, onChange, inline = true }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className={`custom-calendar ${isRTL ? "rtl" : ""}`}>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        inline={inline}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="custom-header">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="nav-button"
              aria-label="Previous month"
            >
              {isRTL ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            <div className="month-year">
              {date.toLocaleDateString(t("locale") || "en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>

            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="nav-button"
              aria-label="Next month"
            >
              {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        )}
        dayClassName={(date) => {
          const today = new Date();
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          const isSelected =
            selectedDate &&
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();

          return (
            [isToday ? "today" : "", isSelected ? "selected" : ""]
              .filter(Boolean)
              .join(" ") || undefined
          );
        }}
        calendarClassName="calendar-root"
        wrapperClassName="calendar-wrapper"
      />
    </div>
  );
};

export default CustomCalendar;
