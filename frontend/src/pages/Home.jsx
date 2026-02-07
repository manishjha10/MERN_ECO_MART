import React, {useEffect} from 'react'
import '../pageStyles/Home.css';
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/Product.jsx';
import PageTitle from '../components/PageTitle';
import Loader from '../components/Loader.jsx';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {getProduct, removeErrors} from '../features/products/productSlice.js'; 
import {toast} from "react-toastify"; 

function Home() {
 const {loading, error, products, productCount}= useSelector((state)=>state.product);
 const dispatch = useDispatch(); 
 useEffect(()=> {
   dispatch(getProduct({keyword: ""}))
 }, [dispatch]) 
  
 useEffect(() => {
   if(error)
   {
     toast.error(error.message, {position: 'top-center', autoClose:3000});  
     dispatch(removeErrors());
   }
 }, [dispatch, error])

 return (
  <>
    {loading?(<Loader/>) : (<> 
       <PageTitle title="𝔈co Mart"/> 
      <Navbar />
      <div className="home">
        <ImageSlider />
        <div className="home-container">
          <h2 className="home-heading">Trending Now</h2>
          <div className="home-product-container">
            {/* {products.map((product, index) => (
              <Product product={product} key={index} />
            ))} */} 
           {products && products.map((product, index) => (
             <Product product={product} key={index} />
           ))}
          </div>
        </div>
        <Footer />
      </div>
    </>)}
    </>
  );
}

export default Home 