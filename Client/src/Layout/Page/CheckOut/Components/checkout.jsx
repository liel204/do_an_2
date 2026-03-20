import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createOder } from "../../../../redux/slices/oder/createOder"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { updateCartStatus } from "../../../../redux/slices/cart/updateCart"
import { paymentZalo } from "../../../../redux/slices/Payment/paymentZalo"
import { addNewPayment } from "../../../../redux/slices/Payment/addnew"
import moment from "moment";

const CheckOut = () => {

    const listItemCart = useSelector(state => state.array.items)
    const listCart = useSelector(state => state.allCartStore.listcart)
    const user = useSelector(state => state.loginForReduxStore.userIsloginForRedux)
    const [listCheckout, setListCheckout] = useState([]);

    let sum = 0;
    useEffect(() => {
        listItemCart.forEach(item => {
            listCart.forEach(cart => {
                if (item === cart.id) {
                    setListCheckout(prevItems => [...prevItems, cart]);
                }
            })
        })
    }, [])

    const [fullName, setFullName] = useState(user.User_Name);
    const [numberPhone, setNumberPhone] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [specificAddress, setSpecificAddress] = useState("");
    const [note, setNote] = useState("");
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        const price = listCheckout.reduce((total, item) => total + item.TotalPriceItem, 0);
        setTotalPrice(price);
    }, [listCheckout]);

    const dispatch = useDispatch()
    const handleOrder = () => {
        if (numberPhone === "" || city === "" || fullName === "" || district === "" || specificAddress === "") {
            toast.error("Please enter all shipping information")
            return
        }
        const before = moment().format("YYMMDD").toString();
        const after = Math.floor(Math.random() * 1000000).toString();

        if (selectedOption === "option2") {
            const tmp = async () => {
                await dispatch(addNewPayment({ id: before + after, Oder_TotalPrice: totalPrice, Payment_Method: "Cash" }))
                listCheckout.forEach(item => {
                    dispatch(createOder({
                        Payment: "Cash",
                        Oder_AddressShipping: city + " " + district + " " + specificAddress,
                        FullName: fullName,
                        Phone: numberPhone,
                        Note: note,
                        CartItemID: item.id,
                        Oder_Status: "Order Pending Approval",
                        app_trans_id: before + after
                    }))
                    dispatch(updateCartStatus(item.id))
                })
            }
            tmp()
            toast.success("Order Placed Successfully")
            navigate('/oder')
        }
        if (selectedOption === "option1") {
            const temp = async () => {
                await dispatch(addNewPayment({ id: before + after, Oder_TotalPrice: totalPrice, Payment_Method: "Online" }))
                listCheckout.forEach(item => {
                    dispatch(createOder({
                        Payment: "Online",
                        Oder_AddressShipping: city + " " + district + " " + specificAddress,
                        FullName: fullName,
                        Phone: numberPhone,
                        Note: note,
                        CartItemID: item.id,
                        Oder_Status: "Order Unpaid",
                        app_trans_id: before + after
                    }))
                    dispatch(updateCartStatus(item.id))
                })
            }
            temp()

            const payZalo = async () => {
                const zalo = await dispatch(paymentZalo({ Oder_TotalPrice: totalPrice, app_trans_id: before + after }))
                if (zalo.payload.data.return_message === "Giao dịch thành công") {
                    toast.success("Transaction successful")
                    window.open(zalo.payload.data.order_url);
                } else {
                    toast.error("An error occurred")
                }
            }
            payZalo()
        }
    }

    return (
        <>
            <div className="container-fluid py-5">
                <div className="container">
                    <h1 className="mb-4">Billing Details</h1>
                    <form action="#">
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-6 col-xl-7">
                                <div className="row">
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">Full Name<sup style={{ color: "red", fontWeight: 700 }}>*</sup></label>
                                            <input type="text" onChange={(e) => setFullName(e.target.value)} value={fullName} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <div className="form-item w-100">
                                            <label className="form-label my-3">Phone Number<sup style={{ color: "red", fontWeight: 700 }}>*</sup></label>
                                            <input type="text" onChange={(e) => setNumberPhone(e.target.value)} value={numberPhone} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">City<sup style={{ color: "red", fontWeight: 700 }}>*</sup></label>
                                    <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">District<sup style={{ color: "red", fontWeight: 700 }}>*</sup></label>
                                    <input type="text" onChange={(e) => setDistrict(e.target.value)} value={district} className="form-control" />
                                </div>
                                <div className="form-item">
                                    <label className="form-label my-3">Specific Address<sup style={{ color: "red", fontWeight: 700 }}>*</sup></label>
                                    <input type="text" onChange={(e) => setSpecificAddress(e.target.value)} value={specificAddress} className="form-control" />
                                </div>
                                <hr />
                                <div className="form-item">
                                    <textarea
                                        onChange={(e) => setNote(e.target.value)} value={note}
                                        name="text"
                                        className="form-control"
                                        spellcheck="false"
                                        cols="30"
                                        rows="11"
                                        placeholder="Note"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6 col-xl-5">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Products</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listCheckout.map(item => {
                                                return (
                                                    <tr key={item.id}>
                                                        <th scope="row">
                                                            <div className="d-flex align-items-center mt-2">
                                                                <img
                                                                    src={item.image}
                                                                    className="img-fluid rounded-circle"
                                                                    style={{ width: 90, height: 90 }}
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </th>
                                                        <td className="py-5">{item.Product_Name}</td>
                                                        <td className="py-5">{Intl.NumberFormat('de-DE').format(item.option_price)}</td>
                                                        <td className="py-5">{item.CartItem_Quantity}</td>
                                                        <td className="py-5">{Intl.NumberFormat('de-DE').format(item.TotalPriceItem)}</td>
                                                    </tr>
                                                )
                                            })}
                                            <tr>
                                                <th scope="row"></th>
                                                <td className="py-5"></td>
                                                <td className="py-5"></td>
                                                <td className="py-5">
                                                    <p className="mb-0 text-dark py-3">Subtotal</p>
                                                </td>
                                                <td className="py-5">
                                                    <div className="py-3 border-bottom border-top">
                                                        <p className="mb-0 text-dark">
                                                            {Intl.NumberFormat('de-DE').format(totalPrice)}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div
                                    className="row g-4 text-center align-items-center justify-content-center border-bottom py-3"
                                >
                                    <div className="col-12">
                                        <div className="form-check text-start my-3">
                                            <input
                                                type="radio"
                                                name="options"
                                                value="option2"
                                                checked={selectedOption === "option2"}
                                                onChange={handleOptionChange}
                                            />
                                            <label className="form-check-label" htmlFor="Payments-1">Cash on Delivery</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                    <div className="col-12">
                                        <div className="form-check text-start my-3">
                                            <input
                                                type="radio"
                                                name="options"
                                                value="option1"
                                                checked={selectedOption === "option1"}
                                                onChange={handleOptionChange}
                                            />
                                            <label className="form-check-label" htmlFor="Paypal-1">Online Payment</label>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="row g-4 text-center align-items-center justify-content-center pt-4"
                                >
                                    <button
                                        onClick={() => handleOrder()}
                                        type="button"
                                        className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CheckOut
