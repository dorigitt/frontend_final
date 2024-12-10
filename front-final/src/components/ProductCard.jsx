import React from 'react';
import { Card, Button } from 'antd';
import { useCart } from '../context/CartContext';

const { Meta } = Card;

const ProductCard = ({ id, coverImageUrl, title, price }) => {
  const { addToCart } = useCart();

  return (
    <Card
      style={{
        width: 300,
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      cover={
        <img
          alt={title}
          src={coverImageUrl}
          style={{
            height: 200,
            objectFit: 'cover',
          }}
        />
      }
    >
      <Meta
        title={title}
        description={`$${price}`}
        style={{ marginBottom: '16px' }}
      />
      <Button type="primary" onClick={() => addToCart({ id, title, price, coverImageUrl })}>
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
