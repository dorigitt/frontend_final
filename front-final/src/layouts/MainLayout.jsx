import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import HomePage from '../pages/ShopPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import MyProfile from '../pages/MyProfile';
import SearchBar from '../components/SearchBar';
import Wishlist from '../pages/Wishlist';
import { closeModal, logout, openModal } from '../slices/AuthSlice';
import ProductCard from '../components/ProductCard';

import { Input, Space } from 'antd';

import {  Modal } from 'antd';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { getLogin } from '../slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../slices/CartSlice';




const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  const [searchActive, setSearchActive] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showModal = () => {
   dispatch(openModal());
    setIsSignUp(false);
  };
  const handleOk = () => {
    dispatch(closeModal());
  };
  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleLogin = () => {
    dispatch(closeModal());
  };

  
  const [searchParams, setSearchParams] = useSearchParams(); //dont remember what it was //
  const { Search } = Input;

  const dispatch = useDispatch();
  
  const user = useSelector ((state) => state.auth.user);
  const isModalOpen = useSelector((state) => state.auth.isModalOpen);
  return (
    <Layout style={{minHeight:"100vh"}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname === "/" ? '1' : '2']}
          items={[
            {
              key: '1',
              icon: <ShoppingOutlined />,
              label: 'Shop',
              onClick:()=>{
                setSearchParams({})
                navigate("/")
            }
            },
            {
              key: '2',
              icon: <ShoppingCartOutlined />,
              label: 'Cart ',
              onClick:()=>{
                navigate("/cart")
            }
            },{
                key: '5',
                icon: <HeartOutlined />,
                label: 'Wishlist',
                onClick:()=>{
                  navigate("/wishlist")
              }
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: 'My profile',
              onClick:()=>{
                navigate("/profile")
              }
            },
            {
                key: '4',
                icon: <UnorderedListOutlined />,
                label: 'Category',
                children: [
                  {
                    key: '41',
                    label: 'Women',
                    children: [
                      {
                        key: '411',
                        label: 'All Women',
                        onClick: () => navigate('/?category_id=women'),
                      },
                      {
                        key: '412',
                        label: 'Silverware',
                        onClick: () => navigate('/?category_id=women&subcategory_id=women_silverware'),
                      },
                      {
                        key: '413',
                        label: 'Goldware',
                        onClick: () => navigate('/?category_id=women&subcategory_id=women_goldware'),
                      }
                    ]
                  },



                  {
                    key: '42',
                    label: 'Men',
                    children: [
                      {
                        key: '421',
                        label: 'All Men',
                        onClick: () => navigate('/?category_id=men'),
                      },
                      {
                        key: '422',
                        label: 'Silverware',
                        onClick: () => navigate('/?category_id=men&subcategory_id=men_silverware'),
                      },
                      {
                        key: '423',
                        label: 'Goldware',
                        onClick: () => navigate('/?category_id=men&subcategory_id=men_goldware'),
                      },
                    ]
                  }
                ],
              }
          ]}

        />
      </Sider>
      <Layout>
        
        <Header
          style={{
            padding: 30,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />


<SearchBar
  onResults={(results) => {
    setSearchResults(results); // Update search results state
    setSearchActive(true); // Activate search view
  }}
/>
  {user?
 <Button type="primary" onClick={() => {
  dispatch(logout());
  dispatch(resetCart());
 }} style={{ marginLeft: '100px'}}>
 Log Out
</Button>:
 
 <Button type="primary" onClick={showModal} style={{ marginLeft: '100px'}}>
 Log in
</Button>
  }

      <Modal
        title={isSignUp ? 'Sign Up' : 'Log In'}
        open={isModalOpen}
        footer={null} 
        onCancel={handleCancel}
      >

        {!isSignUp ? (
          <div>
            <input type="email"
              placeholder="Email"
              style={{ width: '90%', padding: '10px', marginBottom: '10px' }}
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              style={{ width: '90%', padding: '10px', marginBottom: '10px' }}
              value = {password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="primary" style={{ width: '100%' }}  onClick={()=> dispatch(getLogin({email,password}))
            }>
              Log In
            </Button>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Don't have an account yet?{' '}
              <span
                onClick={() => setIsSignUp(true)} 
                style={{
                  color: 'blue',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Click here
              </span>
            </p>
          </div>
        ) : (
        
          <div>
            <input
              type="email"
              placeholder="Email"
              style={{ width: '90%', padding: '10px', marginBottom: '10px' }}
            />
            <input
              type="password"
              placeholder="Password"
              style={{ width: '90%', padding: '10px', marginBottom: '10px' }}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              style={{ width: '90%', padding: '10px', marginBottom: '10px' }}
            />
            <Button type="primary" style={{ width: '100%' }}>
              Sign Up
            </Button>
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
              Already have an account?{' '}
              <span
                onClick={() => setIsSignUp(false)} 
                style={{
                  color: 'blue',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Click here
              </span>
            </p>
          </div>
        )}
      </Modal>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
             {searchActive ? (
            <div>
              <h1>Search Results</h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      coverImageUrl={product.coverimageurl}
                      title={product.name}
                      price={product.price}
                      description={product.description}
                    />
                  ))
                ) : (
                  <p>No products found</p>
                )}
              </div>
            </div>
          ) :(
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
              path="/search"
              element={
                <div>
                  <h1>Search Results</h1>
                  <ul>
                    {searchResults.map((result) => (
                      <li key={result.id}>
                        <h3>{result.name}</h3>
                        <p>Price: ${result.price}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          
        </Routes>)}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;