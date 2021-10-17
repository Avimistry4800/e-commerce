const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        maxLength: [8, "Product price is too long"],
    },
    rating: {
        type: Number,
        default: 0,
    },
    images: [
        {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }
    ],
   category: {
       type:String,
       required: [true, "Product category is required"],
    },

  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    maxLength: [4, "Product stock cannot exceed 4 caracters"],
  default: 0,
},
numOfReviews: {
    type: Number,
    default: 0,
},
reviews: [
    {
        name: {
            type:String,
            required: [true, "Name is required"],
        },
        rating: {
            type: Number,
            required: [true, "Rating is required"],
        },
        comment: {
            type: String,
            required: [true, "Comment is required"],
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Product", productSchema);