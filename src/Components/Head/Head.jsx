const Head = ({
  icon: Icon,
  title,
  value,
  backgroundColor = "bg-customOrange-mediumOrange",
  borderColor = "border-primary",
  iconColor = "#E0A75E",
  titleColor = "text-gray-500",
  valueColor = "text-black",
  className = ""
}) => {
  return (
    <section 
      className={`rounded-md border mt-3 p-4 mx-5 flex items-center justify-between ${backgroundColor} ${borderColor} ${className}`}
    >
      <div className="flex items-center gap-2">
        <Icon color={iconColor} size={22} />
        <p className={`text-15 ${titleColor}`}>{title}</p>
      </div>
      <p className={`text-16 font-bold ${valueColor}`}>{value}</p>
    </section>
  );
};

export default Head;