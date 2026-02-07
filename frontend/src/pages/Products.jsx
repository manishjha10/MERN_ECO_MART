import React, { useEffect, useState } from 'react';
import '../pageStyles/Products.css';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import Product from '../components/product';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, removeErrors } from '../features/products/productSlice';
import Loader from '../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoProducts from '../components/NoProducts';
import Pagination from '../components/pagination';



function Products() {
  const { loading, error, products, resultPerPage, productCount }=useSelector(state=>state.product);
   const dispatch=useDispatch();  
    const location = useLocation();
   const searchParams =  new URLSearchParams(location.search);  
   const keyword=searchParams.get("keyword")
  const category = searchParams.get("category")
  const pageFormURL = parseInt(searchParams.get("page"), 10) || 1
  const [currentPage, setCurrentPage]=useState(pageFormURL); 
  const navigate=useNavigate(); 
  const categories = [
    "shirts",
    "tshirts",
    "jeans",
    "jackets",
    "hoodies",

    "eyeglasses",
    "sunglasses",
    "readingglasses",
    "bluecutglasses",


    "handbags",
    "backpacks",
   

   
  ]
; 




  // searching priority add 
  const keywordLower = keyword?.toLowerCase();

  const effectiveCategory =
    category
      ? category                     // highest priority
      : categories.includes(keywordLower)
        ? keywordLower               // fallback: keyword as category
        : null;







   useEffect(()=> {
    //  dispatch(getProduct({ keyword, page: currentPage, category })) 
     dispatch(getProduct({
       keyword: effectiveCategory ? null : keyword,
       page: currentPage,
       category: effectiveCategory
     }));
    }, [dispatch, keyword, currentPage, category]) 

    useEffect(() => {
       if(error)
       {
         toast.error(error.message, {position: 'top-center', autoClose:3000});  
         dispatch(removeErrors());
       } 
     }, [dispatch, error])  



  const handlePageChange=(page)=>{
    if(page!==currentPage)
    {
      setCurrentPage(page);
      const newSearchParams = new URLSearchParams(location.search); 
      if(page===1){
        newSearchParams.delete('page')
      }else{
        newSearchParams.set('page', page)
      }
      navigate(`?${newSearchParams.toString()}`)
    }
  } 
  const handleCategoryClick=(category)=>{
    const newSearchParams = new URLSearchParams(location.search);  
    newSearchParams.set('category', category)
    newSearchParams.delete('page') 
    navigate(`?${newSearchParams.toString()}`)

  }
   
  return ( 
    <>
 {loading?(<Loader/>):(  <>
    <PageTitle title ="All Products"/> 
    <Navbar/> 
    <div className="products-layout">
        <div className="filter-section">
            <h3 className="filter-heading">CATEGORIES</h3>
            {/*Rebder categories */} 
            <ul>
              {
                categories.map((category)=>{
                  return (
                    <li key={category}
                    onClick={()=>handleCategoryClick(category)}>{category}</li>
                  )
                })
              }
            </ul>
        </div> 

             {products.length > 0 ? 
               (<div className="products-section">
                  <div className="products-product-container">
                      {products && products.map((product, index) => (
                          <Product product={product} key={index} />
                      ))}
                  </div>
              </div>) : (
                <NoProducts keyword={keyword}/>
              )}
              </div> 
        <div className="pagination-wrapper">
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
             
    <Footer/>
   </>)}
  </>
  )
}

export default Products;