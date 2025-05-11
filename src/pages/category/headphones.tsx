import { Container, Card, CardMedia, CardContent, Typography, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 401, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/7/a/8/bullets-wireless-z2-oneplus-original-imagpgskyzj6zhte.jpeg?q=70", title: "OnePlus Bullets Wireless Z2", desc: "High bass Bluetooth earphones with fast charging.", price: "$50", type: "Wireless", discount: "10%" },
  { id: 402, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/7/a/8/bullets-wireless-z2-oneplus-original-imagpgskyzj6zhte.jpeg?q=70", title: "Sony WH-1000XM4", desc: "Industry-leading noise cancellation headphones.", price: "$300", type: "Over-Ear", discount: "15%" },
  { id: 403, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/7/a/8/bullets-wireless-z2-oneplus-original-imagpgskyzj6zhte.jpeg?q=70", title: "Bose QuietComfort 45", desc: "Premium comfort with crystal-clear sound.", price: "$280", type: "Over-Ear", discount: "12%" },
  { id: 404, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/7/a/8/bullets-wireless-z2-oneplus-original-imagpgskyzj6zhte.jpeg?q=70", title: "JBL Tune 760NC", desc: "Powerful bass with active noise cancellation.", price: "$120", type: "Over-Ear", discount: "10%" },
  { id: 405, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/7/a/8/bullets-wireless-z2-oneplus-original-imagpgskyzj6zhte.jpeg?q=70", title: "Boat Rockerz 450", desc: "Stylish wireless headphones with long battery life.", price: "$40", type: "On-Ear", discount: "8%" },
  { id: 406, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/7/a/8/bullets-wireless-z2-oneplus-original-imagpgskyzj6zhte.jpeg?q=70", title: "Sennheiser HD 450BT", desc: "High-fidelity sound with deep bass.", price: "$180", type: "Over-Ear", discount: "10%" },
  { id: 407, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/7/a/8/bullets-wireless-z2-oneplus-original-imagpgskyzj6zhte.jpeg?q=70", title: "Beats Studio 3", desc: "Premium wireless headphones with noise isolation.", price: "$250", type: "Over-Ear", discount: "15%" },
  { id: 408, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/7/a/8/bullets-wireless-z2-oneplus-original-imagpgskyzj6zhte.jpeg?q=70", title: "Realme Buds Wireless 2", desc: "Lightweight wireless earphones with deep bass.", price: "$45", type: "Neckband", discount: "7%" },
  { id: 409, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/7/a/8/bullets-wireless-z2-oneplus-original-imagpgskyzj6zhte.jpeg?q=70", title: "Samsung Galaxy Buds 2 Pro", desc: "True wireless earbuds with 360° audio.", price: "$150", type: "TWS", discount: "10%" },
  { id: 410, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/7/a/8/bullets-wireless-z2-oneplus-original-imagpgskyzj6zhte.jpeg?q=70", title: "Anker Soundcore Life Q30", desc: "Budget-friendly ANC headphones with deep bass.", price: "$100", type: "Over-Ear", discount: "12%" },
  { id: 411, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/7/a/8/bullets-wireless-z2-oneplus-original-imagpgskyzj6zhte.jpeg?q=70", title: "Marshall Major IV", desc: "Iconic design with premium audio performance.", price: "$170", type: "On-Ear", discount: "5%" },
  { id: 412, img: "https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/7/a/8/bullets-wireless-z2-oneplus-original-imagpgskyzj6zhte.jpeg?q=70", title: "HyperX Cloud II", desc: "Gaming headset with immersive 7.1 surround sound.", price: "$90", type: "Over-Ear", discount: "8%" }
];





export function Headphones() {

  const navigate = useNavigate()

  const onhandleTap = (id: number) => {
    navigate(`/product/${id}`, { state: products.find((p) => p.id === id) });
  }


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid2
        container
        spacing={3}
        justifyContent="center" // ✅ Centers the whole grid
      >
        {products.map((product) => (
          <Grid2
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            display="flex"
            justifyContent="center" // ✅ Ensures alignment
          >
            <Card sx={{ width: 300, maxWidth: 280, boxShadow: 2, borderRadius: 2, cursor: 'pointer' }} onClick={() => onhandleTap(product.id)}>
              <CardMedia
                component="img"
                image={product.img}
                alt={product.title}
                sx={{
                  width: "100%",  // Ensures full width
                  height: 300,    // Adjust height as needed
                  objectFit: 'fill',  // Fills the container while cropping excess parts
                  borderRadius: "4px"
                }}
              />

              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" fontWeight="bold">{product.title}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>{product.desc}</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}><b>Size:</b> {product.size}</Typography>
                <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}><b>Price:</b> {product.price}</Typography>
                <Typography variant="body2" color="error" sx={{ mt: 1 }}><b>Discount:</b> {product.discount} OFF</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}
