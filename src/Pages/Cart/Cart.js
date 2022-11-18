import React, { useEffect, useState } from 'react';
import Layout from './../../Components/Layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import cartReducer from './../../Redux/cart/cartReducer';
import { FaTrash } from 'react-icons/fa';
import './cart.css';
import PlaceOrder from './../../Components/PlaceOrder/PlaceOrder';

const Cart = () => {
    const { cartItems } = useSelector(state => state.cartReducer);
    const dispatch = useDispatch();
    const [totalAmount,setTotalAmount]=useState(0);
    const [loading, setLoading] = useState(false);
    // // modals
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteFromCart = (data) => {
        setLoading(true)
        dispatch({ type: "DELETE_FROM_CART", payload: data })
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true);
        localStorage.setItem("cartItems",JSON.stringify(cartItems));
        setLoading(false)
    },[cartItems])

    // for Total Amount
    useEffect(() =>{
        let temp=0;
        cartItems.forEach(item => {
            temp=temp+item.price;
        });
        setTotalAmount(temp);
    },[cartItems]);




    return (
        <Layout loading={loading}>
            <div className='container'>
                <div className='row justify-content-center'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item ,index) => {
                                return (
                                    
                                    <tr key={index}>
                                        <td><img src={item.imageURL} alt="img" height='80' width='80'></img></td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td><FaTrash onClick={() => deleteFromCart(item)}></FaTrash></td>
                                    </tr>
                                  
                                )
                            })}
                        </tbody>
                    </table>

                    <div className='d-flex justify-content-end'>
                        <h1 className='total-amount'>Total amount: {totalAmount} tk/-</h1>
                            
                    </div>
                    <div className='d-flex justify-content-end mt-3'>
                        <button onClick={()=>setShow(true)}>Place Order</button>
                            
                    </div>
                </div>
            </div>

            {
                show &&(<PlaceOrder show={show} handleClose={handleClose}></PlaceOrder>)
            }
            
        </Layout>
    );
};

export default Cart;