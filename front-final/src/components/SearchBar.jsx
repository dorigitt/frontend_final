import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

const { Search } = Input;

const SearchBar = ({ onResults }) => {
    const [value, setValue] = useState('');
    
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultSearchValue = searchParams.get('name') || ''; // Extract 'name' param or set empty string as default


    const navigate = useNavigate();
    useEffect(() => {
        const name = searchParams.get('name');
        if (name) {
          setValue(name);
        }
    }, [searchParams]);
    
  const handleSearch = async (value) => {
    console.log('Searching for:', value);
    setValue(value);
    setSearchParams({ name: value });
    // navigate (`?name=${value}`);
  };

  return (
    <Search
      style={{ width: 600, marginLeft: '100px' }}
      placeholder="Search ring..."
      onSearch={handleSearch}
      enterButton
      allowClear
      defaultValue={defaultSearchValue} // Set default value from query param
     onReset={() => {
        setSearchParams({});
        setValue('');
      }}
    
    />
  );
};
export default SearchBar;
