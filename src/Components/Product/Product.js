import React, { useEffect, useState } from 'react';
import './Product.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cartReducer from './../../Redux/cart/cartReducer';

const Product = ({ products }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cartReducer);


    const addToCart = (product) => {

        dispatch({ type: "ADD_TO_CART", payload: product })

    }
    useEffect(() => {

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

    }, [cartItems])

    return (
        <div className='m-2 p-2 product position-relative'>
            <div className='product-content'>
                <div className='text-center'>
                    <img className='product-img' src={products.imageURL} alt={products.imageURL}></img>
                </div>
                <p>{products.name}</p>
                <div className='product-actions'>
                    <h2>Price: {products.price} Tk</h2>
                    <div className='d-flex'>
                        <button className='mx-2' onClick={() => addToCart(products)}>Add To Cart</button>
                        <button onClick={() => { navigate(`/productInfo/${products.id}`) }}>View</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;