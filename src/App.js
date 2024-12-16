import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LoginForm from "./components/login";
import Products from "./components/products";
import Cart from "./components/cart";
import NotFound from "./components/notfound";
import ProtectedRoute from "./components/protectedRoute";
import ProductCardDetails from "./components/productcardDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/products"
          element={<ProtectedRoute element={<Products />} />}
        />
        <Route
          path="/products/:id"  
           element={<ProtectedRoute element={<ProductCardDetails />} />}
        />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
