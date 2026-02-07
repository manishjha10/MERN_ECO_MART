import React from 'react'
import '../CartStyles/Cart.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { containerClasses } from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { removeMessage } from '../features/cart/cartSlice'



function Cart() { 
    const cartItems = useSelector(state => state.cart?.cartItems || [])
    const dispatch = useDispatch() 
    const { success, message } = useSelector(state => state.cart)
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    )
   const tax = subtotal*0.18;
    const ShippingCharges =subtotal>500?0:50
    const total = subtotal + ShippingCharges +tax;


    useEffect(() => {
        if (success && message) { 
            toast.success(message, {
                position: 'top-center',
                autoClose: 3000,
                toastId: 'cart-toast'
            })
            dispatch(removeMessage())
        }
    }, [success, message, dispatch])

    
    const navigate=useNavigate();
    const checkoutHandler=()=>{
        navigate('/login?redirect=/shipping')
    }


  return (
    <> 
    <Navbar />
    <PageTitle title="Your Cart" />
    {cartItems.length===0?(<div className='empty-cart-container'>
     <p className="empty-cart-message">Your cart is empty</p>
              <Link to="/products" className="viewProducts">View Products </Link>
    </div>
    ): (<>
              
             
              <div className="cart-page">
                  <div className="cart-items">
                      <div className="cart-items-heading">Your Cart</div>
                      <div className="cart-table">
                          <div className="cart-table-header">
                              <div className="header-product">Product</div>
                              <div className="header-quantity">Quantity</div>
                              <div className="header-total item-total-heading">
                                  Item Total</div>
                              <div className="header-action item-total-heading">Action</div>
                          </div>

                          {/* Caart Items */}
                          {cartItems && cartItems.map(item => <CartItem item={item} key={item.name} />)}
                      </div>
                  </div>

                  {/* Price summary */}
                  <div className="price-summary">
                      <h3 className="price-summary-heading">Price Summary</h3>
                      <div className="summary-item">
                          <p className="summary-label">Subtotal :</p>
                          <p className="summary-value">{subtotal}/-</p>
                      </div>
                      <div className="summary-item">
                          <p className="summary-label">Tax (18%): </p>
                          <p className="summary-value">{tax}/-</p>
                      </div>
                      <div className="summary-item">
                          <p className="summary-label">Shipping (18%): </p>
                              <p className="summary-value">{ShippingCharges}/-</p>
                      </div>
                      <div className="summary-total">
                          <p className="total-label">Total (18%): </p>
                            <p className="total-value">{total.toFixed(2)}/-</p>
                      </div>
                      <button className="checkout-btn" onClick={checkoutHandler}>Proceed to Checkout</button>
                  </div>
              </div>

            
          </>)}
          <Footer />
     </>
 
  )
}

export default Cart