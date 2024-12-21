import React from 'react';
import { Card, Button, Modal, Rate, Select } from 'antd';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; // Import Wishlist context
import { useState } from 'react';
import {Input} from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons'; // Add Heart icons
import { useDispatch } from 'react-redux';
import { addToCartAction } from '../slices/CartSlice';

const { Meta } = Card;

const ProductCard = ({ id, coverImageUrl, title, price, description }) => {
  const dispatch = useDispatch();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(); // Use Wishlist context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(3);
  const [selectedOption, setSelectedOption] = useState();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // State for review modal
  const [reviewName, setReviewName] = useState(''); // State for review name
  const [reviewText, setReviewText] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    setSelectedOption(value);
  };

  // Toggle wishlist status
  const toggleWishlist = () => {
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, title, price, coverImageUrl });
    }
  };
  const handleReviewSubmit = () => {
    if (reviewName.trim() === '' || reviewText.trim() === '') {
      alert('Please fill out both fields before submitting your review.');
      return;
    }

    console.log('Review submitted:', {
      name: reviewName,
      review: reviewText,
    });

    // Clear inputs and close modal
    setReviewName('');
    setReviewText('');
    setIsReviewModalOpen(false);
  };


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
      actions={[
        isInWishlist(id) ? (
          <HeartFilled
            onClick={toggleWishlist}
            style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}
          />
        ) : (
          <HeartOutlined
            onClick={toggleWishlist}
            style={{ fontSize: '20px', color: 'gray', cursor: 'pointer' }}
          />
        ),
      ]}
    >
      <Meta title={title} description={`$${price}`} style={{ marginBottom: '16px' }} />
      <Button type="primary" onClick={() => dispatch(addToCartAction({ product_id: id, quantity: 1 }))}>
        Add to Cart
      </Button>
      <Button type="primary" onClick={showModal} style={{ marginLeft: 30 }}>
        Details
      </Button>
      <Modal
        title={title}
        open={isModalOpen}
        onCancel={handleCancel}
        width={700}
        okText="Add to cart"
      >
        <div style={{ display: 'flex' }}>
          <img
            alt={title}
            src={coverImageUrl}
            style={{
              height: 200,
              objectFit: 'cover',
            }}
          />
          <div>
            <strong>Price: ${price}</strong>
            <p style={{ fontSize: '16px' }}>{description}</p>
            <p>Material: Stainless steel</p>
            {/* Rating Section */}
            
            <div style={{ marginTop: '20px' }}>
              <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Choose color</p>
              <Select
                defaultValue="Gray"
                style={{
                  width: 200,
                }}
                onChange={handleChange}
                options={[
                  { label: 'Gray', value: 'gray' },
                  { label: 'Gold', value: 'gold' },
                ]}
              />
<Button type="primary" onClick={() => setIsReviewModalOpen(true)} style={{ marginLeft: 30 }}>
  Leave a Review
</Button>

<Modal
  title="Leave a Review"
  open={isReviewModalOpen}
  onCancel={() => setIsReviewModalOpen(false)}
  onOk={handleReviewSubmit}
>
  <Input
    placeholder="Your Name"
    value={reviewName}
    onChange={(e) => setReviewName(e.target.value)}
    style={{ marginBottom: '10px' }}
  />
  <Input.TextArea
    placeholder="Your Review"
    value={reviewText}
    onChange={(e) => setReviewText(e.target.value)}
    rows={4}
  />
  <div style={{ marginTop: '20px' }}>
              <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Rate this product:</p>
              <Rate tooltips={['terrible', 'bad', 'normal', 'good', 'wonderful']} onChange={setRating} value={rating} />
              <p>{rating ? ['terrible', 'bad', 'normal', 'good', 'wonderful'][rating - 1] : 'No rating yet'}</p>
            </div>
</Modal>
            </div>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default ProductCard;
