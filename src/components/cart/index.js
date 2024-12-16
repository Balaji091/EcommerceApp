import Header from '../header';
import './index.css';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';

import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";

const Cart = () => {
  const { cartItems, removeCartItem, increaseQuantity, decreaseQuantity, removeAll } = useContext(CartContext);
  if(cartItems.length>0)
  {
      var totalPrice=cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0)
      var totalQuantity=cartItems.reduce((acc,item)=>acc+item.quantity,0)
  }
  
  return (
    <>
      <Header />
      {cartItems.length > 0 ? (
        <div className="cart-container">
          <div className='cart-header'>
            <h1>My Cart</h1>
            <MdOutlineDelete
              className="remove-all"
              onClick={() => removeAll()} // Removes all items
              title="Remove All Items"
            />
          </div>

          {/* Cart Items */}
          <ul>
            {cartItems.map((item) => (
              <li className='cart-item' key={item.id}>
                <div className='details'>
                  <img src={item.image_url} className='item-image' alt={item.title} />
                  <div>
                    <p className='title'>{item.title}</p>
                    <p className='brand'>by {item.brand}</p>
                  </div>
                </div>
                <div className='quantity'>
                  <p onClick={() => increaseQuantity(item.id)}>+</p>
                  <p>{item.quantity}</p>
                  <p onClick={() => decreaseQuantity(item.id)}>-</p>
                </div>
                <div className='price'>
                  <p className='price'>Rs {item.price}/-</p>
                  <IoIosRemoveCircleOutline
                    onClick={() => removeCartItem(item.id)}
                    title="Remove Item"
                  />
                 
                </div>
              </li>
            ))}
          </ul>
          <div className='total-purchase'>
              <h1 className='total-order'>Ordered Total:{totalPrice}</h1>
              <p total-quantity>{totalQuantity} purchased</p>
          </div>
        </div>

      ) : (
        <div className="empty-cart">
          <img  className="cart-img"src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"/>
        </div>
      )}
    </>
  );
};

export default Cart;
