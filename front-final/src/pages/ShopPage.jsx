import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from 'react-router-dom';
import ProductCard from "../components/ProductCard";

import { getProducts, getFilteredProducts, getSearchProducts } from '../slices/productSlice';
import './ShopPage.css';

export default function ShopPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryId = searchParams.get('category_id');
    if (categoryId) {
      dispatch(getFilteredProducts(categoryId));
    }
    else if (searchParams.get('name')) {
      dispatch(getSearchProducts(searchParams.get('name')));
    }
     else {
      dispatch(getProducts());
    }
  }, [dispatch, searchParams]);

  if (productStatus === 'loading') {
    return <p>Loading...</p>;
  }

  if (productStatus === 'failed') {
    return <p>Error fetching products. Please try again later.</p>;
  }

  return (
    <>
      <h1>Shop</h1>
      <div className="products">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            coverImageUrl={product.coverimageurl}
            title={product.name}
            price={product.price}
            description={product.description}
          />
        ))}
      </div>
    </>
  );
}
