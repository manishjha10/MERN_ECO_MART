import Product from '../models/productModel.js';
import HandleError from '../utils/handleError.js';
import handleAsyncError from '../middlewares/handleAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';

//1) creating Products
export const createProducts = handleAsyncError(async(req, res, next) => {
    // console.log(req.body); 
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true, 
        product
    })
})


//2) get all products
export const getAllProducts = handleAsyncError(async(req, res, next) => {
    const resultPerPage=3; 
    const  apiFeatures = new APIFunctionality(Product.find(),
     req.query).search().filter();

// Getting fealter query before pagination
    const filterdQuery = apiFeatures.query.clone();
    const productCount=await filterdQuery.countDocuments()

//  calculate the total pages  on filtered count 
    const totalPages=Math.ceil(productCount/resultPerPage);
    const page = Number(req.query.page) || 1;
    
    if(page > totalPages && productCount > 0)
    {
        return next(new HandleError("This page does't exist", 404)); 
    }
//  Apply Pagination 
    apiFeatures.pagination(resultPerPage);
    const products = await apiFeatures.query; 
   
    if(!products || products.length===0)
    {
        return next(new HandleError("No Product found",404)); 
    }

    
    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        totalPages,
        currentPage:page
    })
})


//3) update product 
export const updateProduct = handleAsyncError(async(req, res,next) => {
    const product=await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
    }) 
    if (!product) {
        return next(new HandleError("Product not found", 404))
    }
    res.status(200).json({
        success:true,
        product
    })
})


//4) delete product
export const deleteProduct = handleAsyncError(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new HandleError("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    });
})

//5 Accessing a single product 
export const getSingleProduct = handleAsyncError(async (req, res,next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new HandleError("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product
    });
})