import React, { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./SectionsStyle.scss";
const testimonials = [
  {
    id: 1,
    userImage: "/assets/images/user.png",
    quoteIcon: "/assets/images/icon.png",
    ratingImage: "/assets/images/rate.png",
    logoImage: "/assets/svgs/vertex.svg",
    name: "Jenny Wilson",
    role: "Co-Founder of",
    company: "VERTEX",
    testimonial: "I use this Website to easily Customize my own website",
  },
];

function OpinionSection() {
  const carouselRef = useRef();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const handlePrev = () => {
    carouselRef.current.previous();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <section className="opinion-section px-5 lg:px-20 mt-10 mb-20">
      {/* Header */}
      <p className="text-primary bg-customOrange-mediumOrange p-3 rounded-md w-32 text-center text-sm md:text-base">
        Opinions
      </p>
      <h1 className="text-xl font-bold mt-5 text-center md:text-left">
        What Our Clients Say About Us
      </h1>

      {/* Carousel */}
      <div className="carousel-container mt-5">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          ref={carouselRef}
          arrows={false}
          showDots={false}
          containerClass="carousel"
          itemClass="carousel-item"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col items-start justify-center lg:flex-row gap-4 bg-lightGray rounded p-3 md:items-center lg:items-center w-full md:w-400 lg:w-550"
            >
              <div className="flex-shrink-0 justify-center flex items-center">
                <img
                  src={testimonial.userImage}
                  alt={`${testimonial.name}'s profile`}
                  loading="lazy"
                  className="w-24 h-24 object-cover rounded-full lg:rounded-md md:rounded-md md:w-330 md:object-fill md:h-52 lg:w-48 lg:h-48"
                />
              </div>
              <div className="flex-1">
                <svg
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 md:w-8"
                >
                  <circle cx="25.9696" cy="25.7855" r="25.3788" fill="#69ABB5" />
                  <path
                    d="M36.955 35.2551H28.5164C27.6919 32.534 27.2797 29.714 27.2797 26.795C27.2797 23.8265 28.0314 21.4765 29.5348 19.7449C31.0868 17.9638 33.3662 17.0733 36.3731 17.0733V21.2291C33.9482 21.2291 32.7357 22.7381 32.7357 25.756V27.1661H36.955V35.2551ZM24.6607 35.2551H16.2221C15.3976 32.534 14.9854 29.714 14.9854 26.795C14.9854 23.8265 15.7371 21.4765 17.2405 19.7449C18.7925 17.9638 21.0719 17.0733 24.0788 17.0733V21.2291C21.6539 21.2291 20.4414 22.7381 20.4414 25.756V27.1661H24.6607V35.2551Z"
                    fill="white"
                  />
                </svg>

                <h3 className="mt-4 text-sm md:text-lg w-full">
                  {testimonial.testimonial}
                </h3>
                <img
                  src={testimonial.ratingImage}
                  alt={`${testimonial.name}'s rating`}
                  loading="lazy"
                  className="mt-3 w-24 md:w-28 lg:w-52"
                />
                <div className="flex gap-3 items-center mt-3">
                  <p className="font-bold text-sm md:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm mt-1">
                    {testimonial.role}
                  </p>
                  <img
                    src={testimonial.logoImage}
                    alt={`${testimonial.company} logo`}
                    loading="lazy"
                    className="w-16 md:w-20 bg-white rounded-xl p-2"
                  />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {/* Navigation Arrows */}
      <div className="flex items- justify-center mt-10 gap-5">
        <button
          className="bg-primary text-white p-2 w-16 font-bold rounded-full text-lg md:text-2xl"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          &#8592;
        </button>
        <button
          className="bg-primary text-white p-2 w-16 font-bold rounded-full text-lg md:text-2xl"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}
export default OpinionSection;