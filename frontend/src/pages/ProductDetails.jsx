import React, { useEffect, useState } from 'react'
import '../pageStyles/ProductDetails.css'; 
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Rating from '@mui/material/Rating';
import {useDispatch, useSelector } from 'react-redux'; 
import { useParams } from 'react-router-dom';
import { getProductDetails, removeErrors } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';


function ProductDetails() {
    const [userRating, setUserRating]=useState(0);  
       const handleRatingChange=(newRating)=>{
           setUserRating(newRating);
       }
       const {loading, error, product} = useSelector((state)=> state.product)
       const dispatch = useDispatch();
       const {id} = useParams(); 
       useEffect(()=>{ 
        if(id){
            dispatch(getProductDetails(id)); 
        }

        return ()=> {
            dispatch(removeErrors())
        }
       }, [dispatch, id]) 

        useEffect(() => {
          if(error)
          {
            toast.error(error.message, {position: 'top-center', autoClose:3000});  
            dispatch(removeErrors());
          }
        }, [dispatch, error])

    if (loading) {
        return (
            <>
                <Navbar />
                <Loader />
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <PageTitle title="Product Details" />
                <Navbar />
                <p style={{ textAlign: 'center' }}>Something went wrong</p>
                <Footer />
            </>
        );
    }


  return (
      <>
      <PageTitle title={`${product?.name || 'Product'} - Details`} /> 
     <Navbar/> 
      <div className="product-details-container">
        <div className="product-detail-container">
                  <div className="product-image-container">
                      {product?.images?.length > 0 && (
                          <img
                              src={product.images[0].url.replace('./public', '')}
                              alt={product?.name || 'Product'}
                              className="product-detail-image"
                          />
                      )}
                  </div> 

            <div className="product-info">
                {/* <h2>Product Name</h2>
                <p className="product-description">Product Description</p>
                <p className="product-price">Price: 200/-</p>  */}
                      
                      <h2>{product?.name}</h2>
                      <p className="product-description">{product?.description}</p>
                      <p className="product-price">Price: ₹{product?.price}</p>


                <div className="product-rating">
                    <Rating 
                     value={2}
                     disabled={true}
                    />
                          <span className="productCardSpan">
                              ({product?.numOfReviews ?? 0}{" "}
                              {(product?.numOfReviews ?? 0) === 1 ? "Review" : "Reviews"})
                          </span>
                </div> 

                      <div className="stock-status">
                          <span
                              className={
                                  Number(product?.stock) > 0 ? 'in-stock' : 'out-of-stock'
                              }
                          >
                              {Number(product?.stock) > 0
                                  ? `In stock (${product?.stock} available)`
                                  : 'Out of stock'}
                          </span>
                      </div>


               {product?.stock > 0 && (<><div className="quantity-controls">
                    <span className="quantitu-label">Quantity:</span>
                    <button className="quantity-button">-</button> 
                    <input type="text" value={1} className='quantity-value' readOnly/>
                    <button className="quantity-button">+</button>  
                </div> 
                <button className="add-to-cart-btn">Add to Cart</button></>)}  

                
                <form className="review-action">
                    <h3>Write a Review</h3>
                          <Rating
                              value={userRating}
                              onChange={(e, newValue) => handleRatingChange(newValue)}
                          />
                    <textarea placeholder='Write your review here'
                    className='review-input'></textarea>
                    <button className="submit-review-btn">Submit Review</button>
                </form>
            </div>        
        </div>
              <div className="reviews-container">
                  <h3>Customer Reviews</h3>
                 {product?.reviews && product.reviews.length>0?(<div className="reviews-section">
                     {product?.reviews.map((review, index)=>(
                         <div className="review-item" key={index}> 
                             <div className="review-header">
                                 <Rating value={review.rating} disabled={true} />
                             </div>
                             <p className="review-comment">{review.comment}</p>
                             <p className="review-name">By: {review.name}</p>
                         </div>
                     ))}
                  </div>):(
                       <p className="no-reviews">
                        No reviews yet. Be the first to review this product!
                       </p>
                  )}
              </div>
          </div>
     <Footer/>
     </>
  )
}
export default ProductDetails