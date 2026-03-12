const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/ProductRoutes");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/api", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
 console.log(`Server running on http://localhost:${PORT}`);
});