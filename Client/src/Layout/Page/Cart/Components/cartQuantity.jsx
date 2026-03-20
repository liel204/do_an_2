import { useState } from "react"
import { useDispatch } from "react-redux"
import { getAllCart } from "../../../../redux/slices/cart/allCart"
import { updateCart } from "../../../../redux/slices/cart/updateCart"

const CartQuantity = (props) => {
    const [quantity, setQuantity] = useState(props.quantity)

    const dispatch = useDispatch()

    const handleDecrease = async () => {
        if (quantity <= 1) {
            return
        }
        await dispatch(updateCart({ id: props.id, CartItem_Quantity: quantity - 1 }))
        setQuantity(quantity - 1)
        dispatch(getAllCart())
    }

    const handleIncrease = async () => {
        await dispatch(updateCart({ id: props.id, CartItem_Quantity: quantity + 1 }))
        setQuantity(quantity + 1)
        dispatch(getAllCart())
    }

    return (
        <>
            <div className="input-group quantity mt-4" style={{ width: 100 }} >
                <div className="input-group-btn">
                    <button onClick={() => handleDecrease()} className="btn btn-sm btn-minus rounded-circle bg-light border" >
                        <i className="fa fa-minus"></i>
                    </button>
                </div>
                <input type="text" className="form-control form-control-sm text-center border-0" value={quantity} />
                <div className="input-group-btn">
                    <button onClick={() => handleIncrease()} className="btn btn-sm btn-plus rounded-circle bg-light border">
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default CartQuantity
