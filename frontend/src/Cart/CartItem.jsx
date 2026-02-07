import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { addItemsToCart, removeErrors, removeItemFromCart, removeMessage } from '../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function CartItem({ item }) {  
    const { loading } = useSelector(state => state.cart)
    const dispatch=useDispatch(); 
    const [quantity, setQuantity] = useState(item.quantity)
    
    
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
            if (item.stock <= quantity) {
                toast.error('Cannot exceed available stock', {
                    position: 'top-center',
                    autoClose: 3000
                });
                return;
            }
            setQuantity(qty => qty + 1);
        } 

    const handleUpdate=()=>{
        if(loading) return; 
        if(quantity!==item.quantity){
        dispatch(addItemsToCart({id:item.product,quantity})) 
        }
    } 


    const handleRemove=()=>{
        if(loading) return; 
        dispatch(removeItemFromCart(item.product))
    };

    return (
        <div className="cart-item">
            <div className="item-info">
                <img src={item.image} alt="Product image" className='item-image' />
                <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price"><strong>Price:</strong>{item.price.toFixed(2)}/-</p>
                    <p className="item-quantity"><strong>Quantity: </strong>{item.quantity}</p>
                </div>
            </div>

            <div className="quantity-controls">
                <button className="quantity-button decrease-btn" 
                onClick={decreaseQuantity} disabled={loading}>-</button>
                <input type="number" value={quantity} 
                    className='quantity-input' readOnly min="1" />
                <button className='quantity-button increase-btn' 
                    onClick={increaseQuantity} disabled={loading}>+</button>
            </div>

            <div className="item-total">
                <span className="item-total-price">{(item.price * item.quantity).toFixed(2)}/-</span>
            </div>
            <div className="item-actions">
                <button className="update-item-btn" onClick={handleUpdate} disabled={loading || quantity===item.quantity}>{loading?'Updating':'Update'}</button>
                <button className="remove-item-btn" disabled={loading} onClick={handleRemove}>Remove</button>
            </div>
        </div>
    )
} 