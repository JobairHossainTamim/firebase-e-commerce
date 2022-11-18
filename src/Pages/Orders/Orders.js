import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Layout from './../../Components/Layout/Layout';
import fireDb from './../../Firebase/fireConfig';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const userId = JSON.parse(localStorage.getItem('currentUser')).user.uid

    useEffect(() => {
        getData()
    }, []);
    async function getData() {
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
    return (
        <Layout loading={loading}>
            <div className='container'>
                <div className='row'>
                <div className='p-2'>

   

{orders.filter(obj=>obj.userId === userId).map((order,index) => {
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
                  <img src={item.imageURL} height="80" width="80" alt='data' />
                </td>

                <td>{item.name}</td>
                <td>{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  })}
</div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;