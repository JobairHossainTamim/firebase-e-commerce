import React, { useEffect, useState } from 'react';
import Layout from './../../Components/Layout/Layout';
import { collection, addDoc, getDocs, setDoc, doc, deleteDoc, } from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";
import fireDb from './../../Firebase/fireConfig';


const Admin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        imageURL: "",
        category: "",
        description: "",
    });

    const [show, setShow] = useState(false);
    const [add, setAdd] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            setLoading(true);
            const users = await getDocs(collection(fireDb, "products"));
            const productsArray = [];
            users.forEach((doc) => {
                const obj = {
                    id: doc.id,
                    ...doc.data(),
                };

                productsArray.push(obj);
                setLoading(false);
            });

            setProducts(productsArray);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrdersData();
    }, []);

    async function getOrdersData() {
        try {
            setLoading(true);
            const result = await getDocs(collection(fireDb, "orders"));
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false);
            });
            console.log(ordersArray);
            setOrders(ordersArray);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const editHandler = (item) => {
        setProduct(item);
        setShow(true);
    };

    const updateProduct = async () => {
        try {
            setLoading(true);
            await setDoc(doc(fireDb, "products", product.id), product);

            handleClose();
            toast.success("Product updated successfully");
            window.location.reload();
        } catch (error) {
            toast.error("Product update failed");
            setLoading(false);
        }
    };

    const addProduct = async () => {
        try {
            setLoading(true);
            await addDoc(collection(fireDb, "products"), product);
            handleClose();
            toast.success("Product added successfully");
            window.location.reload();
        } catch (error) {
            toast.error("Product add failed");
            setLoading(false);
        }
    };

    const addHandler = () => {
        setAdd(true);
        handleShow();
    };

    const deleteProduct = async (item) => {
        try {
            setLoading(true);
            await deleteDoc(doc(fireDb, "products", item.id));
            toast.success("Product deleted successfully");
            getData();
        } catch (error) {
            toast.failed("Product delete failed");
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <Tabs
                        defaultActiveKey="products"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="products" title="Products">
                            <div className="d-flex justify-content-between">
                                <h3>Products List</h3>
                                <button onClick={addHandler}>ADD PRODUCT</button>
                            </div>
                            <table className="table mt-3">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>
                                                    <img src={item.imageURL} height="80" width="80" alt='empty' />
                                                </td>

                                                <td>{item.name}</td>
                                                <td>{item.description}</td>
                                                <td>{item.category}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <FaTrash
                                                        color="red"
                                                        size={20}
                                                        onClick={() => {
                                                            deleteProduct(item);
                                                        }}
                                                    />

                                                    <FaEdit
                                                        onClick={() => editHandler(item)}
                                                        color="blue"
                                                        size={20}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        {add === true ? "Add a product" : "Edit Product"}
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {" "}
                                    <div className="register-form">
                                        <input
                                            type="text"
                                            value={product.name}
                                            className="form-control"
                                            placeholder="name"
                                            onChange={(e) =>
                                                setProduct({ ...product, name: e.target.value })
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={product.description}
                                            className="form-control"
                                            placeholder="description"
                                            onChange={(e) =>
                                                setProduct({ ...product, description: e.target.value })
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={product.imageURL}
                                            placeholder="image url"
                                            className="form-control"
                                            onChange={(e) =>
                                                setProduct({ ...product, imageURL: e.target.value })
                                            }
                                        />
                                        <input
                                            type="number"
                                            value={product.price}
                                            className="form-control"
                                            placeholder="price"
                                            onChange={(e) =>
                                                setProduct({ ...product, price: e.target.value })
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={product.category}
                                            className="form-control"
                                            placeholder="category"
                                            onChange={(e) =>
                                                setProduct({ ...product, category: e.target.value })
                                            }
                                        />

                                        <hr />
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button>Close</button>
                                    {add ? (
                                        <button onClick={addProduct}>SAVE</button>
                                    ) : (
                                        <button onClick={updateProduct}>SAVE</button>
                                    )}
                                </Modal.Footer>
                            </Modal>
                        </Tab>
                        <Tab eventKey="orders" title="Orders">
                            {orders.map((order, index) => {
                                return (
                                    <table className="table mt-3 order" key={index}>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.cartItems.map((item,index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img src={item.imageURL} height="80" width="80" alt='img' />
                                                        </td>

                                                        <td>{item.name}</td>
                                                        <td>{item.price}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                );
                            })}
                        </Tab>
                        <Tab eventKey="contact" title="Users" disabled></Tab>
                    </Tabs>
                </div>
            </div>
        </Layout>
    );
};

export default Admin;