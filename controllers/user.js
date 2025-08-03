
const User=require("../models/user.js");
module.exports.renderSignup=(req,res)=>{
    res.render("user/signup.ejs")
};
module.exports.Signup=async(req,res)=>{
  try{
    let{username,email,password}=req.body;
    const newUser=new User({email,username});
  const registeredUser=await User.register(newUser,password);
  console.log(registeredUser);
  req.login(registeredUser,(err)=>{
    if(err){
         return next(err)
    }
    req.flash("success","The user is successfully registered");
  res.redirect("/listings");
  })
  
  } catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
  }
};
module.exports.preLogin=(req,res)=>{
    res.render("user/login.ejs");
};
module.exports.Login=async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust! You are logged in!");
   const redirectUrl=res.locals.redirectUrl ||"/listings";
   res.redirect(redirectUrl);
   };
   module.exports.Logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/listings");
    })
};