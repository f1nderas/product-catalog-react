import { Suspense } from "react";
import { CatalogPage } from "./pages/Catalog/CatalogPage";
import { HashRouter, Route, Routes } from "react-router-dom";
import { CartPage } from "./pages/Cart/CartPage";
import { CircularProgress } from "@mui/material";
import { Header } from "./components/Header";

function App() {
  // const basename = import.meta.env.PROD ? "/product-catalog-react" : "/";

  return (
    <>
      <HashRouter>
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
      </HashRouter>
    </>
  );
}

export default App;
