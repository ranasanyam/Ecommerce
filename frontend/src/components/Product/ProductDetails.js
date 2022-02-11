import React, { Fragment, useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useDispatch, useSelector} from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';

const ProductDetails = () => {
    const params = useParams();
    const alert = useAlert();;
    
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    

    const { product, loading, error } = useSelector(state => state.productDetails);

    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity));
        alert.success("Item Added To Cart");
    }
    
    useEffect(() => {
        if(error) {
            return alert.error(error);
        }
        dispatch(getProductDetails(params.id));
    }, [dispatch, alert, error, params]);

    const options = {
        edit: false,
        color: 'rgba(20, 20, 20, 0.1)',
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }
    const increaseQuantity = () => {
        if(product.Stock <= quantity) {
            return;
        }
        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity = () => {
        if(quantity <= 1) {
            return;
        }
        const qty = quantity - 1;
        setQuantity(qty);
    }

  return (
      <Fragment>
          {loading ? <Loader /> : (
              <Fragment>
                  <MetaData title={`${product.name} -- ECOMMERCE`} />
              <div className="ProductDetails">
                <div>
                    <Carousel className="carousel">
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
                <div>
                <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                    <ReactStars {...options} />
                    <span>({product.numOfReviews} Reviews)</span>
                </div>
                <div className="detailsBlock-3">
                    <h1>{`Rs${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly value={quantity} type="number" />
                            <button onClick={increaseQuantity}>+</button>
                        </div>{" "}
                        <button onClick={addToCartHandler}>Add To Cart</button>
                    </div>
                    <p>
                        Status:{" "}
                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                        </b>
                    </p>
                </div>
                <div className="detailsBlock-4">
                    Description: <p>{product.description}</p>
                    <button className="submitReview">Submit Review</button>
                </div>
                </div>
                
              </div>
                <h3 className="reviewsHeading">REVIEWS</h3>
                {product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                        {product.reviews && 
                           product.reviews.map((rev) => <ReviewCard review={rev} /> )
                        }
                    </div>
                ) : (
                    <p className="noReviews">No Reviews Yet</p>
                )}
          </Fragment>
          )}
      </Fragment>
      
  )
};

export default ProductDetails;
