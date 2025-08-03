const mongoose = require("mongoose");
const Review = require("./reviews.js");
const reviews = require("./reviews.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        filename: String,
        url: {
            type: String,
          
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        validate: {
            validator: function (v) {
                return /^[A-Za-z\s]+$/.test(v); // only letters and spaces
            },
            message: props => `"${props.value}" is not a valid location name`
        }
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        validate: {
            validator: function (v) {
                return /^[A-Za-z\s]+$/.test(v); // only letters and spaces
            },
            message: props => `"${props.value}" is not a valid country name`
        }
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ["Point"], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    },
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});

    }
});

module.exports = mongoose.model("Listing", listingSchema);

