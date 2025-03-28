import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import styles from "./Cart.module.scss";
import { Button, Divider, List, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const CartPage = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }

  const { cart, removeFromCart, updateQuantity } = cartContext;

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 0),
    0
  );

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Корзина
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6" className={styles.empty}>
          Корзина пуста
        </Typography>
      ) : (
        <div className={styles.paper}>
          <List>
            {cart.map((item, index) => (
              <>
                <ListItem className={styles.listItem} key={item.id}>
                  <div className={styles.itemInfo}>
                    <Typography variant="body1" className={styles.title}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" className={styles.price}>
                      ${item.price} X {item.quantity}
                    </Typography>
                  </div>
                  <Button
                    variant="outlined"
                    onClick={() => updateQuantity(item.id, -1)}
                    sx={{ minWidth: "36px", mr: 1 }}
                  >
                    -
                  </Button>
                  <Typography component="span" sx={{ mx: 1 }}>
                    {item.quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => updateQuantity(item.id, 1)}
                    sx={{ minWidth: "36px", mr: 1 }}
                  >
                    +
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Удалить
                  </Button>
                </ListItem>
                {index < cart.length - 1 && <Divider />}
              </>
            ))}
          </List>
          <div className={styles.total}>
            <Typography variant="h6" className={styles.totalText}>
              Итого: ${total.toFixed(2)}
            </Typography>
          </div>
        </div>
      )}
      <div className={styles.link}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Вернуться в каталог
          </Button>
        </Link>
      </div>
    </div>
  );
};
