import React, { useEffect } from 'react';
import { List, Button, InputNumber } from 'antd';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartAction, deleteFromCartByProductId, getCartItemsAction } from '../slices/CartSlice';

const CartPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const cartItems = useSelector(state => state.cart.items)

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  useEffect(() => {
    dispatch(getCartItemsAction())
  }, [dispatch, getCartItemsAction]);

  return (
    <div className="p-4 sm:p-6 md:p-10">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4"
            actions={[
              <Button danger onClick={() => dispatch(deleteFromCartByProductId({product_id: item.id}))}>Remove</Button>,
            ]}
          >
            <div className="flex items-center gap-4">
              <img
                src={item.coverImageUrl}
                alt={item.title}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover"
              />
              <div>
                <h4 className="text-lg font-medium">{item.title}</h4>
                <p className="text-gray-500">Price: ${item.price}</p>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end">
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) => dispatch(addToCartAction({ product_id: value, quantity: 1 }))}
                className="w-full sm:w-24"
              />
              <div className="mt-2 text-sm font-semibold">
                Total: ${item.price * item.quantity}
              </div>
            </div>
          </List.Item>
        )}
      />
      <div className="mt-8 text-right">
        <h3 className="text-xl font-semibold mb-4">Total Amount: ${calculateTotal()}</h3>
        <Button
          type="primary"
          size="large"
          className="w-full sm:w-auto"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
