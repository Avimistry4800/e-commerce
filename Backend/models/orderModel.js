const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: { 
            type: String, 
            required: true 
        },
        state: { 
            type: String, 
            required: true 
        },
        zip: { 
            type: String, 
            required: true 
        },
        country: { 
            type: String, 
            required: true 
        },
        pinCode: { 
            type: true,
             required: true 
            },
        phoneNo: { 
            type: number, 
            required: true 
        },
    },
});
