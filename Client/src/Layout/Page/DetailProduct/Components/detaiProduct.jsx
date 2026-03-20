import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCart } from "../../../../redux/slices/cart/createCart";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getPriceWithMemory } from "../../../../redux/slices/option/getPriceWithMemory";
import { getDetailProduct } from "../../../../redux/slices/product/detailProduct";
import { getAllMemory } from "../../../../redux/slices/option/getAllMemory";
import { getAllColor } from "../../../../redux/slices/option/getAllColor";
import { getImageWithColor } from "../../../../redux/slices/option/getImageWithColor";
import Tablecomnet from "./tableComent";
import { createComent } from "../../../../redux/slices/coment/createComent";
import { toast } from "react-toastify";
import { getAllComent } from "../../../../redux/slices/coment/allComent";
import { Image } from "antd";

const Detail = () => {
    const product = useSelector((state) => state.detailProductStore.product);
    const listCategory = useSelector((state) => state.allCategoryStore.listcategory);
    const allMemory = useSelector((state) => state.getAllMemoryStore.listoption);
    const allColor = useSelector((state) => state.getAllColorStore.listoption);

    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");

    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [selectedColorID, setSelectedColorID] = useState(null);
    const [selectedMemoryID, setSelectedMemoryID] = useState(null);
    const [dataComnet, setdataComnet] = useState([]);

    const handleAddToCart = async () => {
        const checkLogin = localStorage.getItem("token");
        !checkLogin && navigate(`/login`)
        const data = await dispatch(
            createCart({
                CartItem_Quantity: quantity,
                ProductID: product.id,
                ColorID: selectedColorID,
                MemoryID: selectedMemoryID,
            })
        );
        if (data.payload === "Create successful") {
            navigate(`/cart`);
        }
    };

    const handleDetailColorProduct = async (id) => {
        setSelectedColorID(id);
        const data = await dispatch(getImageWithColor({ id: id }));
        setImage(data.payload[0].image);
    };

    const handleDetailMemoryProduct = async (id) => {
        setSelectedMemoryID(id);
        const data = await dispatch(getPriceWithMemory({ id: id }));
        setPrice(data.payload[0].option_price);
    };

    useEffect(() => {
        dispatch(getDetailProduct(id));
        dispatch(getAllMemory(id));
        dispatch(getAllColor(id));

        const fetchPrice = async () => {
            const temp = await dispatch(getAllMemory(id));
            setSelectedMemoryID(temp.payload[0].id);
            setPrice(temp.payload[0].option_price);
        };
        fetchPrice();

        const fetchImage = async () => {
            const data = await dispatch(getAllColor(id));
            setSelectedColorID(data.payload[0].id);
            setImage(data.payload[0].image);
        };
        fetchImage();
    }, [id]);

    useEffect(() => {
        const fetchComments = async () => {
            const temp = await dispatch(getAllComent(id));
            setdataComnet(temp.payload.data.data);
        };
        fetchComments();
    }, [id]);

    const [comment, setComment] = useState("");
    const handlePostComment = async (event) => {
        const checkLogin = localStorage.getItem("token");
        if (checkLogin) {
            event.preventDefault();
            const temp = await dispatch(createComent({ Value: comment, ProductID: id }));
            if (temp.payload.data.message === "Create successful") {
                toast.success(temp.payload.data.message);
                setComment("");
            }
            const fetchComments = async () => {
                const temp = await dispatch(getAllComent(id));
                setdataComnet(temp.payload.data.data);
            };
            fetchComments();
        }
        else {
            navigate(`/login`)
        }
    };

    const [heightImage, setHeightImage] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setHeightImage(false);
            } else if (window.innerWidth <= 768) {
                setHeightImage(false);
            } else {
                setHeightImage(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className="container-fluid pt-5">
                <div className="container">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-8 col-xl-9">
                            <div className="row g-4">
                                <div className="col-12 col-md-6">
                                    <div className=" rounded">
                                        <Image
                                            src={image}
                                            className="img-fluid rounded"
                                            alt="Product"
                                            style={{
                                                objectFit: "cover",
                                                width: "100%",
                                                ...(heightImage && { height: "450px" })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 ">
                                    <h4 className="fw-bold mb-3">{product.Product_Name}</h4>
                                    <p className="mb-3">Category: <span style={{ fontWeight: 550 }}>{product.Category_Name}</span></p>
                                    <h5 className="fw-bold mb-3">
                                        {Intl.NumberFormat("de-DE").format(price)}
                                    </h5>
                                    <p className="mb-4">
                                        Color:
                                        {allColor.map((item) => (
                                            <Button
                                                key={item.id}
                                                onClick={() => handleDetailColorProduct(item.id)}
                                                style={{
                                                    marginRight: 12,
                                                    backgroundColor: selectedColorID === item.id ? "#007bff" : "#ebf0ea",
                                                    color: selectedColorID === item.id ? "#fff" : "#000",
                                                    border: "1px solid #ddd",
                                                }}
                                            >
                                                {item.color}
                                            </Button>
                                        ))}
                                    </p>
                                    <p className="mb-4">
                                        Memory:
                                        {allMemory.map((item) => (
                                            <Button
                                                key={item.id}
                                                onClick={() => handleDetailMemoryProduct(item.id)}
                                                style={{
                                                    marginRight: 12,
                                                    backgroundColor: selectedMemoryID === item.id ? "#007bff" : "#ebf0ea",
                                                    color: selectedMemoryID === item.id ? "#fff" : "#000",
                                                    border: "1px solid #ddd",
                                                }}
                                            >
                                                {item.memory}
                                            </Button>
                                        ))}
                                    </p>
                                    <div className="input-group quantity mb-5" style={{ width: "100px" }}>
                                        <div className="input-group-btn">
                                            <button
                                                onClick={() => {
                                                    setQuantity(quantity - 1);
                                                }}
                                                className="btn btn-sm btn-minus rounded-circle bg-light border"
                                            >
                                                <i className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm text-center border-0"
                                            value={quantity > 0 ? quantity : 1}
                                            readOnly
                                        />
                                        <div className="input-group-btn">
                                            <button
                                                onClick={() => {
                                                    setQuantity(quantity + 1);
                                                }}
                                                className="btn btn-sm btn-plus rounded-circle bg-light border"
                                            >
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                                    >
                                        <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                                    </button>
                                </div>
                                <div className="col-lg-12">
                                    <div className="nav nav-tabs mb-3">
                                        <button className="nav-link active" type="button" data-bs-toggle="tab" data-bs-target="#nav-about">
                                            Description
                                        </button>
                                    </div>
                                    <div className="tab-content mb-5">
                                        <div style={{ background: "#ffffff", borderRadius: 5 }} className="tab-pane fade show active" id="nav-about">
                                            <p>
                                                {product.Product_Description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="nav nav-tabs mb-3">
                                        <button className="nav-link" type="button" data-bs-toggle="tab" data-bs-target="#nav-reviews">
                                            Reviews
                                        </button>
                                    </div>
                                    <Tablecomnet data={dataComnet} />
                                    <form>
                                        <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                                        <div className="row g-4">
                                            <div className="col-lg-12">
                                                <div className="border-bottom rounded my-4">
                                                    <textarea
                                                        onChange={(e) => setComment(e.target.value)}
                                                        value={comment}
                                                        className="form-control border-0"
                                                        cols="30"
                                                        rows="8"
                                                        placeholder="Your Review *"
                                                        spellCheck="false"
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="d-flex justify-content-between py-3 mb-5">
                                                    <button
                                                        onClick={handlePostComment}
                                                        className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                                                    >
                                                        Post Comment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3">
                            <div className="row g-4 fruite">
                                <div className="col-lg-12">
                                    <div className="mb-4">
                                        <h4>Categories</h4>
                                        <ul className="list-unstyled fruite-categorie">
                                            {listCategory.map((category) => (
                                                <li key={category.Category_Name}>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        {category.Category_Name}
                                                        <span>{category.product_count}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Detail;
