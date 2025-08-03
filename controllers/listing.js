const Listing=require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
module.exports.index=async (req,res)=>{
    
    const alllistings=  await Listing.find({});
    console.log(alllistings);
     res.render("listings/index",{alllistings});
 };
 module.exports.renderNewForm=(req,res)=>{
     
      res.render("listings/new.ejs");
  };
  module.exports.createListing = async (req, res) => {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();
  
    const { title, description, price, location, country } = req.body.listing;
  
    const newListing = new Listing({
      title,
      description,
      price,
      location,
      country,
    });
  
    newListing.owner = req.user._id;
  
    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }
  newListing.geometry=response.body.features[0].geometry;
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New listing is created");
    res.redirect("/listings");
  };
  
module.exports.showListing=async (req,res)=>{
     let {id}=req.params;
   let listing= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
   if(!listing){
    req.flash("error"," Your lisitng does not exist");
    return res.redirect("/listings");
   }
   res.render("listings/show.ejs",{listing,  currUser: req.user,
    mapToken: process.env.MAP_TOKEN});
 };
 module.exports.editLisitng=async (req,res)=>{
      let {id}=req.params;
    let listing= await Listing.findById(id);
    res.render("listings/edit",{listing})
  };
  module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
  
    let { listing: updatedListingData } = req.body;
    let listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }
  
   
    const { title, description, price, location, country } = req.body.listing;
    listing.title = title;
    listing.description = description;
    listing.price = price;
    listing.location = location;
    listing.country = country;
    listing.set(updatedListingData);
    if (updatedListingData.location) {
      const geoData = await geocodingClient
        .forwardGeocode({
          query: updatedListingData.location,
          limit: 1,
        })
        .send();
      listing.geometry = geoData.body.features[0].geometry;
    }

    if (req.file) {
      listing.image = { url: req.file.path, filename: req.file.filename };
    }
  
 
    await listing.save();
  
    req.flash("success", "Listing is updated");
    res.redirect("/listings");
  };
  
module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," lisitng is deleted");
    res.redirect("/listings");
};