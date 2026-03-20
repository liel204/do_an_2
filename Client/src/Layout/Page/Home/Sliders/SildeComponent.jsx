import React, { useEffect, useState } from "react";
import { Image } from "antd";
import Slider from "react-slick";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function CustomArrows() {

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
        dots: true,
        infinite: true,
        slidesToShow: slidesToShowNumber,
        speed: 500,
        autoplaySpeed: 2000,
        autoplay: true,
        cssEase: "linear",
        slidesToScroll: slidesToShowNumber,
        centerPadding: "40px",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <div style={{ margin: "6.6rem 1rem" }}>
            <Slider {...settings}>
                <div style={{ borderRadius: 20, margin: 50 }}>
                    <Image
                        style={{ borderRadius: 20, padding: 5 }}
                        src="\images\Banner\banner1.jpg"
                        preview={true}
                        width={'100%'}
                        height={300}
                    />
                </div>
                <div style={{ borderRadius: 20, margin: 50 }}>
                    <Image
                        style={{ borderRadius: 20, padding: 5 }}
                        src="\images\Banner\banner2.jpg"
                        preview={true}
                        width={'100%'}
                        height={300}
                    />
                </div>
                <div style={{ borderRadius: 20, margin: 50 }}>
                    <Image
                        style={{ borderRadius: 20, padding: 5 }}
                        src="\images\Banner\banner3.jpg"
                        preview={true}
                        width={'100%'}
                        height={300}
                    />
                </div>
                <div style={{ borderRadius: 20, margin: 50 }}>
                    <Image
                        style={{ borderRadius: 20, padding: 5 }}
                        src="\images\Banner\banner4.jpg"
                        preview={true}
                        width={'100%'}
                        height={300}
                    />
                </div>
                <div style={{ borderRadius: 20, margin: 50 }}>
                    <Image
                        style={{ borderRadius: 20, padding: 5 }}
                        src="\images\Banner\banner5.jpg"
                        preview={true}
                        width={'100%'}
                        height={300}
                    />
                </div>
                <div style={{ borderRadius: 20, margin: 50 }}>
                    <Image
                        style={{ borderRadius: 20, padding: 5 }}
                        src="\images\Banner\banner6.jpg"
                        preview={true}
                        width={'100%'}
                        height={300}
                    />
                </div>
                <div style={{ borderRadius: 20, margin: 50 }}>
                    <Image
                        style={{ borderRadius: 20, padding: 5 }}
                        src="\images\Banner\banner7.jpg"
                        preview={true}
                        width={'100%'}
                        height={300}
                    />
                </div>
                <div style={{ borderRadius: 20, margin: 50 }}>
                    <Image
                        style={{ borderRadius: 20, padding: 5 }}
                        src="\images\Banner\banner8.jpg"
                        preview={true}
                        width={'100%'}
                        height={300}
                    />
                </div>
            </Slider>
        </div>
    );
}

export default CustomArrows;
