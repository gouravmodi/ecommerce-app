import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, selectTotalPrice } from '../store/cartSlice';
import './CartPage.css';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (key) => {
    dispatch(removeFromCart(key));
  };

  return (
    <div className="container-wide">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.key}>
                  <td>
                    <img src={item.image} alt={item.title} className="cart-product-image" />
                    {item.title}
                  </td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleRemoveFromCart(item.key)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-price">
            <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
