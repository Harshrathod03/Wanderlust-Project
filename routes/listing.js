
const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const {isLoggedIn,isOwner}=require("../middlewares/index.js");
const lisitngController=require("../controllers/listing.js")
const multer=require('multer');
const {storage}=require("../cloudconfig.js");
const uploads=multer({storage});
const validateListing=(req,res,next)=>{
    let { error } = listingSchema.validate(req.body); 
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else{
        next();
    }
}
router.route("/")
.get(wrapAsync(lisitngController.index))
.post(isLoggedIn, uploads.single('listing[image]'),validateListing, wrapAsync(lisitngController.createListing));
 //  new route
 router.get("/new",isLoggedIn,lisitngController.renderNewForm);
router.route("/:id")
.get(wrapAsync(lisitngController.showListing))
.put(isLoggedIn,isOwner, uploads.single('listing[image]'),validateListing,wrapAsync(lisitngController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(lisitngController.deleteListing))

 //edit route
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(lisitngController.editLisitng));

 module.exports=router;