import React, { useState, useEffect } from "react";

function AboutUs() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "/assets/images/slide 1.png",
    "/assets/images/slide 2.png",
    "/assets/images/slide 3.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="ps-5 pe-5 mt-10 flex flex-col-reverse items-center md:flex-row md:items-center md:ps-5 md:pe-5 lg:pe-32 lg:ps-32 lg:flex-row lg:items-center">
      <div>
        <img
          src={images[currentImageIndex]}
          alt="Vertex store illustration"
          loading="lazy"
          className="mt-5 w-550 lg:w-450 md:w-540 p-3 me-5"
        />
      </div>
      <div className="mt-5">
        <p
          className="text-primary bg-customOrange-lightOrange p-2 rounded w-28 text-center text-18"
        >
          About us
        </p>
        <h1 className="leading-normal text-2xl md:text-2xl lg:text-3xl font-bold lg:leading-normal md:leading-normal mt-4 md:w-450 lg:w-450">
          Vertex helps you
          <span className="me-3 ms-3 text-primary">
            build your own store
          </span>
          in a more effective way
        </h1>
        <p className="text-secondary lg:w-85 mt-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </p>
      </div>
    </section>
  );
}
export default AboutUs;