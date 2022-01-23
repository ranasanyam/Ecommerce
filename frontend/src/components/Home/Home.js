import React, { Fragment } from 'react';
import { CgMouse } from 'react-icons/all';
import './Home.css';
import Product from '../Product/Product.js';


const product = {
    name: 'Blue Tshirt',
    images: [{ url: "https://i.ibb.co/DRST11n/1.webp"}],
    price: '3000',
    _id: "sanyam"
};
const Home = () => {
    return (
        <Fragment>
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href="#container">
                    <button>
                        SCROLL <CgMouse />
                    </button>

                </a>
            </div>
            <h2 className="homeHeading">Featured Products</h2>
            <div className='container' id="container">
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </Fragment>
    )
}

export default Home
