import {Link} from 'react-router-dom'
import './index.css'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
const Header = () => {
  const {cartItems}=useContext(CartContext)
  const items=cartItems.length
  const navigate=useNavigate();
   function removeJwt(){
    Cookies.remove('jwt_token');
    navigate('/login');
  }
  return(
  <nav className="nav-header">
    <div className="nav-content">
      <img
        className="website-logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        alt="website logo"
      />
      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="nav-link">
            Products
          </Link>
        </li>
        <li>
          <Link to="/cart" className="nav-link">
            Cart <span style={{color:"blue"}}>{items}</span>
          </Link>
        </li>
      </ul>
      <button type="button" className="logout-desktop-btn" onClick={removeJwt}>
        Logout
      </button>
      <button type="button" className="logout-mobile-btn" onClick={removeJwt}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
          alt="logout icon"
          className="logout-icon"
        />
      </button>
    </div>
  </nav>
)}
export default Header