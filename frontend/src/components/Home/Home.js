import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/all';
import './Home.css';
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import { getProduct, clearErrors } from '../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';


const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {
        loading, 
        error, 
        products
    } = useSelector((state) => state.products);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());

        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);


    return (
        <Fragment>
            {loading ?<Loader /> :         
            <Fragment>
            <MetaData title="ECOMMERCE" />
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
                {products && products.map(prod => (
                    <ProductCard product={prod} />
                ))}
            </div>
            </Fragment>}
        </Fragment>
    )
}

export default Home
