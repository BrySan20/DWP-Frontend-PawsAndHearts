import React, { useState, useEffect } from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import dog1 from "../../../../assets/images/dog1.jpg";
import cat1 from "../../../../assets/images/cat1.jpg";
import bird1 from "../../../../assets/images/bird1.jpg";
import turtle1 from "../../../../assets/images/turtle1.jpg";
import "./Carousel.css";

const Carousel = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Effect para detectar cambios en el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const carouselImages = [
    {
      src: {dog1},
      alt: "Pet adoption image 1",
    },
    {
      src: {cat1},
      alt: "Pet adoption image 2",
    },
    {
      src: {bird1},
      alt: "Pet adoption image 3",
    },
    {
      src: {turtle1},
      alt: "Pet adoption image 4",
    },
  ];

  return (
    <div className={`carousel-container ${isMobile ? 'mobile-layout' : ''}`}>
      {/* Título para móviles (aparece arriba en versión móvil) */}
      {isMobile && (
        <div className="mobile-title-section">
          <h2 className="carousel-title">Who are we?</h2>
        </div>
      )}

      {/* Columna izquierda: Carrusel de imágenes */}
      <div className="carousel-images-column">
        <ResponsiveCarousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={5000}
          swipeable={true}
          emulateTouch={true}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </ResponsiveCarousel>
      </div>

      {/* Columna derecha: Descripción con título */}
      <div className="carousel-description-column">
        {!isMobile && <h2 className="carousel-title">Who are we?</h2>}
        <div className="carousel-description">
          <p>
            Welcome to Paws & Hearts, your trusted platform for pet adoption and care. 
            We are dedicated to connecting loving homes with pets in need.  
            Our mission is to ensure every pet finds a caring family and every 
            family finds their perfect companion. With years of experience in 
            animal welfare, we understand the unique bond between humans and pets.
          </p>  
        </div>
      </div>
    </div>
  );
};

export default Carousel;