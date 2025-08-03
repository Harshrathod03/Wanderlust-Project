const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
   cloud_name:process.env.CLOUD_NAME,
   api_key:process.env.CLOUD_API,
   api_secret:process.env.CLOU_API_SECRET_KEY,

})
 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowerdFormats: ["png,jpg,jpeg,pdf"],
      
    },
  });
  module.exports={
    cloudinary,
    storage,
  };