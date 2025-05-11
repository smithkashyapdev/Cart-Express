import { Container, Card, CardMedia, CardContent, Typography, Grid2 } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HocProps, Item } from "../../model/Items";



export const Tshirts: React.FC<HocProps> = ({ data, loading, error }) => {
  const navigate = useNavigate()

  const onhandleTap = (id: number) => {
    navigate(`/product/${id}`, {  state: data.find((p) => p.id === id) });
  }


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid2
        container
        spacing={3}
        justifyContent="center" // ✅ Centers the whole grid
      >
        {data.map((product) => (
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