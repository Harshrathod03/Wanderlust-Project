
const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");
const {saveRedirectUrl}=require("../middlewares/index.js");
const userController=require("../controllers/user.js");

router.route("/signup")
.get(userController.renderSignup)
.post(wrapAsync(userController.Signup));

router.route("/login")
.get(userController.preLogin)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.Login)

router.get("/logout",userController.Logout);
module.exports=router;