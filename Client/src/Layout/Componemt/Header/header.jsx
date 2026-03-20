import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, Space } from "antd";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import NavBar from "../Navigate";
import SearchInput from "./SearchInput";

import { getAllCart } from "../../../redux/slices/cart/allCart";

export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const checkLogin = localStorage.getItem("token");
    useEffect(() => {
        if (checkLogin) {
            const fetchCount = async () => {
                const data = await dispatch(getAllCart());
                setCount(data.payload.filter((i) => i.Status === "Yes").length);
            };
            fetchCount();
        }
    }, [dispatch]);

    const [scrollY, setScrollY] = useState(0);
    const [activeButton, setActiveButton] = useState(null);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const handleButtonClick = (buttonName, path) => {
        setActiveButton(buttonName);
        navigate(path);
    };

    return (
        <div
            className="pb-2"
            style={{
                background: isHomePage ? scrollY === 0 ? "none" : "#fff" : "#fff",
                position: "sticky",
                top: 0,
                zIndex: 999,
                border: isHomePage ? scrollY === 0 ? "none" : "1px solid #c0c0c0" : "1px solid #c0c0c0",
                boxShadow: isHomePage ? scrollY === 0 ? "none" : "5px 5px 15px rgba(0, 0, 0, 0.3)" : "5px 5px 15px rgba(0, 0, 0, 0.3)",
            }}
        >
            <Container>
                <Row>
                    <Col xs={2} className="d-flex align-items-center">
                        <Image
                            style={{ borderRadius: 10, cursor: "pointer", height: 50 }}
                            src="\images\Logo\logo.svg"
                            fluid
                            onClick={() => navigate("/")}
                        />
                        <span className="d-none d-lg-block" style={{ fontWeight: 700, fontSize: 19, color: isHomePage ? scrollY === 0 ? "#fff" : "#000" : "#000" }}>
                            SEAPHONEX
                        </span>
                    </Col>

                    <SearchInput />

                    <Col xs={3} className="d-flex justify-content-between align-items-center">
                        <Button
                            className="d-none d-md-block"
                            variant="outline-secondary"
                            style={{
                                height: "40px",
                                border: "none",
                                color: isHomePage ? scrollY === 0 ? "#fff" : "#000" : "#000",
                                background: activeButton === "home"
                                    ? "#c0c0c0"
                                    : (isHomePage
                                        ? (scrollY === 0 ? "none" : "#ebf0ea")
                                        : "#ebf0ea"),
                                transition: "background-color 0.3s ease",
                            }}
                            onClick={() => handleButtonClick("home", "/")}
                        >
                            <FontAwesomeIcon icon={faHouse} />
                            <span className="d-none d-lg-inline" style={{ fontWeight: "bold" }}>Home</span>
                        </Button>

                        <Button
                            variant="outline-secondary"
                            style={{
                                height: "40px",
                                border: "none",
                                color: isHomePage ? scrollY === 0 ? "#fff" : "#000" : "#000",
                                background: activeButton === "profile"
                                    ? "#c0c0c0"
                                    : (isHomePage
                                        ? (scrollY === 0 ? "none" : "#ebf0ea")
                                        : "#ebf0ea"),
                                transition: "background-color 0.3s ease",
                            }}
                            onClick={() => handleButtonClick("profile", "/profile")}
                        >
                            <FontAwesomeIcon icon={faUser} />
                            <span className="d-none d-lg-inline" style={{ fontWeight: "bold" }}>{checkLogin ? "User" : "Login"}</span>
                        </Button>

                        <Space size="large">
                            <Badge count={count} overflowCount={10}>
                                <Button
                                    variant="outline-secondary"
                                    style={{
                                        height: "40px",
                                        border: "none",
                                        color: isHomePage ? scrollY === 0 ? "#fff" : "#000" : "#000",
                                        background: activeButton === "cart"
                                            ? "#c0c0c0"
                                            : (isHomePage
                                                ? (scrollY === 0 ? "none" : "#ebf0ea")
                                                : "#ebf0ea"),
                                        transition: "background-color 0.3s ease",
                                    }}
                                    onClick={() => handleButtonClick("cart", "/cart")}
                                >
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </Button>
                            </Badge>
                        </Space>
                    </Col>
                </Row>
                <NavBar />
            </Container>
        </div>
    );
};
