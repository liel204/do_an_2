import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCart, getPrice } from "../../../../redux/slices/cart/allCart"
import { useNavigate } from "react-router-dom"
import CartQuantity from "./cartQuantity"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faCheck } from "@fortawesome/free-solid-svg-icons"
import { deleteCart } from "../../../../redux/slices/cart/deleteCart"
import { addItem } from "../../../../redux/slices/cart/arraySlice"
import { jwtDecode } from "jwt-decode";
import EmptyCart from "./EmptyCart"

const Cart = () => {
    const dispatch = useDispatch()
    const listcart = useSelector(state => state.allCartStore.listcart)
    const navigate = useNavigate()
    const handleDeleteCart = (id) => {
        dispatch(deleteCart({ id: id }))
            .then(() => {
                dispatch(getAllCart());
            })
    }

    const [listSelect] = useState([])
    const [sumPrice, setsumPrice] = useState(0)

    const [btnAll, setBtnAll] = useState('Select All')
    const hanldeSelectAll = async (listCart) => {
        if (btnAll === 'Select All') {
            listCart.forEach(item => {
                if (item.UserID === jwtDecode(localStorage.getItem("token")).id && item.Status === 'Yes') {
                    if (!listSelect.includes(item.id)) {
                        listSelect.push(item.id)
                    }
                }
            })
            let tmpSUM = 0
            listSelect.forEach(async (item) => {
                const tmp = await dispatch(getPrice(item))
                tmpSUM += tmp.payload.data.data[0].TotalPriceItem
                setsumPrice(tmpSUM)
            })
            setBtnAll('Deselect All')
        }
        else {
            setsumPrice(0)
            while (listSelect.length > 0) {
                listSelect.pop();
            }
            setBtnAll('Select All')
        }
    }

    const style = "text-danger btn  bg-warning border mt-4"
    const style1 = " btn btn-md  bg-light border mt-4"

    const handleSelectionCart = async (id) => {
        const check = await listSelect.find(obj => {
            return obj === id
        })
        if (check === undefined) {
            await listSelect.push(id)
            listSelect.forEach(async (item) => {
                const tmp = await dispatch(getPrice(item))
                setsumPrice(sumPrice + tmp.payload.data.data[0].TotalPriceItem)
            })
        }
        else {
            const tmp = await dispatch(getPrice(id))
            setsumPrice(sumPrice - tmp.payload.data.data[0].TotalPriceItem)

            for (let i = 0; i < listSelect.length; i++) {
                if (listSelect[i] === id) {
                    for (let j = i; j < listSelect.length; j++) {
                        listSelect[j] = listSelect[j + 1]
                    }
                    listSelect.pop()
                    break
                }
            }
        }
        dispatch(getAllCart())
    }

    useEffect(() => {
        dispatch(getAllCart())
    }, [dispatch])

    const listItemCart = useSelector(state => state.array.items)

    const handleCheckout = async (id) => {
        dispatch(addItem(id));
        navigate('/checkout')
    }

    const handleCheckoutAll = async () => {
        listSelect.forEach(item => {
            let check = 0;
            listItemCart.forEach(ele => {
                if (ele === item) {
                    check = 1
                }
            })
            if (check === 0) {
                dispatch(addItem(item));
            }
        })
        navigate('/checkout')
    }

    return (
        <>
            {listcart.some(item => item.Status === "Yes") ?
                <div className="container-fluid py-5">
                    <div className="container">
                        <div className="table-responsive">
                            <button onClick={() => hanldeSelectAll(listcart)} className={btnAll === 'Select All' ? style1 : style}>{btnAll}</button>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Products</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Details</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listcart.map((item) => {
                                            return (
                                                <>
                                                    {item.Status === "Yes" &&
                                                        <tr key={item.id} >
                                                            <th scope="row">
                                                                <div className="d-flex align-items-center">
                                                                    <img src={item.image} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt={item.Product_Name} />
                                                                </div>
                                                            </th>
                                                            <td>
                                                                <p className="mb-0 mt-4">{item.Product_Name}</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 mt-4">{item.color} - {item.memory}</p>
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 mt-4">{Intl.NumberFormat('de-DE').format(item.option_price)}</p>
                                                            </td>
                                                            <td>
                                                                <CartQuantity id={item.id} quantity={item.CartItem_Quantity} />
                                                            </td>
                                                            <td>
                                                                <p className="mb-0 mt-4">{Intl.NumberFormat('de-DE').format(item.TotalPriceItem)}</p>
                                                            </td>
                                                            <td className="cart-actions">
                                                                <button onClick={() => handleDeleteCart(item.id)} className="btn btn-md rounded-circle bg-light border mt-4">
                                                                    <i className="fa fa-times text-danger"></i>
                                                                </button>
                                                                <button onClick={() => handleSelectionCart(item.id)} className={listSelect.find(obj => { return obj === item.id }) ? style + " rounded-circle" : style1 + " rounded-circle"}>
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </button>
                                                                <button onClick={() => handleCheckout(item.id)} className="btn btn-md rounded-circle bg-light border mt-4">
                                                                    <FontAwesomeIcon icon={faCartShopping} className="text-primary" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-5">
                        </div>
                        <div className="row g-4 justify-content-end">
                            <div className="col-8"></div>
                            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                                <div className="bg-light rounded">
                                    <div className="p-4">
                                        <h1 className="display-6 mb-4">Shopping Cart</h1>
                                        <div className="d-flex justify-content-between mb-4">
                                            <h5 className="mb-0 me-4">Subtotal:</h5>
                                            <p className="mb-0">
                                                {Intl.NumberFormat('de-DE').format(sumPrice)}
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <h5 className="mb-0 me-4">Shipping</h5>
                                            <div className="">
                                                <p className="mb-0">Free Shipping</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                        <h5 className="mb-0 ps-4 me-4">Total</h5>
                                        <p className="mb-0 pe-4">
                                            {Intl.NumberFormat('de-DE').format(sumPrice)}
                                        </p>
                                    </div>
                                    <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button"
                                        onClick={() => handleCheckoutAll()}
                                    >
                                        BUY ALL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                :
                <EmptyCart />
            }
        </>
    )
}

export default Cart
