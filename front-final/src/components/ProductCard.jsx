import React from 'react';
import { Card, Button } from 'antd';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { Modal } from 'antd';
import { Flex, Rate } from 'antd';
import { Select } from 'antd';

const { Meta } = Card;

const ProductCard = ({ id, coverImageUrl, title, price ,description}) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(3); // Initial rating value
  const [selectedOption, setSelectedOption] = useState();
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedOption(value);
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
    >
      <Meta
        title={title}
        description={`$${price}`}
        style={{ marginBottom: '16px' }}
      />
      <Button type="primary" onClick={() => addToCart({ id, title, price, coverImageUrl })}>
        Add to Cart
      </Button>
      <Button type="primary" onClick={() => showModal()} style={{marginLeft: 30}}>
        Details
      </Button>
      <Modal title={title} open={isModalOpen} onOk={() => addToCart({ id, title, price, coverImageUrl })} onCancel={handleCancel} width={700} okText={"Add to cart"}>
        <div style={{ display: 'flex'}}>
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
              <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Rate this product:</p>
              <Rate
                tooltips={desc}
                onChange={(value) => setRating(value)}
                value={rating}
              />
              <p>{rating ? desc[rating - 1] : 'No rating yet'}</p>
            </div>
            <div style={{ marginTop: '20px' }}>
              <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Choose color</p>
              <Select
                defaultValue="Gray"
                style={{
                  width: 200,
                }}
                onChange={handleChange}
                options={[
                  {
                    label: <span>Gray</span>,
                    title: 'Gray',
                  },
                  {
                    label: <span>Gold</span>,
                    title: 'Gold',
                    
                  },
                ]}
              />
              
            </div>
       </div>
       </div>
      </Modal>
      
    </Card>
  );
};

export default ProductCard;
