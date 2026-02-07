import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'; 


// Add Items to Cart  
export const addItemsToCart = createAsyncThunk('cart/addItemsToCart', async ({id, quantity}, { rejectWithValue }) => {
    try {
       const {data}=await axios.get(`/api/v1/product/${id}`); 
        console.log(data);
       return {
           product: data.product._id,
           name: data.product.name, 
           price: data.product.price,
           image: data.product.images[0].url,
           stock: data.product.stock,
           quantity
          
       }
    } catch (error) {
        return rejectWithValue(error.response?.data || 'An Error Occured')
    }
})




const cartSlice=createSlice({
    name:'cart', 
    initialState:{
        cartItems:JSON.parse(localStorage.getItem('cartItems')) || [], 
        loading:false, 
        error:null, 
        success:false, 
        message:null, 
        removingId:null,
        shippingInfo: JSON.parse(localStorage.getItem('shippingInfo')) || [] 
    }, 
    reducers:{
        removeErrors:(state)=>{
            state.error=null
        }, 
        removeMessage: (state) => {
            state.message = null 
            state.success=false 
        },  
        // removeItemFromCart:(state, action)=>{
        //     state.removingId=action.payload; 
        //     state.cartItems=state.cartItems.filter(item=>item.product!=action.payload);
        //     localStorage.setItem('cartItems', JSON.stringify(state.cartItems))  
        //     state.removingId=null 
        // } 
        removeItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                item => item.product !== action.payload
            )
            state.success = true
            state.message = "Item removed from cart successfully"
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        } , 
        
        saveShippingInfo:(state, action)=>{
            state.shippingInfo=action.payload 
            // localStorage.setItem('ShippingInfo', JSON.stringify(state.shippingInfo))
            localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo))
        } ,
        clearCart:(state)=>{
            state.cartItems=[]; 
            localStorage.removeItem('cartItems') 
            localStorage.removeItem('shippingInfo')  
        }


    }, 
    extraReducers:(builder)=>{
        //Add items to cart
        builder
            .addCase(addItemsToCart.pending, (state) => {
                state.loading=true
                state.error= null
            })
            .addCase(addItemsToCart.fulfilled, (state, action) => {
                    const item=action.payload
                    const existingItem=state.cartItems.find((i)=>i.product===item.product) 
                if (existingItem){
                    existingItem.quantity=item.quantity
                    state.message = `Updated ${item.name} quantity in the cart `
                }
                else
                {
                    state.cartItems.push(item);  
                    state.message = `${item.name} is added to cart successfully`  
                }
                    state.loading=false, 
                    state.error=null,  
                    state.success=true, 
                    localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

                    
            })
            .addCase(addItemsToCart.rejected, (state, action) => {
                state.loading=false, 
                state.error=action.payload?.message || 'An Error Occured'
            }) 
    }
}) 
export const { removeErrors, removeMessage, removeItemFromCart, saveShippingInfo, clearCart }=cartSlice.actions; 
export default cartSlice.reducer 