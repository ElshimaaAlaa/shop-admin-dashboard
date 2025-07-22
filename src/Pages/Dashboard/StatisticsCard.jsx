import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const StatisticsCard = ({
  icon: Icon,
  title,
  totalNumber = 0,
  percentage = "0%",
  increased,
  duration,
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const formattedNumber =
    typeof totalNumber === "number"
      ? totalNumber.toLocaleString(currentLanguage)
      : totalNumber;

  const formatPercentageText = (text) => {
    if (currentLanguage === "ar") {
      return text
        .replace("from last month", "من الشهر الماضية")
        .replace("from last year", "من السنة الماضية");
    } else {
      return text
        .replace("من الشهر الماضية", "from last month")
        .replace("من السنة الماضية", "from last year");
    }
  };

  // تحديد اللون بناءً على القيمة وليس فقط increased
  const getPercentageColor = () => {
    if (percentage.includes("-") || percentage.includes("نقص")) {
      return "text-red-600 bg-red-50";
    }
    return "text-[#34B41E] bg-[#E7F6E5]";
  };

  return (
    <div className="bg-white rounded-md border border-gray-200 flex-1 min-w-[200px] h-full">
      <div className="flex items-center gap-3 bg-gray-100 rounded-tl-md rounded-tr-md p-3">
        <Icon className="text-2xl text-primary" />
        <h3 className="text-gray-600 text-14">{title}</h3>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{formattedNumber}</h1>
          <p className={`text-12 font-bold rounded-md py-1 px-4 ${getPercentageColor()}`}>
            {formatPercentageText(percentage)}
          </p>
        </div>

        {duration && <p className="text-xs text-gray-400 mt-2">
          {currentLanguage === "ar" ? "مقارنة بالشهر الماضي" : "Compared to last month"}
        </p>}
      </div>
    </div>
  );
};

StatisticsCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  totalNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  percentage: PropTypes.string,
  increased: PropTypes.bool,
  duration: PropTypes.string,
};

export default StatisticsCard;