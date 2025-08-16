const Header = ({
  subtitle = "shippingMenu",
  title = "shippingProvider",
  subtitleColor = "text-gray-400",
  titleColor = "text-black",
  bgColor = "bg-white",
  spacing = "mt-5",
  subtitleSize = "text-13",
  titleSize = "text-17",
  className = "",
  t = (key) => key, 
}) => {
  return (
    <section
      className={`rounded-md p-5 mx-5 ${bgColor} ${spacing} ${className}`}
    >
      <p className={`${subtitleSize} ${subtitleColor}`}>{t(subtitle)}</p>
      <h1 className={`${titleSize} font-bold mt-2 ${titleColor}`}>
        {t(title)}
      </h1>
    </section>
  );
};

export default Header;
