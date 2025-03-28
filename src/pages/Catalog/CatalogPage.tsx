import { CartContext } from "@/context/CartContext";
import { IProduct } from "@/interfaces/interfaces";
import { service } from "@/services/service";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Catalog.module.scss";

export const CatalogPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const { addToCart } = cartContext;

  useEffect(() => {
    service
      .getProducts()
      .then((data) => {
        setProducts(data);
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error(error));
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? product.category === category : true)
  );

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title} />
      <TextField
        label="Поиск"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        className={styles.search}
      />
      <FormControl fullWidth className={styles.filter}>
        <InputLabel>Категория</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value as string)}
          className={styles.select}
        >
          <MenuItem value="">Все категории</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container sx={{ display: "grid", gap: 2 }}>
        {paginatedProducts.map((product) => (
          <Grid key={product.id}>
            <Card className={styles.card}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                className={styles.media}
              />

              <CardContent className={styles.context}>
                <Typography variant="h6" className={styles.title}>
                  {product.title}
                </Typography>
                <Typography variant="body2" className={styles.category}>
                  {product.category}
                </Typography>
                <Typography variant="h6" className={styles.price}>
                  ${product.price}
                </Typography>
                <Typography variant="body2" className={styles.rating}>
                  Рейтинг: {product.rating.rate} ({product.rating.count}{" "}
                  отзывов)
                </Typography>
              </CardContent>

              {cartContext.cart.find((item) => item.id === product.id) ? (
                <div>
                  <Button
                    variant="outlined"
                    onClick={() => cartContext.updateQuantity(product.id, -1)}
                    sx={{ minWidth: "36px", mr: 1 }}
                  >
                    -
                  </Button>
                  <Typography component="span" sx={{ mx: 1 }}>
                    {
                      cartContext.cart.find((item) => item.id === product.id)
                        ?.quantity
                    }
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => cartContext.updateQuantity(product.id, 1)}
                    sx={{ minWidth: "36px", ml: 1 }}
                  >
                    +
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => addToCart(product)}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Добавить в корзину
                </Button>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        className={styles.pagination}
      />
      <div className={styles.link}>
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary">
            Перейти в корзину
          </Button>
        </Link>
      </div>
    </div>
  );
};
