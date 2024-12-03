import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const ProductCard = ({coverImageUrl,title,price}) => (
  <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src={coverImageUrl}
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      title={title}
      description={price}
    />
  </Card>
);
export default ProductCard;