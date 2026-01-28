import React, { useEffect } from 'react';
import '../pageStyles/Products.css';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import Product from '../components/product';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, removeErrors } from '../features/products/productSlice';
import Loader from '../components/Loader';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoProducts from '../components/NoProducts';

function Products() {
   const {loading, error, products}=useSelector(state=>state.product);
   const dispatch=useDispatch();  
    const location = useLocation();
   const searchParams =  new URLSearchParams(location.search);  
   const keyword=searchParams.get("keyword")
   
   useEffect(()=> {
      dispatch(getProduct({keyword}))
    }, [dispatch, keyword]) 

    useEffect(() => {
       if(error)
       {
         toast.error(error.message, {position: 'top-center', autoClose:3000});  
         dispatch(removeErrors());
       } 
     }, [dispatch, error])
   
  return ( 
    <>
 {loading?(<Loader/>):(  <>
    <PageTitle title ="All Products"/> 
    <Navbar/> 
    <div className="products-layout">
        <div className="filter-section">
            <h3 className="filter-heading">CATEGORIES</h3>
            {/* Rebder Categories */} 
        </div>
             {products.length > 0 ? (<div className="products-section">
                  <div className="products-product-container">
                      {products && products.map((product, index) => (
                          <Product product={product} key={index} />
                      ))}
                  </div>
              </div>) : (
                <NoProducts keyword={keyword}/>
              )}
    </div>
    <Footer/>
   </>)}
  </>
  )
}

export default Products;