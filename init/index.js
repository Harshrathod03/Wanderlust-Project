const initdata=require("./data.js");
const Listing=require("../models/listing.js");
const mongoose = require('mongoose');
main()
.then((res)=>{
    console.log("connect to db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};
const initDB=async ()=>{
    await Listing.deleteMany({});
    initdata.data=initdata.data.map((obj)=>(
      {
        ...obj,owner:"687e44c1a12d51baa9ba026d"
      }
    ));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized ");
};
initDB();