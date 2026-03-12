const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const productRoutes = require("./routes/ProductRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use("/api", productRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
 console.log(`Server running on http://localhost:${PORT}`);
});