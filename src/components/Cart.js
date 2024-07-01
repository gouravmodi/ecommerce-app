import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/cartSlice';
import '../App.css';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (key) => {
    dispatch(removeFromCart(key));
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.key}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveFromCart(item.key)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
