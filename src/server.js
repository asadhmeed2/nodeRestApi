const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./app');
const productRoute = require('./api/routes/products');
const ordersRoute = require('./api/routes/orders');
const { errors } = require('./middleware/appMiddleware');


const app = express();

const port = process.env.PORT || 3000

app.use(cors());

app.use(morgan('dev'));

app.use('/',routes)

app.use('/products',productRoute);

app.use('/orders',ordersRoute);

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

