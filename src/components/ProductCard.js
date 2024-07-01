import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity, selectCartItem } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItem = useSelector(state => selectCartItem(state, product.id));
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigating to product details
    dispatch(addToCart(product));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000); // Hide notification after 2 seconds
  };

  const handleIncrement = (e) => {
    e.stopPropagation(); // Prevent navigating to product details
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = (e) => {
    e.stopPropagation(); // Prevent navigating to product details
    dispatch(decrementQuantity(product.id));
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleViewDetails}>
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <img src={product.image} alt={product.title} style={{ width: '100px' }} />
      {cartItem ? (
        <div className="quantity-controls">
          <button onClick={handleDecrement}>-</button>
          <span>{cartItem.quantity}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
      ) : (
        <button onClick={handleAddToCart}>Buy</button>
      )}
      {showNotification && <div className="notification">Product added to cart!</div>}
    </div>
  );
};

export default ProductCard;
