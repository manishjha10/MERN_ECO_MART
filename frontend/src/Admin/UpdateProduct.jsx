import React, { useEffect, useState } from 'react'
import '../AdminStyles/UpdateProduct.css'; 
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';  
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails } from '../features/products/productSlice';
import { removeError, removeSuccess, updateProduct } from '../features/admin/adminSlice';
import {toast} from "react-toastify"; 

function UpdateProduct() { 
       const [name, setName] = useState("");
       const [price, setPrice] = useState("");
       const [description, setDescription] = useState("");
       const [category, setCategory] = useState("");
       const [stock, setStock] = useState("");
       const [oldImage, setOldImage] = useState([]);
       const [imagePreview, setImagePreview] = useState([]);
        const [image, setImage] = useState([]);
       const {product} =useSelector(state=>state.product);  
       const {success, error, loading} = useSelector(state=>state.admin); 




       const dispatch=useDispatch(); 
       const {updateId} = useParams();  
       const navigate = useNavigate(); 
      
       const categories=["SHIRTS", "TSHIRTS", "JEANS", "JACKETS", "HOODIES", "EYEGLASSES", 
        "SUNGLASSES", "READINGGLASSES", "BLUECUTGLASSES", "HANDBAGS", "BACKPACKS",  "mouse",
        "HEADPHONE", "BUCKET",  "TOPS"];  

     useEffect(()=>{
        dispatch(getProductDetails(updateId)); 
     }, [dispatch, updateId])    
     useEffect(()=>{
     if(product){
         setName(product.name)
         setPrice(product.price)
         setDescription(product.description)
         setCategory(product.category)
         setStock(product.stock)
         setOldImage(product.images)
     }
     }, [product])

  

    const handleImageChange=(e)=>{
         const files = Array.from(e.target.files);
        
                // Reset previous selections
                // revoke previous object URLs to avoid memory leaks
                imagePreview.forEach((url) => URL.revokeObjectURL(url));
                setImage([]);
                setImagePreview([]);
        
                const MAX_SIZE = 10 * 1024 * 1024; // 10MB
                files.forEach((file) => {
                    if (file.size > MAX_SIZE) {
                        toast.error('Image too large. Max 10MB allowed', { position: 'top-center', autoClose: 3000 });
                        return; // skip this file
                    }
                    // preview using object URL (no base64 conversion)
                    const previewUrl = URL.createObjectURL(file);
                    setImagePreview((old) => [...old, previewUrl]);
                    setImage((old) => [...old, file]);
                });
    }
    
    const updateProductSubmit=(e)=>{
        e.preventDefault();
       
               const myForm = new FormData();
               myForm.set('name', name);
               myForm.set('price', price);
               myForm.set('description', description);
               myForm.set('category', category);
               myForm.set('stock', stock);
       
               // Append new images - old images will be deleted from Cloudinary on the backend
               image.forEach((file) => {
                   myForm.append("images", file);
               });
       
        dispatch(updateProduct({ id: updateId, formData: myForm })); 
    }
    useEffect(() => {
           if(success)
           {
            toast.success("Product Updated Succesfully",{position:'top-center', autoClose:3000});  
            // Refresh product details so UI shows updated images
            dispatch(getProductDetails(updateId));
            dispatch(removeSuccess());  
            navigate('/admin/products');
           } 
           if(error)
           {
               toast.success("Product Updated Failed", { position: 'top-center', autoClose: 3000 });
               dispatch(removeError()); 
           }
        
    }, [dispatch, error, success]) 



  return ( 
      <>
          <Navbar />
          <PageTitle title="Update Product" />
          <div className="update-product-wrapper">
              <h1 className='update-product-title'>Update Product</h1>
              <form className="update-product-form" 
              encType='multipart/form-data' onSubmit={updateProductSubmit}>
                
                  <label htmlFor="name">Product Name</label>
                  <input type="text"
                   className='update-product-input' required
                      id="name" name="name" 
                      value={name} 
                      onChange={(e)=>setName(e.target.value)}/>


                  <label htmlFor="price">Product Price</label>
                  <input type="number" 
                  className='update-product-input' required
                    id="price" name="price" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}/>  
   

                  <label htmlFor="description">Product Description</label>
                  
                  <textarea
                      className='update-product-textarea'
                      required
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                  />


                <label htmlFor="category">Product Category</label>  
                <select name="category" id="category" 
                className='update-product-select'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Choose a Category</option> 
                      {categories.map((item) => (
                          <option value={item} key={item}>{item}</option>
                      ))}
                </select>

                  <label htmlFor="stock">Product Stock</label>
                  <input type="number" 
                  className='update-product-input' required
                      id="stock" name="stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                  />   

                <label htmlFor="image">Product Images</label>  
                <div className="update-product-file-wrapper">
                    <input type="file" accept="image/" name="image" 
                    multiple className='update-product-file-input'  onChange={handleImageChange}/>
                </div> 
                <div className="update-product-preview-wrapper">
                    {imagePreview.map((img, index)=>(
                        <img src={img} alt="Product Preview" key={index}
                            className='update-product-preview-image' />
                    ))}
                </div>
                {oldImage?.length > 0 && (
                  <>
                    <label>Current Images</label>
                    <div className="update-product-old-images-wrapper">
                    {oldImage?.map((img, index)=>(
                        <img src={img.url}alt="Old Product Preview" key={index}
                          className='update-product-old-image'
                           />
                        ))}
                    </div>
                  </>
                )}
                  <button className="update-product-submit-btn">{loading?'Updating...':'Update'}</button>
              </form>
          </div>
          <Footer />
      </>
   
  ) 
}

export default UpdateProduct