import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaCalendarAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  startError,
  endError,
  startTouched,
  endTouched,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);
  const { t } = useTranslation();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const firstDayOfWeek = firstDay.getDay();
    const prevMonthLastDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    ).getDate();

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() - 1,
          prevMonthLastDay - i
        ),
        isCurrentMonth: false,
      });
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push({
        date: new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          day
        ),
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1,
          day
        ),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handleDateSelect = (date) => {
    if (!startDate || (startDate && endDate)) {
      onStartDateChange(date);
      onEndDateChange(null);
      onChange(date, null);
    } else if (date < startDate) {
      onStartDateChange(date);
      onChange(date, endDate);
    } else {
      onEndDateChange(date);
      onChange(startDate, date);
    }
  };

  const isSelected = (date) => {
    return (
      (startDate && date.toDateString() === startDate.toDateString()) ||
      (endDate && date.toDateString() === endDate.toDateString())
    );
  };

  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const formatDisplayDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="date-range-picker" ref={calendarRef}>
      <div className="flex gap-2">
        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              className={`w-full text-14 h-14 p-2 rtl:ps-8 border-2 rounded-lg outline-none ${
                startError && startTouched
                  ? "border-red-500"
                  : "border-gray-200"
              } focus:border-primary`}
              placeholder={t("startDate")}
              value={formatDisplayDate(startDate)}
              readOnly
              onClick={() => setIsOpen(true)}
            />
            <FaCalendarAlt className="absolute right-3 top-5 text-primary" />
          </div>
          {startError && startTouched && (
            <div className="text-red-500 text-xs mt-1">{startError}</div>
          )}
        </div>
        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              className={`w-full text-14 rtl:ps-8 h-14 p-2 border-2 rounded-lg outline-none ${
                endError && endTouched ? "border-red-500" : "border-gray-200"
              } focus:border-primary`}
              placeholder={t("endDate")}
              value={formatDisplayDate(endDate)}
              readOnly
              onClick={() => setIsOpen(true)}
            />
            <FaCalendarAlt className="absolute right-3  top-5 text-primary" />
          </div>
          {endError && endTouched && (
            <div className="text-red-500 text-xs mt-1">{endError}</div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg p-4 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              &lt;
            </button>
            <h3 className="font-medium">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((dayObj, index) => {
              const date = dayObj.date;
              const isDisabled = !dayObj.isCurrentMonth;
              const isStart =
                startDate && date.toDateString() === startDate.toDateString();
              const isEnd =
                endDate && date.toDateString() === endDate.toDateString();
              const isRange = isInRange(date);

              return (
                <button
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                    isDisabled ? "text-gray-300" : "text-gray-700"
                  } ${isToday(date) ? "font-bold" : ""} ${
                    isStart || isEnd
                      ? "bg-primary text-white"
                      : isRange
                      ? "bg-primary bg-opacity-20"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => !isDisabled && handleDateSelect(date)}
                  disabled={isDisabled}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
DateRangePicker.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  startError: PropTypes.string,
  endError: PropTypes.string,
  startTouched: PropTypes.bool,
  endTouched: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
export default DateRangePicker;