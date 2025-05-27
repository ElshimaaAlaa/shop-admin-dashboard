import PropTypes from 'prop-types';

export const StatusDisplay = ({ status, statusName }) => {
  const getStatusStyles = () => {
    // Handle numeric status codes
    if (status === 1 || status === 2) return "bg-customOrange-mediumOrange px-4 py-2 text-primary";
    if (status === 8) return "bg-red-50 text-red-600 px-4 py-2";
    
    // Handle string status names
    const lowerStatus = statusName?.toLowerCase();
    if (lowerStatus === "paid") return "text-[#28A513] bg-[#E7F6E5]";
    if (lowerStatus === "unpaid") return "bg-gray-100 text-gray-400";
    if (lowerStatus === "refunded") return "bg-red-50 text-red-600";
    
    return "";
  };

  return (
    <span className={`px-2 py-1 rounded-md text-14 ${getStatusStyles()}`}>
      {statusName}
    </span>
  );
};

StatusDisplay.propTypes = {
  status: PropTypes.number,
  statusName: PropTypes.string.isRequired
};