import { CssBaseline, Container, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./component/nav-bar";
import Footer from "./component/footer";
import { Stickers, Mugs, Headphones, Tshirts, ProductDescription } from "./pages";
import withDataFetching from "./hoc/withDataFetching";
import { useState } from "react";
import Checkout from "./pages/checkout";
import Login from "./pages/login";
import Signup from "./pages/signup";

function Layout({ children }: { children: React.ReactNode }) {
  const [footer, showFooter] = useState(true);
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Sticky Navbar at the Top */}
      <Navbar />

      {/* Main Content Area */}
      <Box component="main" flexGrow={1} py={4} marginTop={5}>
        <Container maxWidth="lg">
          <Outlet context={{ showFooter }} /> {/* Loads different pages dynamically */}
        </Container>
      </Box>

      {/* Render Footer ONLY when data has loaded */}
      {!footer && <Footer />}
    </Box>
  );
}

// Wrap pages with data-fetching HOC
const TShirtsWithData = withDataFetching("tshirts")(Tshirts);
const StickersWithData = withDataFetching("stickers")(Stickers);
const MugsWithData = withDataFetching("mugs")(Mugs);
const HeadphonesWithData = withDataFetching("headphones")(Headphones);

function App() {
  return (
    <Router>
      <CssBaseline /> {/* Ensures consistent Material UI styling */}
      <Routes>
        <Route path="/" element={<Layout loading={true} />}>
          <Route index element={<TShirtsWithData />} />
          <Route path="t-shirts" element={<TShirtsWithData />} />
          <Route path="stickers" element={<StickersWithData />} />
          <Route path="mugs" element={<MugsWithData />} />
          <Route path="headphones" element={<HeadphonesWithData />} />
          <Route path="product/:id" element={<ProductDescription />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="*" element={<Box textAlign="center" py={5}>404 Not Found</Box>} />
      </Routes>
    </Router>
  );
}

export default App;
