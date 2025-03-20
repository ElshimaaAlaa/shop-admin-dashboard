function OurProcess() {
  const steps = [
    {
      number: <h1 className="text-center">01</h1>,
      title: <h1 className="text-center">Create Your Account</h1>,
      description: (
        <p
          className="text-gray-400 max-w-xs text-center m-auto text-14"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        </p>
      ),
      icon: (
        <div className="flex justify-center">
          <img
            src="/assets/svgs/login_svgrepo.com.svg"
            alt=""
            className="p-5 md:p-7"
          />
        </div>
      ),
    },
    {
      number: <h1 className="text-center">02</h1>,
      title: <h1 className="text-center">Customizable Templates</h1>,
      description: (
        <p
          className="text-gray-400 max-w-xs m-auto text-center text-14"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        </p>
      ),
      icon: (
        <div className="flex justify-center">
          <img
            src="/assets/svgs/customize_svgrepo.com.svg"
            alt=""
            className="p-5 md:p-6"
          />
        </div>
      ),
    },
    {
      number: <h1 className="text-center">03</h1>,
      title: <h1 className="text-center">Choose Pricing Plan</h1>,
      description: (
        <p
          className="text-gray-400 max-w-xs m-auto text-center text-14"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        </p>
      ),
      icon: (
        <div className="flex justify-center">
          <img
            src="/assets/svgs/payment-method-pay_svgrepo.com.svg"
            alt=""
            className="p-5 md:p-7"
          />
        </div>
      ),
    },
  ];

  return (
    <section className="px-5 lg:px-32 mt-10">
      <div>
        <p
          className="text-primary bg-customOrange-lightOrange p-2 w-32 text-center rounded"
          style={{ fontSize: "18px" }}
        >
          Our Process
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mt-5 text-center md:text-left">
          Here's How You Can Design Your
          <span className="text-primary block md:inline ms-3">
            Own E-commerce Website
          </span>
        </h2>
      </div>
      <div className="relative mt-20">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center md:items-start gap-8 mb-16 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex-1 text-center ${
                index % 2 === 1 ? "md:text-right" : "md:text-left"
              }`}
            >
              <h3 className="text-lg md:text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>

            <div className="relative">
              {/* Hexagon shape */}
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <div
                  className="absolute inset-0 bg-customOrange-mediumOrange"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
              </div>
              {/* Number badge */}
              <div className="absolute -top-2 left-24 md:left-28 w-8 h-8 md:w-10 md:h-10 rounded-full bg-customOrange-darkOrange font-bold p-2 text-white flex items-center justify-center text-sm">
                {step.number}
              </div>
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-28 left-1/2 w-px h-16 bg-orange-200"></div>
              )}
            </div>

            <div className="flex-1"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default OurProcess;