import { CartContext } from "@/context/CartContext";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { cart } = cartContext;

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 0),
    0
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            ProductCatalog
          </Link>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Сумма: ${total.toFixed(2)}
          </Typography>
          <Button color="inherit" component={Link} to="/cart">
            Корзина ({cart.length})
          </Button>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
