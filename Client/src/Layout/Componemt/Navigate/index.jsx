import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCategory } from "../../../redux/slices/category/allCaterogy";

const Nav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(state => state.allCategoryStore.listcategory);
    const location = useLocation();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const [scrollY, setScrollY] = useState(0);
    const [hoveredStates, setHoveredStates] = useState({});

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const isHomePage = location.pathname === "/";

    const handleMouseEnter = (id) => {
        setHoveredStates(prevState => ({
            ...prevState,
            [id]: true
        }));
    };

    const handleMouseLeave = (id) => {
        setHoveredStates(prevState => ({
            ...prevState,
            [id]: false
        }));
    };

    return (
        <div style={{ background: "none", borderRadius: 9 }}>
            {data.map(item => {
                const isActive = location.pathname === `/category/${item.id}`;

                return (
                    <Button
                        key={item.id}
                        variant="outline-secondary"
                        style={{
                            margin: "1px 5px 0px 5px",
                            padding: "2px 5px",
                            border: "none",
                            color: isActive
                                ? "#fff"
                                : isHomePage && scrollY === 0
                                    ? "#fff"
                                    : "#000",
                            background: isActive
                                ? "#007bff"
                                : hoveredStates[item.id]
                                    ? "#c0c0c0"
                                    : (isHomePage
                                        ? (scrollY === 0 ? "none" : "#ebf0ea")
                                        : "#ebf0ea"),
                            transition: "background-color 0.3s ease, color 0.3s ease",
                        }}
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={() => handleMouseLeave(item.id)}
                        onClick={() => navigate(`/category/${item.id}`)}
                    >
                        <span style={{ fontWeight: "567" }}>{item.Category_Name}</span>
                    </Button>
                );
            })}
        </div>
    );
};

export default Nav;
