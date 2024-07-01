import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error('Could not load cart', e);
    return [];
  }
};

const saveCartToLocalStorage = (cartItems) => {
  try {
    const serializedState = JSON.stringify(cartItems);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.error('Could not save cart', e);
  }
};

const initialState = {
  cartItems: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const cartItem = { ...action.payload, key: uuidv4(), quantity: 1 };
        state.cartItems.push(cartItem);
      }
      saveCartToLocalStorage(state.cartItems);
    },
    incrementQuantity: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      }
      saveCartToLocalStorage(state.cartItems);
    },
    decrementQuantity: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity === 0) {
          state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        }
      }
      saveCartToLocalStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.key !== action.payload);
      saveCartToLocalStorage(state.cartItems);
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;

export const selectTotalQuantity = state => state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = state => state.cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectCartItem = (state, productId) => state.cart.cartItems.find(item => item.id === productId);

export default cartSlice.reducer;