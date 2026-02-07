import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import axios from 'axios'; 

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async ({keyword,page=1, category}, { rejectWithValue }) => {
        try { 
            let link = '/api/v1/products?page='+page;
            if(category){
                link += `&category=${category}`;
            }
            if(keyword){ 
                link += `&keyword=${keyword}`;
            }

            // const link = keyword ?`/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}`:
            // `/api/v1/products?page=${page}`;
          
          
            const response = await axios.get(link);
            return response.data;   
        } catch (error) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
); 



// Producr Details  
export const getProductDetails = createAsyncThunk(
    'product/getProductDetails',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/v1/product/${id}`);
            return data.product; 
        } catch (error) {
            return  rejectWithValue((error.response?.data?.message) || 'An error occurred');
        }
    }
);


// Submit  Review  
export const createReview = createAsyncThunk(
    'product/createReview',
    async ({rating, comment, productId}, { rejectWithValue }) => {
        try { 
            const config={
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const { data } = await axios.put('/api/v1/review', { rating, comment, productId }, config);
            return data.product;
        } catch (error) {
            return rejectWithValue((error.response?.data?.message) || 'An error occurred');
        }
    }
);


const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productCount: 0,
        loading: false,
        error: null,
        product: null,
        resultPerPage:4,
        totalPages:0, 
        reviewSuccess:false, 
        reviewLoading:false 
    },

    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.reviewSuccess = false;
            state.reviewLoading = false;
        },
    },   

    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state) => {
            state.loading = true,
                state.error = null
        })
            .addCase(getProduct.fulfilled, (state, action) => {
                console.log('Fulfilled action payload', action.payload);
                state.loading = false;
                // state.error=null;
                state.products = action.payload.products;
                state.productCount = action.payload.productCount;
                state.resultPerPage = action.payload.resultPerPage;
                state.totalPages = action.payload.totalPages;
            }) 
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong'
                state.products=[]
            })

        builder.addCase(getProductDetails.pending, (state) => {
            state.loading = true;
            state.error = null
        })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                // console.log('Product Details', action.payload);
                state.loading = false;
                // state.error = null;
                state.product = action.payload;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong'
            })

            builder.addCase(createReview.pending, (state) => {
                state.reviewLoading = true;
                state.error = null
            })
                .addCase(createReview.fulfilled, (state, action) => {
                  
                    state.reviewLoading = false;
                    state.reviewSuccess = true;                    // update product in state immediately with returned product so count and reviews reflect instantly
                    if (action.payload) {
                        state.product = action.payload;
                    }                    
                })
                .addCase(createReview.rejected, (state, action) => {
                    state.reviewLoading = false;
                    state.error = action.payload || 'Something went wrong'
                })

    }
})

export const { removeErrors, removeSuccess }=productSlice.actions;
export default productSlice.reducer;