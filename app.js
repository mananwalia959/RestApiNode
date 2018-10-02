const express= require('express');
const app =express();
const morgan = require('morgan');
const bodyParser=require('body-parser');
const mongoose =require('mongoose');
var cors = require('cors');

//importing routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//Mongoose Database
mongoose.connect(
    'mongodb://127.0.0.1:27017/restfulapi',
    {
        useNewUrlParser: true,
    }
)

//Middlewares
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());





//Routes used
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next) => {
    res.status(error.status|| 500);
    res.json({
        error:{
            message:error.message
        }
    })

})



//  app hosted
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
