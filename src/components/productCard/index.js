import './index.css'
import { Link } from 'react-router-dom'
const ProductCard = props => {
  const {product} = props
  const {title, brand, image_url, rating, price,id} = product
  return (
    <Link to={`/products/${id}`}>
      <div>
    <li className="product-item">
      <img src={image_url} alt="product" className="thumbnail" />
      <h1 className="product-title">{title}</h1>
      <p className="product-brand">by {brand}</p>
      <div className="product-details">
        <p className="price">Rs {price}/-</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>   
        </div>
      </div>
    </li>
    </div>
    </Link>
  )
}
export default ProductCard
