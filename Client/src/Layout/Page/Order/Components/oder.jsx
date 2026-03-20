import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Image } from "antd";
import { getAllOder } from "../../../../redux/slices/oder/allOder";
import EmptyOder from "./EmptyOrder";
import { toast } from "react-toastify";
import axios from "axios";

const Order = () => {
    const dispatch = useDispatch();
    const listOrder = useSelector((state) => state.allOderStore.listoder);

    useEffect(() => {
        dispatch(getAllOder());
    }, [dispatch]);

    const handlePayPal = async (record) => {
        toast.warning("Your order has expired. Please send the transaction code to us for support.");
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/OderRouter/deleteObj?id=${id}`);
            if (response.data.message) {
                toast.success("Success");
                dispatch(getAllOder());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const columns = [
        {
            dataIndex: "image",
            key: "image",
            render: (image) => (
                <Image src={image} alt="product" width={80} height={80} />
            ),
        },
        {
            title: "Product Name",
            dataIndex: "Product_Name",
            key: "Product_Name",
        },
        {
            title: "Product Details",
            key: "details",
            render: (_, record) => (
                <span>
                    {record.color} - {record.memory}
                </span>
            ),
        },
        {
            title: "Product Price",
            dataIndex: "option_price",
            key: "option_price",
        },
        {
            title: "Quantity",
            dataIndex: "CartItem_Quantity",
            key: "CartItem_Quantity",
        },
        {
            title: "Total Order Price",
            dataIndex: "Oder_TotalPrice",
            key: "Oder_TotalPrice",
        },
        {
            title: "Order Status",
            dataIndex: "Oder_Status",
            key: "Oder_Status",
        },
        {
            title: "App Transaction ID",
            dataIndex: "app_trans_id",
            key: "app_trans_id",
        },
        {
            title: "Actions",
            key: "action",
            render: (_, record) => (
                <>
                    {record.Oder_Status === "Order Unpaid" && (
                        <Button
                            type="primary"
                            className="mt-2"
                            onClick={() => handlePayPal(record)}
                        >
                            Pay Order
                        </Button>
                    )}
                    {record.Oder_Status === "Paid Online" && (
                        <>
                            <Button
                                danger
                                className="mt-2"
                                onClick={() => handleDelete(record.id)}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                    {record.Oder_Status === "Order Pending Approval" && (
                        <>
                            <Button
                                danger
                                className="mt-2"
                                onClick={() => handleDelete(record.id)}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                    {record.Oder_Status === "Order Delivered Successfully" && (
                        <>
                            <Button
                                danger
                                className="mt-2"
                                onClick={() => handleDelete(record.id)}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </>
            ),
        },
    ];

    return (
        <>
            {listOrder.length === 0 ? (
                <EmptyOder />
            ) : (
                <div className="container-fluid py-5">
                    <div className="container">
                        <Table
                            dataSource={listOrder}
                            columns={columns}
                            pagination={{
                                pageSize: 5,
                            }}
                            scroll={{ x: 600 }}
                            responsive={true}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Order;
