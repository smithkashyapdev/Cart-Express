import { Container, Card, CardMedia, CardContent, Typography, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 301, img: "https://rukminim2.flixcart.com/image/612/612/klfhk7k0/glass/m/7/i/430-ml-mason-glass-jar-mug-with-straw-2-pcs-arudha-creations-original-imagyjwjhbvzdvhg.jpeg?q=70", title: "Mason Jar Mug", desc: "Trendy mason jar mug with a straw for beverages.", price: "$10", capacity: "430ml", discount: "10%" },
  { id: 302, img: "https://rukminim2.flixcart.com/image/612/612/klfhk7k0/glass/m/7/i/430-ml-mason-glass-jar-mug-with-straw-2-pcs-arudha-creations-original-imagyjwjhbvzdvhg.jpeg?q=70", title: "Classic Coffee Mug", desc: "Ceramic coffee mug for your morning brew.", price: "$8", capacity: "300ml", discount: "15%" },
  { id: 303, img: "https://rukminim2.flixcart.com/image/612/612/klfhk7k0/glass/m/7/i/430-ml-mason-glass-jar-mug-with-straw-2-pcs-arudha-creations-original-imagyjwjhbvzdvhg.jpeg?q=70", title: "Printed Tea Mug", desc: "Beautifully printed ceramic mug for tea lovers.", price: "$12", capacity: "350ml", discount: "20%" },
  { id: 304, img: "https://rukminim2.flixcart.com/image/612/612/klfhk7k0/glass/m/7/i/430-ml-mason-glass-jar-mug-with-straw-2-pcs-arudha-creations-original-imagyjwjhbvzdvhg.jpeg?q=70", title: "Gift Mug", desc: "Perfect for gifting with a premium feel.", price: "$14", capacity: "300ml", discount: "10%" },
  { id: 305, img: "https://rukminim2.flixcart.com/image/612/612/klfhk7k0/glass/m/7/i/430-ml-mason-glass-jar-mug-with-straw-2-pcs-arudha-creations-original-imagyjwjhbvzdvhg.jpeg?q=70", title: "Funny Quote Mug", desc: "Start your day with a laugh with this quote mug.", price: "$9", capacity: "325ml", discount: "5%" },
  { id: 306, img: "https://rukminim2.flixcart.com/image/612/612/klfhk7k0/glass/m/7/i/430-ml-mason-glass-jar-mug-with-straw-2-pcs-arudha-creations-original-imagyjwjhbvzdvhg.jpeg?q=70", title: "Black Coffee Mug", desc: "Minimalist black mug for a stylish look.", price: "$11", capacity: "315ml", discount: "12%" },
  { id: 307, img: "https://rukminim2.flixcart.com/image/612/612/klfhk7k0/glass/m/7/i/430-ml-mason-glass-jar-mug-with-straw-2-pcs-arudha-creations-original-imagyjwjhbvzdvhg.jpeg?q=70", title: "Set of 6 Mugs", desc: "Pack of 6 printed ceramic mugs for family use.", price: "$30", capacity: "250ml each", discount: "18%" },
  { id: 308, img: "https://rukminim2.flixcart.com/image/612/612/klfhk7k0/glass/m/7/i/430-ml-mason-glass-jar-mug-with-straw-2-pcs-arudha-creations-original-imagyjwjhbvzdvhg.jpeg?q=70", title: "Glass Mug with Lid", desc: "Stylish glass mug with a lid and straw.", price: "$16", capacity: "400ml", discount: "7%" },
  { id: 309, img: "https://rukminim2.flixcart.com/image/612/612/klfhk7k0/glass/m/7/i/430-ml-mason-glass-jar-mug-with-straw-2-pcs-arudha-creations-original-imagyjwjhbvzdvhg.jpeg?q=70", title: "Mug with Lid & Spoon", desc: "Premium ceramic mug with a lid and spoon.", price: "$18", capacity: "380ml", discount: "15%" },
  { id: 310, img: "https://rukminim2.flixcart.com/image/612/612/klfhk7k0/glass/m/7/i/430-ml-mason-glass-jar-mug-with-straw-2-pcs-arudha-creations-original-imagyjwjhbvzdvhg.jpeg?q=70", title: "Double-Walled Glass Mug", desc: "Insulated glass mug for hot and cold drinks.", price: "$20", capacity: "300ml", discount: "10%" },
  { id: 311, img: "https://rukminim2.flixcart.com/image/612/612/klfhk7k0/glass/m/7/i/430-ml-mason-glass-jar-mug-with-straw-2-pcs-arudha-creations-original-imagyjwjhbvzdvhg.jpeg?q=70", title: "Transparent Glass Mug", desc: "Elegant glass mug with a comfortable handle.", price: "$14", capacity: "350ml", discount: "5%" },
  { id: 312, img: "https://rukminim2.flixcart.com/image/612/612/klfhk7k0/glass/m/7/i/430-ml-mason-glass-jar-mug-with-straw-2-pcs-arudha-creations-original-imagyjwjhbvzdvhg.jpeg?q=70", title: "Large Glass Mug", desc: "Perfect for coffee lovers who enjoy a big cup.", price: "$22", capacity: "350ml", discount: "8%" }
];

export function Mugs() {

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
