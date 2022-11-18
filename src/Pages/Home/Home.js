import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { collection, getDocs } from 'firebase/firestore';
import fireDb from '../../Firebase/fireConfig';
import Product from './../../Components/Product/Product';
import './Home.css'


const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [filterType, setFilterType] = useState('')


    useEffect(() => {
        getData()
    }, []);


    async function getData() {
        setLoading(true);
        try {
            const productsData = await getDocs(collection(fireDb, "products"));
            const productArray = [];
            productsData.forEach((doc) => {
                const obj = {
                    id: doc.id,
                    ...doc.data(),
                }
                productArray.push(obj)
                setLoading(false);
            });

            setProducts(productArray);

        }
        catch (error) {
            console.log(error)
            setLoading(false);
        }

    }

    // // product
    //  function addProduct(){

    //     product.map(async(product) => {
    //         try {
    //             await addDoc(collection(fireDb,"products"),product)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     })
    // }



    return (
        <Layout loading={loading}>
            <div className='container'>
                <div className="d-flex w-50 align-items-center my-3 justify-content-center">
                    <input type="text" value={searchKey} onChange={(e) => { setSearchKey(e.target.value) }} className='form-control' placeholder='search Item' />
                    <select className='form-control mx-2 mt-3'
                        value={filterType}
                        onChange={(e) => { setFilterType(e.target.value) }}>
                        <option value="">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="mobiles">Mobile</option>
                        <option value="fashion">Fashions</option>
                    </select>
                </div>
                <div className='row'>


                    {
                        products.filter(object => object.name.toLowerCase().includes(searchKey.toLowerCase()))
                            .filter(object => object.category.toLowerCase().includes(filterType)).map((products) => {
                                return <div key={products.id} className='col-md-4'>
                                    <Product products={products} ></Product>
                                </div>
                            })
                    }

                </div>
            </div>
        </Layout>
    );
};

export default Home;