import { Image } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
    const navigate = useNavigate()
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <Image src="https://i.pinimg.com/236x/47/07/f4/4707f4138db3ff7930a081dc17974fd8.jpg" preview={false} />
            <h2>Your cart is empty!</h2>
            <p>Please add products to cart to continue shopping.</p>
            <button
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
                onClick={() => navigate("/")} // Điều hướng đến trang mua sắm
            >
                Back To Store
            </button>
        </div>
    );
};

export default EmptyCart;
