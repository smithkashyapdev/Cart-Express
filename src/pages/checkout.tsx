import { Container, TextField, Button, Typography, Grid, Paper, Alert, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY

const stripePromise = loadStripe(stripeKey);

const Checkout = () => {
    const [form, setForm] = useState({ name: "", address: "", pin: "" });
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // Get cart items from Redux store
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    // Simulate user authentication check
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleStripePayment = async () => {
        const { data } = await axios.post("/api/stripe/create-payment-intent", {
            amount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100,
        });

        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
    };

    const handleRazorpayPayment = async () => {
        const { data } = await axios.post("/api/razorpay/create-order", {
            amount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100,
        });

        const options = {
            key: "your-razorpay-key-id",
            amount: data.amount,
            currency: "INR",
            order_id: data.id,
            handler: (response) => {
                alert("Payment Successful");
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom align="center">
                Checkout
            </Typography>

            {!isAuthenticated ? (
                <Alert severity="warning" sx={{ mb: 3, textAlign: "center" }}>
                    You must be logged in to complete the checkout. Please <strong>log in</strong> to continue.
                </Alert>
            ) : (
                <Grid container spacing={3} justifyContent="center">
                    {/* Order Summary */}
                    <Grid item xs={12} sm={10} md={4}>
                        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            <List>
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <div key={item.id}>
                                            <ListItem>
                                                <ListItemText primary={item.title} secondary={`$${item.price} x ${item.quantity}`} />
                                            </ListItem>
                                            <Divider />
                                        </div>
                                    ))
                                ) : (
                                    <Typography variant="body1" textAlign="center">
                                        Your cart is empty.
                                    </Typography>
                                )}
                            </List>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Total: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Billing Details */}
                    <Grid item xs={12} sm={10} md={4}>
                        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
                            <Typography variant="h6" gutterBottom>
                                Billing Details
                            </Typography>
                            <TextField fullWidth label="Full Name" name="name" variant="outlined" value={form.name} onChange={handleChange} sx={{ mb: 2 }} />
                            <TextField fullWidth label="Address" name="address" variant="outlined" multiline rows={3} value={form.address} onChange={handleChange} sx={{ mb: 2 }} />

                            <TextField fullWidth label="PIN Code" name="pin" variant="outlined" value={form.pin} onChange={handleChange} inputProps={{ maxLength: 6, inputMode: "numeric", pattern: "[0-9]*" }} sx={{ mb: 2 }} />
                        </Paper>
                    </Grid>

                    {/* Payment Options */}
                    <Grid item xs={12} sm={10} md={4}>
                        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
                            <Typography variant="h6" gutterBottom>
                                Payment Options
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleStripePayment}
                                disabled={!form.name || !form.address || !form.pin || cartItems.length === 0}
                                sx={{ mb: 2 }}
                            >
                                Pay with Stripe
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={handleRazorpayPayment}
                                disabled={!form.name || !form.address || !form.pin || cartItems.length === 0}
                            >
                                Pay with Razorpay
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default Checkout;
