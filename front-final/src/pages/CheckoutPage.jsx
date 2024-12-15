import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { List, Input, Button, Radio } from 'antd';

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const [shippingOption, setShippingOption] = useState('standard'); // Default shipping option
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState({}); // To track field errors

  const calculateTotal = () => {
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingCost = shippingOption === 'express' ? 20 : 5; // Shipping cost: express = $20, standard = $5
    return cartTotal + shippingCost;
  };

  const handleBillingInfoChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error for the field
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!billingInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!billingInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!billingInfo.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!billingInfo.postalCode.trim() || !/^\d{5}$/.test(billingInfo.postalCode)) {
      newErrors.postalCode = 'Valid Postal Code is required (e.g., 12345)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleCheckout = () => {
    if (!validateInputs()) {
      alert('Please fix the errors in the form before proceeding.');
      return;
    }

    const orderData = {
      items: cartItems,
      totalAmount: calculateTotal(),
      billingInfo,
      shippingOption,
    };

    console.log('Placing Order:', orderData);
    alert('Order placed successfully!');

    // Here you can send `orderData` to the backend using an API request.
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Checkout</h2>

      {/* Cart Summary */}
      <List
        header={<b>Order Summary</b>}
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={`Quantity: ${item.quantity} | Price: $${item.price}`}
            />
            <div>Total: ${item.price * item.quantity}</div>
          </List.Item>
        )}
      />

      {/* Billing Information */}
      <div style={{ marginTop: '20px' }}>
        <h3>Billing Information</h3>
        <Input
          name="name"
          placeholder="Full Name"
          style={{ marginBottom: '10px' }}
          value={billingInfo.name}
          onChange={handleBillingInfoChange}
        />
        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        <Input
          name="address"
          placeholder="Address"
          style={{ marginBottom: '10px' }}
          value={billingInfo.address}
          onChange={handleBillingInfoChange}
        />
        {errors.address && <div style={{ color: 'red' }}>{errors.address}</div>}
        <Input
          name="city"
          placeholder="City"
          style={{ marginBottom: '10px' }}
          value={billingInfo.city}
          onChange={handleBillingInfoChange}
        />
        {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
        <Input
          name="postalCode"
          placeholder="Postal Code"
          style={{ marginBottom: '10px' }}
          value={billingInfo.postalCode}
          onChange={handleBillingInfoChange}
        />
        {errors.postalCode && <div style={{ color: 'red' }}>{errors.postalCode}</div>}
      </div>

      {/* Shipping Options */}
      <div style={{ marginTop: '20px' }}>
        <h3>Shipping Options</h3>
        <Radio.Group
          onChange={(e) => setShippingOption(e.target.value)}
          value={shippingOption}
        >
          <Radio value="standard">Standard Shipping ($5)</Radio>
          <Radio value="express">Express Shipping ($20)</Radio>
        </Radio.Group>
      </div>

      {/* Total Amount */}
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <h3>Total Amount: ${calculateTotal()}</h3>
        <Button type="primary" size="large" onClick={handleCheckout}>
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
