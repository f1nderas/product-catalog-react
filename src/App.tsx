import { Suspense } from "react";
import { CatalogPage } from "./pages/Catalog/CatalogPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartPage } from "./pages/Cart/CartPage";
import { CircularProgress } from "@mui/material";
import { Header } from "./components/Header";

function App() {
  const basename = import.meta.env.PROD ? "/product-catalog-react" : "/";

  return (
    <>
      <BrowserRouter basename={basename}>
        <Header />
        <Suspense
          fallback={
            <CircularProgress
              sx={{ position: "absolute", top: "50%", left: "50%" }}
            />
          }
        >
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
