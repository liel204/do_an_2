import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axios from "axios";
import { Box, Button, FormControl, Grid, TextField } from "@mui/material";

const App = (props) => {
    const [data, setData] = useState([]);

    const [userId, setUserId] = useState(props?.userId || null);
    const [paymentId, setPaymentId] = useState(null);
    const handleSubmit = () => {
        fetchData();
    };

    const fetchData = async () => {
        try {
            const response = await
                axios.get(paymentId === "" ?
                    `http://localhost:8000/api/AdminStatisticalRouter/supportUserTable?userId=${userId}` :
                    `http://localhost:8000/api/AdminStatisticalRouter/supportUserTable?userId=${userId}&paymentId=${paymentId}`);
            setData(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (props.userId !== userId) {
            setUserId(props.userId);
            setPaymentId("");
        }
        if (userId !== null) {
            fetchData();
        }
    }, [props.userId, userId]);

    const columns = [
        {
            title: "User ID",
            dataIndex: "UserID",
            key: "UserID",
        },
        {
            title: "User Name",
            dataIndex: "User_Name",
            key: "User_Name",
        },
        {
            title: "User Email",
            dataIndex: "User_Email",
            key: "User_Email",
        },
        {
            title: "Payment ID",
            dataIndex: "PaymentID",
            key: "PaymentID",
        },
        {
            title: "Payment Method",
            dataIndex: "Payment_Method",
            key: "Payment_Method",
        },
        {
            title: "Total Price",
            dataIndex: "Oder_TotalPrice",
            key: "Oder_TotalPrice",
            render: (price) => `${price.toLocaleString()} VND`,
        },
        {
            title: "Order Status",
            dataIndex: "Oder_Status",
            key: "Oder_Status",
        },
        {
            title: "Created At Payment",
            dataIndex: "Payment_CreatedAt",
            key: "Payment_CreatedAt",
            render: (date) => new Date(date).toLocaleString("en-US"),
        },
    ];

    return (
        <>
            <Box sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <TextField
                                value={userId}
                                fullWidth
                                disabled
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="Payment ID"
                                variant="outlined"
                                value={paymentId}
                                onChange={(e) => setPaymentId(e.target.value)}
                                fullWidth
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit Data
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="PaymentID"
                pagination={{ pageSize: 10 }}
            />
        </>
    );
};

export default App;
