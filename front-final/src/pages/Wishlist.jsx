import React from 'react';
import { List, Button } from 'antd';
import { useWishlist } from '../context/WishlistContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Wishlist</h1>
      <List
        itemLayout="horizontal"
        dataSource={wishlistItems}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button danger onClick={() => removeFromWishlist(item.id)}>
                Remove
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<img src={item.coverImageUrl} alt={item.title} style={{ width: 80, height: 80 }} />}
              title={item.title}
              description={`Price: $${item.price}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Wishlist;
