import { Image } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyOder = () => {
    const navigate = useNavigate()
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <Image src="https://i.pinimg.com/236x/e5/55/87/e55587d66eb7b637fc19ff959a6b04ab.jpg" preview={false} />
            <h2>Your Order Is Empty!</h2>
            <button
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    margin: 5
                }}
                onClick={() => navigate("/")} // Điều hướng đến trang mua sắm
            >
                Back To Store
            </button>
            <button
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    margin: 5
                }}
                onClick={() => navigate("/cart")} // Điều hướng đến trang mua sắm
            >
                Back To Cart
            </button>
        </div>
    );
};

export default EmptyOder;
