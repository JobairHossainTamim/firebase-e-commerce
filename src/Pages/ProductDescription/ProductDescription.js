import React, { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import fireDb from '../../Firebase/fireConfig';
import { useParams } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import './ProductDescription.css';
import { useDispatch, useSelector } from 'react-redux';
import cartReducer from './../../Redux/cart/cartReducer';

const ProductDescription = () => {
    const [product, setProduct] = useState();
    const params = useParams();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cartReducer);
    const [loading, setLoading] = useState(false);

    async function getData() {
        setLoading(true)
        try {
            
            const productTemp = await getDoc(doc(fireDb, 'products', params.productId))
            setProduct(productTemp.data());
            setLoading(false)
        } catch (error) {
            console.log(`Description :` + error);
            setLoading(false)
        }
    }


    useEffect(() => { getData() }, []);

    // Add Data 

    const AddCart = (product) => {
        setLoading(true)
        dispatch({ type: "ADD_TO_CART", payload: product })
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        setLoading(false)
    }, [cartItems])

    return (
        <Layout loading={loading}>

            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        {
                            product && (
                                <div>
                                    <p>{product.name}</p>
                                    <img src={product.imageURL} alt={product.imageURL} className="product-info-img" />
                                    <hr />
                                    <p>{product?.description}</p>
                                    <div className='d-flex justify-content-end mt-3'>
                                        <button onClick={() => AddCart(product)}>Add To cart</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDescription;