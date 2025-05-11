import { useMemo, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer,
  List, ListItem, ListItemText, InputBase, Divider, Badge,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon, Close as CloseIcon, ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon, Add as AddIcon, Remove as RemoveIcon,
  AccountCircle
} from '@mui/icons-material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem, clearCart } from '../redux/features/cartSlice';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const isLoggeedIn = false

  const navItems = [
    { label: 'T-Shirts', path: '/' },
    { label: 'Mugs', path: '/mugs' },
    { label: 'Headphones', path: '/headphones' },
    { label: 'Stickers', path: '/stickers' },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const toggleCartDrawer = () => setCartOpen(!cartOpen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Increase quantity
  const increase = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  // Decrease quantity
  const decrease = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  }, [cartItems])

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, cartItems)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'black', px: 2 }}>
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton edge="start" onClick={handleDrawerToggle} sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>

          {/* Logo and Menu Items */}
          <Box display="flex" alignItems="center" flexGrow={1}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => (window.location.href = '/')}>
              ShopMart
            </Typography>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 4 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  component={NavLink}
                  to={item.path}
                  sx={{
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    color: location.pathname === item.path ? 'red' : 'inherit',
                    mx: 1,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Search Input */}
            <Box
              sx={{
                display: { xs: 'flex', sm: 'flex' },
                alignItems: 'center',
                ml: { sm: 3 },
                px: 2,
                py: 0.5,
                borderRadius: '20px',
                backgroundColor: '#f1f1f1',
                flexGrow: { xs: 1, sm: 'unset' },
              }}
            >
              <SearchIcon sx={{ color: 'gray', mr: 1 }} />
              <InputBase placeholder="Search products…" sx={{ flex: 1, minWidth: 120 }} />
            </Box>
          </Box>

          {isLoggeedIn ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ color: "black" }}>
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                <MenuItem onClick={() => alert("Logging out...")}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")} sx={{ mx: 1 }}>
                Login
              </Button>
              <Button variant="contained" color="primary" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </>
          )}

          {/* Cart Icon */}
          <IconButton onClick={toggleCartDrawer} sx={{ color: "black" }}>
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>;
        </Toolbar>
      </AppBar>

      {/* Mobile Sidebar Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250, p: 2 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ mb: 1 }}>
            <CloseIcon />
          </IconButton>

          {/* Search Input in Drawer for Mobile */}
          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              alignItems: 'center',
              px: 2,
              py: 0.5,
              borderRadius: '20px',
              backgroundColor: '#f1f1f1',
              mb: 2,
            }}
          >
            <SearchIcon sx={{ color: 'gray', mr: 1 }} />
            <InputBase placeholder="Search products…" sx={{ flex: 1 }} />
          </Box>

          {/* Navigation Items */}
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.path} component={NavLink} to={item.path} onClick={handleDrawerToggle}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Cart Drawer (Right Side) */}
      <Drawer anchor="right" open={cartOpen} onClose={toggleCartDrawer}>
        <Box sx={{ width: 300, p: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Your Cart</Typography>
            <IconButton onClick={toggleCartDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Cart Items */}
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <ListItemText primary={item.title} secondary={`$${item.price} x ${item.quantity}`} />
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => decrease(item.id)} size="small"><RemoveIcon /></IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton onClick={() => increase(item.id)} size="small"><AddIcon /></IconButton>
                </Box>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Subtotal and Checkout */}
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Subtotal: <b>${subtotal}</b></Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/checkout')}>  
            Checkout
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
