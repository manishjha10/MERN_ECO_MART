import React, { useEffect, useState } from 'react'
import '../AdminStyles/CreateProduct.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, removeSuccess } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';
import { removeError } from '../features/admin/adminSlice';



function CreateProduct() {

    const { success, loading, error } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);


    const categories = ["SHIRTS", "TSHIRTS", "JEANS", "JACKETS", "HOODIES", "EYEGLASSES",
        "SUNGLASSES", "READINGGLASSES", "BLUECUTGLASSES", "HANDBAGS", "BACKPACKS", "mouse",
        "HEADPHONE", "BUCKET", "TOPS"]

    const createProductSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('description', description);
        myForm.set('category', category);
        myForm.set('stock', stock);

        // Append raw File objects as binary to FormData (field name: images)
        image.forEach((file) => {
            myForm.append("images", file);
        });

        dispatch(createProduct(myForm));
    }



    const createProductImage = (e) => {
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
    };


    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 })
            dispatch(removeError())
        }
        if (success) {
            toast.success("Product created successfully", { position: 'top-center', autoClose: 3000 })
            dispatch(removeSuccess())
            setName("");
            setPrice("");
            setDescription("");
            setCategory("");
            setStock("");
            // revoke object URLs to avoid memory leaks
            imagePreview.forEach((url) => URL.revokeObjectURL(url));
            setImage([]);
            setImagePreview([]);
        }
    }, [dispatch, error, success])


    return (
        <>
            <Navbar />
            <PageTitle title="Create Product" />
            <div className="create-product-container">
                <h1 className='form-title'>Create Product</h1>
                <form className='product-form' encType='multipart/form-data' onSubmit={createProductSubmit}>
                    <input type="text" className="form-input" placeholder='Enter Product Name' required name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="number" className="form-input" placeholder='Enter Product Price' required name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <input type="text" className="form-input" placeholder='Enter Product Description' required name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <select className='form-select' required name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Choose a Category</option>
                        {categories.map((item) => (
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                    <input type="number" className="form-input" placeholder='Enter Product Stock' required name="stock" value={stock} onChange={(e) => setStock(e.target.value)} />


                    <div className="file-input-container">
                        <input type="file" accept='image/*' className='form-input-file' multiple name="images" onChange={createProductImage} />
                    </div>

                    <div className="image-preview-container">
                        {imagePreview.map((img, index) => (
                            <img
                                src={img}
                                alt="Product Preview"
                                className="image-preview"
                                key={index}
                            />
                        ))}
                    </div>

                    {/* <button className="submit-btn">{loading?'Creating Product...':''}</button> */}
                    <button className="submit-btn" disabled={loading}>
                        {loading ? 'Creating Product...' : 'Create'}
                    </button>

                </form>
            </div>
            <Footer />
        </>
    )
}
export default CreateProduct
