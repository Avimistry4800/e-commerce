import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import Product from './Product.js'
import  './Home.css'
import MetaData from '../layout/MetaData.js'
import {getProduct} from '../../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'



const Home = () => {

    const dispatch = useDispatch();
    const {loading,error, products, productsCount} = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    return (
       <Fragment>

           <MetaData title="ECOMMERCE"/>
            
            <div className='banner'>
                <p>Welcome to Ecommerce</p>
                <h1>FIND Amazing Products Below</h1>

                <a href="#container">
                    <button >
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>


        <h2 className="homeHeading">
            Featured Products
        </h2>
        <div className="container" id="container">
            {products && products.map( product => ( 
                <Product key={product._id} product={product} />
            ) )}
            
        </div>

       </Fragment>
    )
}

export default Home
