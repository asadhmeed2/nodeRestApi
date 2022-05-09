const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./app');
const productRoute = require('./api/routes/products');
const ordersRoute = require('./api/routes/orders');
const userRoute = require('./api/routes/user')
const { errors } = require('./middleware/appMiddleware');

require('dotenv').config()

const app = express();

const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_CONNECTION,()=>{
  console.log("connecting to MongoDB");
})
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use(cors());

app.use(morgan('dev'));

app.use('/uploads',express.static('uploads'));

app.use('/',routes)

app.use('/products',productRoute);

app.use('/orders',ordersRoute);

app.use('/users',userRoute);

app.use((req, res, next) => errors(req, res, next,"Not found",404));

app.use((error,req, res, next) =>{
  res.status(error.status || 500).json({
    error : {
       message :error.message
    }
  })
})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

