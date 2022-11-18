import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import cartReducer from './../../Redux/cart/cartReducer';
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import fireDb from './../../Firebase/fireConfig';
function PlaceOrder({ show, handleClose }) {
    const { cartItems } = useSelector(state => state.cartReducer);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch=useDispatch();

    const placeOrder = async () => {
      

        const addressInfo = {
            name,
            address,
            pinCode,
            phoneNumber,
          };
          const orderInfo = {
            cartItems,
            addressInfo,
            email:JSON.parse(localStorage.getItem('currentUser')).user.email,
            userId:JSON.parse(localStorage.getItem('currentUser')).user.uid,
          }
          try {
            setLoading(true);
            const result = await addDoc(collection(fireDb, "orders"), orderInfo);
            setLoading(false);
            toast.success("Order placed successfully");
            handleClose();
            console.log(result);

            dispatch({type:'removeAllData'});

          } catch (error) {
            setLoading(false);
            toast.error("Order failed");
          }
          
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add your address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {" "}
                    <div className="register-form">
                        <h2>Register</h2>

                        <hr />

                        <input
                            type="text"
                            className="form-control"
                            placeholder="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <textarea
                            className="form-control"
                            rows={3}
                            type="text"
                            placeholder="address"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                        <input
                            className="form-control"
                            placeholder="pincode"
                            type="number"
                            value={pinCode}
                            onChange={(e) => {
                                setPinCode(e.target.value);
                            }}
                        />

                        <input
                            type="number"
                            className="form-control"
                            placeholder="phone number"
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />

                        <hr />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleClose}>Close</button>
                    <button onClick={placeOrder}>ORDER</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PlaceOrder;
