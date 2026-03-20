import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import Card from "../../../Componemt/Card";

function MultipleItems() {
    const [slidesToShowNumber, setSlidesToShowNumber] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setSlidesToShowNumber(1);
            } else if (window.innerWidth <= 768) {
                setSlidesToShowNumber(2);
            } else {
                setSlidesToShowNumber(4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const settings = {
        infinite: true,
        autoplaySpeed: 2000,
        autoplay: true,
        speed: 500,
        slidesToShow: slidesToShowNumber,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const listProduct = useSelector((state) => state.allProductStore.listproducts);
    const [opacity, setOpacity] = useState(0)

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "flex",
                    opacity: opacity,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5, // Rounded button
                    width: "20px",
                    height: "50%",
                    background: "rgba(92, 94, 92, 0.4)",
                    backdropFilter: "blur(10px)",
                    zIndex: 10, // Display over other content
                }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    opacity: opacity,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5, // Rounded button
                    width: "20px",
                    height: "50%",
                    background: "rgba(92, 94, 92, 0.4)",
                    backdropFilter: "blur(10px)",
                    zIndex: 10, // Display over other content
                }}
                onClick={onClick}
            />
        );
    }

    return (
        <div
            className="slider-container"
            onMouseEnter={() => setOpacity(1)} // On hover
            onMouseLeave={() => setOpacity(0)} // On mouse leave
        >
            <Slider {...settings}>
                {listProduct.map(item => {
                    return (
                        <div key={item.id}>
                            <div style={{ margin: 10 }}>
                                <Card item={item} />
                            </div>
                        </div>
                    );
                })}

            </Slider>
        </div>
    );
}

export default MultipleItems;
