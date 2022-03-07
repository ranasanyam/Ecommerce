import React, { Fragment, useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useDispatch, useSelector} from 'react-redux';
import { getProductDetails, newReview, clearErrors } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';


const ProductDetails = () => {
    const params = useParams();
    const alert = useAlert();;
    
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen]= useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    

    const { product, loading, error } = useSelector(state => state.productDetails);

    const { success, error: reviewError } = useSelector(state => state.newReview);

    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity));
        alert.success("Item Added To Cart");
    }
    
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if(success) {
            alert.success('Review Submitted Successfully!');
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(params.id));
    }, [dispatch, alert, error, params, reviewError, success]);

    const options = {
        size: 'large',
        value: product.ratings,
        readOnly: true,
        precision: 0.5
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

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }
    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", params.id);

        dispatch(newReview(myForm));
        setOpen(false);
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
                    <Rating {...options} />
                    <span className="detailsBlock-2-span">({product.numOfReviews} Reviews)</span>
                </div>
                <div className="detailsBlock-3">
                    <h1>{`Rs${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button onClick={decreaseQuantity}>-</button>
                            <input readOnly value={quantity} type="number" />
                            <button onClick={increaseQuantity}>+</button>
                        </div>{" "}
                        <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler}>Add To Cart</button>
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
                    <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                </div>
                </div>
                
              </div>
                <h3 className="reviewsHeading">REVIEWS</h3>
                <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                        <Rating 
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                        />
                        <textarea
                        className="submitDialogTextArea"
                        cols="30"
                        rows='5'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={submitReviewToggle}>Cancel</Button>
                        <Button color="primary" onClick={reviewSubmitHandler} >Submit</Button>
                    </DialogActions>
                </Dialog>
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
