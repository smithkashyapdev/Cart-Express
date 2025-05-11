import { Container, Card, CardMedia, CardContent, Typography, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 201, img: "https://rukminim2.flixcart.com/image/612/612/ku2zjww0/sticker/3/f/e/large-door-sticker-wallpaper-30-bpdw350-bpdesignsolution-original-imag7af9ujfd4tzg.jpeg?q=70", title: "Floral Door Sticker", desc: "Elegant floral design to enhance your door's beauty.", price: "$20", size: "Standard", discount: "5%" },
  { id: 202, img: "https://rukminim2.flixcart.com/image/612/612/ku2zjww0/sticker/3/f/e/large-door-sticker-wallpaper-30-bpdw350-bpdesignsolution-original-imag7af9ujfd4tzg.jpeg?q=70", title: "Nature Wall Sticker", desc: "Soothing nature-themed wall sticker for a peaceful vibe.", price: "$30", size: "Large", discount: "10%" },
  { id: 203, img: "https://rukminim2.flixcart.com/image/612/612/ku2zjww0/sticker/3/f/e/large-door-sticker-wallpaper-30-bpdw350-bpdesignsolution-original-imag7af9ujfd4tzg.jpeg?q=70", title: "Abstract Art Sticker", desc: "Modern abstract designs for a unique touch.", price: "$25", size: "Medium", discount: "12%" },
  { id: 204, img: "https://rukminim2.flixcart.com/image/612/612/ku2zjww0/sticker/3/f/e/large-door-sticker-wallpaper-30-bpdw350-bpdesignsolution-original-imag7af9ujfd4tzg.jpeg?q=70", title: "Brick Texture Sticker", desc: "Gives your wall a stylish brick-like appearance.", price: "$35", size: "Large", discount: "15%" },
  { id: 205, img: "https://rukminim2.flixcart.com/image/612/612/ku2zjww0/sticker/3/f/e/large-door-sticker-wallpaper-30-bpdw350-bpdesignsolution-original-imag7af9ujfd4tzg.jpeg?q=70", title: "Marble Effect Sticker", desc: "Luxury marble texture for your furniture or walls.", price: "$18", size: "Standard", discount: "8%" },
  { id: 206, img: "https://rukminim2.flixcart.com/image/612/612/ku2zjww0/sticker/3/f/e/large-door-sticker-wallpaper-30-bpdw350-bpdesignsolution-original-imag7af9ujfd4tzg.jpeg?q=70", title: "Cartoon Kids Sticker", desc: "Fun and colorful stickers for kids' rooms.", price: "$22", size: "Medium", discount: "10%" },
  { id: 207, img: "https://rukminim2.flixcart.com/image/612/612/ku2zjww0/sticker/3/f/e/large-door-sticker-wallpaper-30-bpdw350-bpdesignsolution-original-imag7af9ujfd4tzg.jpeg?q=70", title: "Motivational Quote Sticker", desc: "Inspirational quotes to boost your daily motivation.", price: "$28", size: "Medium", discount: "10%" },
  { id: 208, img: "https://rukminim2.flixcart.com/image/612/612/ku2zjww0/sticker/3/f/e/large-door-sticker-wallpaper-30-bpdw350-bpdesignsolution-original-imag7af9ujfd4tzg.jpeg?q=70", title: "3D Wall Art Sticker", desc: "Realistic 3D effect for an eye-catching look.", price: "$24", size: "Standard", discount: "7%" },
  { id: 209, img: "https://rukminim2.flixcart.com/image/612/612/ku2zjww0/sticker/3/f/e/large-door-sticker-wallpaper-30-bpdw350-bpdesignsolution-original-imag7af9ujfd4tzg.jpeg?q=70", title: "Vintage Map Sticker", desc: "Classic map design for history lovers.", price: "$32", size: "Large", discount: "15%" },
  { id: 210, img: "https://rukminim2.flixcart.com/image/612/612/ku2zjww0/sticker/3/f/e/large-door-sticker-wallpaper-30-bpdw350-bpdesignsolution-original-imag7af9ujfd4tzg.jpeg?q=70", title: "Butterfly Wall Decal", desc: "Beautiful butterfly patterns to decorate any space.", price: "$27", size: "Medium", discount: "12%" },
  { id: 211, img: "https://rukminim2.flixcart.com/image/612/612/ku2zjww0/sticker/3/f/e/large-door-sticker-wallpaper-30-bpdw350-bpdesignsolution-original-imag7af9ujfd4tzg.jpeg?q=70", title: "Galaxy Space Sticker", desc: "Brings the beauty of space into your room.", price: "$20", size: "Standard", discount: "5%" },
  { id: 212, img: "https://rukminim2.flixcart.com/image/612/612/ku2zjww0/sticker/3/f/e/large-door-sticker-wallpaper-30-bpdw350-bpdesignsolution-original-imag7af9ujfd4tzg.jpeg?q=70", title: "Golden Leaf Sticker", desc: "Elegant golden leaf design for premium decor.", price: "$22", size: "Standard", discount: "8%" }
];

export function Stickers() {

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
