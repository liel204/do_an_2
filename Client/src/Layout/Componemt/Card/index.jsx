import { useNavigate } from 'react-router-dom';
import { createCart } from '../../../redux/slices/cart/createCart';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllMemory } from '../../../redux/slices/option/getAllMemory';
import { getAllColor } from '../../../redux/slices/option/getAllColor';
import { getImageWithColor } from '../../../redux/slices/option/getImageWithColor';

function BasicExample(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const hanlerAddCart = async (ProductID) => {
        const checkLogin = localStorage.getItem("token");
        !checkLogin && navigate(`/login`)
        const data = await dispatch(createCart({ CartItem_Quantity: 1, ProductID: ProductID, ColorID: ColorID, MemoryID: MemoryID }))
        if (data.payload === "Create successful") {
            navigate(`/cart`)
        }
    }

    const handleDetailProduct = (id) => {
        navigate(`/detail/${id}`)
    }
    const [ColorID, setColorID] = useState("")
    const [MemoryID, setMemoryID] = useState("")
    const [image, setImage] = useState("")

    useEffect(() => {
        const fetchal = async () => {
            const data = await dispatch(getAllMemory(props.item.id))
            setMemoryID(data.payload[0].id)
            return data.payload[0].memory
        }
        fetchal()
        const fetchColor = async () => {
            const data = await dispatch(getAllColor(props.item.id))
            setColorID(data.payload[0].id)
            return data.payload[0].id
        }
        const fetchImage = async () => {
            const data = await dispatch(getImageWithColor({ id: await fetchColor() }))
            setImage(data.payload[0].image)
        }
        fetchImage()
    }, [props.item]);

    return (
        <>
            <div className="rounded position-relative fruite-item" style={{ border: "none", borderRadius: 10 }}>
                <div className="fruite-img" onClick={() => handleDetailProduct(props.item.id)}>
                    <img
                        style={{
                            height: "350px",
                            objectFit: "cover",
                        }}
                        src={image}
                        className="img-fluid w-100 rounded-top"
                        alt={`hình ${props.item.Product_Name}`}
                    />
                </div>
                <div
                    className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                    style={{ top: "10px", left: "10px", fontWeight: 550 }}>
                    {props.item.Category_Name}
                </div>
                <div className="p-4 border-top rounded-bottom" style={{ background: "#fff" }}>
                    <h4 style={{ fontWeight: 600 }}> {props.item.Product_Name}</h4>
                    <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">
                            {Intl.NumberFormat('de-DE').format(props.item.lowest_option_price)}
                        </p>
                        <button onClick={() => hanlerAddCart(props.item.id)} className="btn border border-secondary rounded-pill px-3 text-primary">
                            <i className="fa fa-shopping-bag me-2 text-primary"></i>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}

export default BasicExample;