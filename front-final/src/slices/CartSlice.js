import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, deleteFromCart, getCartItems } from '../services/cart';


export const addToCartAction = createAsyncThunk('cart/addToCart', async ({product_id,quantity}) => {
        const response = await addToCart(product_id, quantity);
        return response;
        
    });

export const getCartItemsAction = createAsyncThunk('cart/getCartItems', async () => {
    const response = await getCartItems();
    return response;
    
});

export const deleteFromCartByProductId  = createAsyncThunk('cart/deleteFromCartByProductId', async ({product_id}) => {
    const response = await deleteFromCart(product_id);
    return response;
})

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        id: 0,
        is_checkout: false,
    },

    reducers: {
        resetCart(state) {
            state.items = [];
            state.id = 0;
            state.is_checkout = false;
        }
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAction.fulfilled, (state, action) => {
                state.id = action.payload.cart.id;
                state.items = action.payload.products;
            })
            .addCase(getCartItemsAction.fulfilled, (state, action) => {
                state.id = action.payload.cart.id;
                state.items = action.payload.products;
            })
            .addCase(deleteFromCartByProductId.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload.id)
            })
            ;
    },
    
});

export const {resetCart} = cartSlice.actions
