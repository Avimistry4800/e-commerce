import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Header from "./component/layout/Header/Header.js";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/ProductDetails/ProductDetails.js";



function App() {

  React.useEffect (() => {
    WebFont.load({
        google: {
            families: ['Roboto:300,400,500,700',"Droid Sans","Chilanka"]
        }
    });

}, []);


    return(
    <Router>
        <Header />
       
        {/* <Route exact path="/" component={Home} /> */}

        <Routes >
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element= {<ProductDetails />}/>

    
        
      </Routes >
        
        <Footer />
      
    </Router>)
    
}

export default App;
