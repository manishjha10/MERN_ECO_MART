import Product from '../models/productModel.js';
import HandleError from '../utils/handleError.js';
import handleAsyncError from '../middlewares/handleAsyncError.js';
import APIFunctionality from '../utils/apiFunctionality.js';
import {v2 as cloudinary} from 'cloudinary'; 


//1) creating Products
export const createProducts = handleAsyncError(async (req, res, next) => {
    const imageLinks = [];

    // 1) If files were uploaded using form-data (express-fileupload -> req.files)
    if (req.files && req.files.images) {
        const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'products'
            });
            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }
    } else {
        // 2) Fallback: support base64 strings sent in req.body.image or req.body.images
        let images = [];
        if (typeof req.body.image === 'string') {
            images.push(req.body.image);
        } else if (req.body.image) {
            images = req.body.image;
        } else if (typeof req.body.images === 'string') {
            images.push(req.body.images);
        } else if (req.body.images) {
            images = req.body.images;
        }

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: 'products'
            });
            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }
    }

    // Save under `images` so it matches the schema
    req.body.images = imageLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
})







//2) get all products
export const getAllProducts = handleAsyncError(async(req, res, next) => {
    const resultPerPage=4; 
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
    let product = await Product.findById(req.params.id)
   
    if (!product) {
        return next(new HandleError("Product not found", 404))
    }
    // If new images are uploaded, delete ALL existing images from Cloudinary
    // and replace them with the newly uploaded images.
    const hasNewImages = req.files && req.files.images;

    if (hasNewImages) {
        // Delete all existing images for this product
        for (const img of product.images) {
            try {
                await cloudinary.uploader.destroy(img.public_id);
            } catch (err) {
                // log and continue - don't fail the entire update for a Cloudinary delete error
                console.error('Cloudinary delete error for', img.public_id, err.message);
            }
        }

        // Upload new images and set req.body.images to the uploaded links
        const imageLinks = [];
        const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'products'
            });
            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }

        req.body.images = imageLinks;
    }

    product=await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
    }) 
   
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
    for(let i=0; i<product.images.length; i++)
    {
        await cloudinary.uploader.destroy(product.images[i].public_id)
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


// 6 Creating and upkdating review 
export const createReviewForProduct = handleAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    if (!productId) {
        return next(new HandleError("ProductId missing", 400));
    }

    const product = await Product.findById(productId);

    if (!product) {
        return next(new HandleError("Product not found", 404));
    }

    const reviewExist = product.reviews.find(
        r => r.user.toString() === req.user.id.toString()
    );

    if (reviewExist) {
        product.reviews.forEach(r => {
            if (r.user.toString() === req.user.id.toString()) {
                r.rating = Number(rating);
                r.comment = comment;
            }
        });
    } else {
        product.reviews.push({
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        });
    }
    let sum = 0;
    product.reviews.forEach(review => {
        sum += Number(review.rating)
    })
    // product.ratings = product.reviews.length > 0 ? sum / product.reviews.length : 0
    product.numOfReviews = product.reviews.length; // update review count

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        product
    });
});


//7 Getting Reviews
export const getProduceReviews = handleAsyncError(async (req, res, next) => {
        const product = await Product.findById(req.query.id);
        if(!product)
        {
            return next(new HandleError("Product not found", 400))
        }
        res.status(200).json({
            success:true, 
            reviews:product.reviews
        })
});


//8 Delete Product Review 
export const deleteReview = handleAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new HandleError("Product not found", 400))
    }
    const reviews = product.reviews.filter(review =>review._id.toString()!==req.query.id.toString())
    let sum = 0;
    reviews.forEach(review=>{
        sum += review.rating
    })
    const ratings = sum/reviews.length>0?sum/reviews.length:0;
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings, 
        numOfReviews
    },{
          new:true, 
          runValidators:true
    })
    res.status(200).json({
        success:true, 
        message: "Review Deleted Succesfully"
    }) 
});





// 9 Admin -  Getting all products 
export const getAdminProducts = handleAsyncError(async(req, res, next)=>{
    const products = await Product.find();
    res.status(200).json({
        success:true, 
        products
    })
}) 




 