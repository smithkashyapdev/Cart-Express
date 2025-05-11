import { Box, Button, Container, Divider, Grid, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useLocation } from "react-router-dom";
import { addItem } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const ProductDescription = () => {
    const location = useLocation();
    const product = location.state;
    const dispatch = useDispatch();
    const [pin, setPin] = useState("");
    const [favorite, setFavorite] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d{0,6}$/.test(value)) {
            setPin(value);
        }
    };

    const handleSubmit = () => {
        alert(`Submitted PIN: ${pin}`);
    };

    const handleAddToCart = () => {
        if (product) {
            const price = parseFloat(product.price.replace("$", "")) || 0;
            dispatch(addItem({
                id: product.id,
                title: product.title,
                price: price.toFixed(2),
                img: product.img || "https://dummyimage.com/400x400",
                quantity: 1,
                desc: product.description || "No description available",
                type: product.type || "Unknown",
                discount: product.discount || 0,
            }));
        }
    };



    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Grid container spacing={4}>
                {/* Product Image */}
                <Grid item xs={12} md={6}>
                    <Box
                        component="img"
                        src={product?.img || "https://dummyimage.com/400x400"}
                        alt={product?.title || "Product Image"}
                        sx={{ width: 400, height: 400, objectFit: 'contain', borderRadius: 2 }}
                    />
                </Grid>

                {/* Product Details */}
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="gray">BRAND NAME</Typography>
                    <Typography variant="h4" fontWeight={600} gutterBottom>{product?.title || "Product Name"}</Typography>

                    {/* Ratings */}
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                        {[...Array(5)].map((_, index) => (
                            <StarIcon key={index} color={index < 4 ? "warning" : "disabled"} />
                        ))}
                        <Typography variant="body2" color="gray">4 Reviews</Typography>
                    </Box>

                    {/* Social Share */}
                    <Box display="flex" gap={1} mb={2}>
                        <IconButton><FacebookIcon /></IconButton>
                        <IconButton><TwitterIcon /></IconButton>
                        <IconButton><ShareIcon /></IconButton>
                    </Box>

                    <Typography variant="body1" color="textSecondary" mb={2}>
                        {product?.description || "Product description goes here."}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Color Options */}
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Typography>Color:</Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Box sx={{ width: 24, height: 24, bgcolor: "gray", borderRadius: "50%" }}></Box>
                            <Box sx={{ width: 24, height: 24, bgcolor: "black", borderRadius: "50%" }}></Box>
                            <Box sx={{ width: 24, height: 24, bgcolor: "blue", borderRadius: "50%" }}></Box>
                        </Box>
                    </Box>

                    {/* Size Options */}
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Typography>Size:</Typography>
                        <Select defaultValue="M" size="small">
                            <MenuItem value="SM">SM</MenuItem>
                            <MenuItem value="M">M</MenuItem>
                            <MenuItem value="L">L</MenuItem>
                            <MenuItem value="XL">XL</MenuItem>
                        </Select>
                    </Box>

                    <Typography variant="h5" fontWeight={600} mt={2}>{product?.price || "58.00"}</Typography>
                    <Box
                        display="flex"
                        alignItems="center"
                        marginTop={2}
                        justifyContent={{ xs: "center", sm: "start" }} // Center on mobile, left-align on larger screens
                        gap={2}
                        flexWrap="wrap" // Ensures wrapping on smaller screens
                    >
                        <TextField
                            label="Enter PIN Code"
                            variant="outlined"
                            value={pin}
                            onChange={handleChange}
                            inputProps={{ maxLength: 6, inputMode: "numeric", pattern: "[0-9]*" }}
                            sx={{
                                width: { xs: "100%", sm: "200px" }, // Full width on mobile, fixed width on larger screens
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={pin.length !== 6}
                            sx={{
                                width: { xs: "100%", sm: "auto" }, // Full width button on mobile
                            }}
                        >
                            Check Delivery
                        </Button>
                    </Box>

                    {/* Buttons */}
                    <Box display="flex" gap={2} mt={3}>
                        <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
                        <IconButton color="secondary">
                            <FavoriteIcon color={favorite ? "secondary" : "disabled"} onClick={() => setFavorite(!favorite)} />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};
