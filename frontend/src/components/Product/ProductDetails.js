import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import {useeSelector, useDispatch, useSelector} from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams();
    console.log(params);
    const dispatch = useDispatch();

    const { product, loading, error } = useSelector(state => state.productDetails);
    
    useEffect(() => {
        dispatch(getProductDetails(params.id));
    }, [dispatch]);

  return (
      <Fragment>
          <div className="ProductDetails">
            <div>
                <Carousel>
                    {product.images && 
                    product.images.map((item, i) => (
                        <img  
                        className="CarouselImage"
                        key={item.url}
                        src={item.url}
                        alt={`${i} Slide`}
                        />
                    ))}
                </Carousel>
            </div>
          </div>
      </Fragment>
  )
};

export default ProductDetails;
