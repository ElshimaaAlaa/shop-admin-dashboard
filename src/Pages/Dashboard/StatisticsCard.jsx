import PropTypes from "prop-types";
const StatisticsCard = ({
  icon: Icon,
  title,
  totalNumber = 0,
  percentage = "0%",
  increased,
  duration,
}) => {
  const formattedNumber = typeof totalNumber === 'number' 
    ? totalNumber.toLocaleString()
    : totalNumber;

  const isPositive = increased !== undefined 
    ? increased 
    : !percentage.includes("-") && !percentage.includes("من الشهر الماضي");

  return (
    <div className="bg-white rounded-md border border-gray-200 flex-1 min-w-[200px] h-full">
      <div className="flex items-center gap-3 bg-gray-100 rounded-tl-md rounded-tr-md p-3">
        <Icon className="text-2xl text-primary" />
        <h3 className="text-gray-600 text-14">{title}</h3>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{formattedNumber}</h1>
          <span
            className={`text-12 font-bold rounded-md py-1 px-2 ${
              isPositive
                ? "text-[#34B41E] bg-[#E7F6E5]"
                : "text-red-600 bg-red-50"
            }`}
          >
            {percentage}
          </span>
        </div>
        
        {duration && (
          <p className="text-xs text-gray-400 mt-2">{duration}</p>
        )}
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