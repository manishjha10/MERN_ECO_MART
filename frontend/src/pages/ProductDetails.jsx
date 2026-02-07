import React, { useEffect, useState } from 'react'
import '../pageStyles/ProductDetails.css'; 
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Rating from '@mui/material/Rating';
import {useDispatch, useSelector } from 'react-redux'; 
import { useParams } from 'react-router-dom';
import { createReview, getProductDetails, removeErrors, removeSuccess } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { addItemsToCart, removeMessage } from '../features/cart/cartSlice';


function ProductDetails() {
    const [userRating, setUserRating]=useState(0);  
    const [comment, setComment] = useState(""); 
    const [quantity, setQuantity]=useState(1);   
    const [selectedImage, setSelectedImage]=useState(""); 
       const handleRatingChange=(newRating)=>{
           setUserRating(newRating);
       }
    const { loading, error, product, reviewSuccess,reviewLoading } = useSelector((state)=> state.product)
       const { loading: cartLoading, error: cartError, success, message, cartItems } = useSelector((state) => state.cart)
    //    console.log(cartItems);

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
         if (product?.images?.length > 0) {
             setSelectedImage(product.images[0].url.replace('./public', ''));
         }
       }, [product]);

        useEffect(() => {
          if(error)
          {
            toast.error(error.message, {position: 'top-center', autoClose:3000});  
            dispatch(removeErrors());
          }
            if (cartError) {
                toast.error(cartError, { position: 'top-center', autoClose: 3000 });
            }
        }, [dispatch, error, cartError])
        
    useEffect(() => {
        if (success) {
            toast.success(message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeMessage());
        }
    }, [dispatch, success, message])


    const decreaseQuantity = () => {
        if (quantity <= 1) {
            toast.error('Quantity cannot be less than 1', {
                position: 'top-center',
                autoClose: 3000
            });
            return;
        }
        setQuantity(qty => qty - 1);
    };
    

    const increaseQuantity = () => {
        if (quantity >= Number(product?.stock)) {
            toast.error('Cannot exceed available stock', {
                position: 'top-center',
                autoClose: 3000
            });
            return;
        }
        setQuantity(qty => qty + 1);
    };

    const addToCart=()=>{
         dispatch(addItemsToCart({id, quantity})) 
    } 

    const handleReviewSubmit=(e)=>{
        e.preventDefault(); 
        if(!userRating)
        {
            toast.error('Please Select a rating', {position:'top-center', autoClose:3000})
            return; 
        } 
       dispatch(createReview({
        rating:userRating, 
        comment, 
        productId:id 
       }))
    } 
    useEffect(()=>{
        if(reviewSuccess)
        {
            toast.success(`Review  Submitted Successfully`, { position: 'top-center', autoClose: 3000 })
            setUserRating(0); 
            setComment(""); 
            dispatch(removeSuccess());   
            dispatch(getProductDetails(id));   
        }
    }, [reviewSuccess, id,dispatch]) 

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
                              src={(selectedImage) || product.images[0].url.replace('./public', '')}
                              alt={product?.name || 'Product'}
                              className="product-detail-image"
                          />
                      )}
                      <div className="product-thumbnails">

                          {product?.images?.map((img, idx) => {
                              const imgUrl = img.url.replace('./public', '');
                              return (
                                <img
                                  key={idx}
                                  src={imgUrl}
                                  alt={`Thumbnail ${idx + 1}`}
                                  className={`thumbnail-image ${selectedImage === imgUrl ? 'selected' : ''}`}
                                  onClick={() => setSelectedImage(imgUrl)}
                                  onMouseEnter={() => setSelectedImage(imgUrl)}
                                />
                              )
                          })}
                      </div> 
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
                     value={product?.ratings || 0}
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


               {product?.stock > 0 && (<>
               <div className="quantity-controls">
                    <span className="quantitu-label">Quantity:</span>
                    <button type="button" className="quantity-button" onClick={decreaseQuantity}>-</button> 
                    <input type="text" value={quantity} className='quantity-value' readOnly/>
                              <button type="button" className="quantity-button" onClick={increaseQuantity}>+</button>  
                </div> 
                          <button className="add-to-cart-btn" 
                              onClick={addToCart} disabled={cartLoading}>{cartLoading?'Adding':'Add to Cart'}</button></>)}  

                
                <form className="review-action" onSubmit={handleReviewSubmit}>
                    <h3>Write a Review</h3>
                          <Rating
                              value={userRating}
                              onChange={(e, newValue) => handleRatingChange(newValue)}
                          />
                    <textarea placeholder='Write your review here'
                    className='review-input' value={comment} onChange={(e)=>setComment(e.target.value)} required></textarea>
                    {/* <button  className="submit-review-btn" disabled={reviewLoading}>{{reviewLoading}?`Submiting...`:`Submit Review`}</button> */}
                          <button
                              type="submit"
                              className="submit-review-btn"
                              disabled={reviewLoading}
                          >
                              {reviewLoading ? 'Submitting...' : 'Submit Review'}
                          </button>

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