const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js");
const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isReviewAuthor}=require("../middlewares/index.js");
const reviewController=require("../controllers/review.js");
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};
//reviews route
router.post("/", isLoggedIn,validateReview, wrapAsync(reviewController.createReview));
//review dlete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview));
module.exports=router;