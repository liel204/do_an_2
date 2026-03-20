import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, Grid, TextField } from "@mui/material";

const App = ({ userIdCHA, ChilduserId, ChildpaymentId }) => {

    const [userId, setUserId] = useState(userIdCHA || null);
    const [paymentId, setPaymentId] = useState(null);
    const handleSubmit = () => {
        alert(userId, paymentId)
    };
    return (
        <>
            <Box sx={{ padding: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="userId"
                                variant="outlined"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                fullWidth
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <TextField
                                label="paymentId"
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
                                Send Data
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default App;
