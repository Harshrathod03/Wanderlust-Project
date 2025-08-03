const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js");
module.exports.createReview=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    newReview.author=req.user._id;
    // Push review's ObjectId into the listing's reviews array
    listing.reviews.push(newReview._id);

    await newReview.save();
    await listing.save();
    req.flash("success","New review is created");
    res.redirect(`/listings/${listing._id}`);
};
module.exports.deleteReview=async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review is deleted");
    res.redirect(`/listings/${id}`);
};