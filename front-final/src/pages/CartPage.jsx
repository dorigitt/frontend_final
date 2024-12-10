import React from 'react';
import { List, Button, InputNumber } from 'antd';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button danger onClick={() => removeFromCart(item.id)}>Remove</Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<img src={item.coverImageUrl} alt={item.title} style={{ width: 80, height: 80, objectFit: 'cover' }} />}
              title={item.title}
              description={`Price: $${item.price}`}
            />
            <div>
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) => updateQuantity(item.id, value)}
              />
              <div style={{ marginTop: '10px' }}>Total: ${item.price * item.quantity}</div>
            </div>
          </List.Item>
        )}
      />
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <h3>Total Amount: ${calculateTotal()}</h3>
        <Button type="primary" size="large">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default CartPage;
