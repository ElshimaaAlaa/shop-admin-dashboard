import React from "react";
const StatisticsCard = ({
  icon: Icon,
  title,
  totalNumber,
  percentage,
  duration,
}) => (
  <div className="bg-white rounded-md border border-gray-200 flex-1 min-w-[200px]">
    <div className="flex items-center gap-3 bg-gray-100 rounded-tl-md rounded-tr-md p-3 mb-5">
      <Icon className="text-2xl text-primary" />
      <h3 className="text-gray-600 text-14">{title}</h3>
    </div>
    <div className="flex items-center gap-3 ps-4">
      <h1 className="text-2xl font-bold">{totalNumber}</h1>
      <p
        className={`text-12 font-bold rounded-md py-1 px-4 ${
          percentage?.includes("-") || percentage?.includes("نقص")
            ? "text-red-600 bg-red-50"
            : "text-[#34B41E] bg-[#E7F6E5]"
        }`}
      >
        {percentage}
      </p>
    </div>
    <p className="text-xs text-gray-400 mt-3 mb-3 ps-4">{duration}</p>
  </div>
);

export default StatisticsCard;
