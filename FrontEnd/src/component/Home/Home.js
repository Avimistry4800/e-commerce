import React, { Fragment } from 'react'
import { CgMouse } from 'react-icons/cg'
import Product from './Product.js'
import  './Home.css'



const product={
    name: 'Redmi Note 8 Pro',
    price: '$1299',
    _id: '1',
    images: [{
        url: 'https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-8-pro-0.jpg'
    }]
}

const Home = () => {
    return (
       <Fragment>
            
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
