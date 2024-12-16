import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState, useContext } from "react";
import Header from "../header";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

const ProductCardDetails = () => {
  const { addItemCart } = useContext(CartContext); // Add to cart from CartContext
  const [productDetails, setProductDetails] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const { id } = useParams();

  const getData = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/products/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setProductDetails({ ...data, quantity: 1 }); // Default quantity set to 1
        setSimilarProducts(data.similar_products);
        setIsLoad(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    setIsLoad(true);
  }, [id]);

  // Increase quantity handler
  const handleIncreaseQuantity = () => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      quantity: prevDetails.quantity + 1,
    }));
  };

  // Decrease quantity handler (prevent going below 1)
  const handleDecreaseQuantity = () => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      quantity: prevDetails.quantity > 1 ? prevDetails.quantity - 1 : 1,
    }));
  };

  const {
    image_url,
    title,
    price,
    rating,
    total_reviews,
    description,
    availability,
    brand,
    quantity = 1, // Default quantity
  } = productDetails;

  return (
    <>
      <Header />
      {isLoad ? (
        <div className="loader-container">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : (
        <div className="product-details-container">
          {/* Main Product Section */}
          <div className="product-main">
            <img src={image_url} alt={title} className="product-image" />
            <div className="product-info">
              <h1 className="product-title">{title}</h1>
              <p className="product-price">Rs {price}/-</p>
              <div className="product-rating">
                <button className="rating-button">{rating} ★</button>
                <span>{total_reviews} Reviews</span>
              </div>
              <p className="product-description">{description}</p>
              <p>
                <strong>Available:</strong> {availability}
              </p>
              <p>
                <strong>Brand:</strong> {brand}
              </p>
              <div className="quantity-section">
                <div className="quantity">
                  <button onClick={handleDecreaseQuantity}>-</button>
                  <p>{quantity}</p>
                  <button onClick={handleIncreaseQuantity}>+</button>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addItemCart(productDetails)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>

          {/* Similar Products Section */}
          <div className="similar-products-container">
            <h2 className="similar-products-title">Similar Products</h2>
            <ul className="similar-products-list">
              {similarProducts.map((product) => (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <li className="similar-product-card">
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="similar-product-image"
                    />
                    <p className="similar-product-title">{product.title}</p>
                    <p className="similar-product-price">Rs {product.price}/-</p>
                    <button className="rating-button">{product.rating} ★</button>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCardDetails;
