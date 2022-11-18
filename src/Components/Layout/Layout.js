import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './Layout.css';
import Loader from './../Loader/Loader';
const Layout = (props) => {
    return (
        <div>
            {
                props.loading && (
                    <Loader/>
                )
            }
            <Header></Header>
            <div className='content'>{props.children}</div>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Layout;