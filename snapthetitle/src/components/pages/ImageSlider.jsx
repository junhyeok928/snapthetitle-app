import React, { useState, useEffect, useRef } from 'react';

const ImageSlider = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === images.length - 1 ? 0 : prevSlide + 1
            );
        }, 5000);
        return () => clearInterval(intervalRef.current);
    }, [images.length]);

    const handleChangeSlide = (newSlide) => {
        setCurrentSlide(newSlide);
        clearInterval(intervalRef.current);
    };

    const prevSlide = () => {
        handleChangeSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
    };

    const nextSlide = () => {
        handleChangeSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
    };

    return (
        <div className="relative relative2 overflow-hidden w-full h-[500px]">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`slide-${index}`}
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 h-full max-w-[800px] object-cover transition-opacity duration-500 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                />

            ))}
            {/* 이전 버튼 */}
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent p-2"
                onClick={prevSlide}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            {/* 다음 버튼 */}
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent p-2"
                onClick={nextSlide}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default ImageSlider;
