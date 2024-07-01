import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import ProductCard from './ProductCard';
import { Carousel } from 'react-responsive-carousel'; // Named import
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel CSS
import '../App.css';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  return (
    <div className="container-wide">
      <h1>Products</h1>
      {productStatus === 'loading' && <div>Loading...</div>}
      {productStatus === 'failed' && <div>{error}</div>}
      {productStatus === 'succeeded' && (
        <>
          <div className="carousel-container">
            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
              {products.map((product) => (
                <div key={product.id}>
                  <img src={product.image} alt={product.title} />
                  <p className="legend">{product.title}</p>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
