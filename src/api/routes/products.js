const express = require('express');
const { default: mongoose } = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null, `${file.originalname}`);
    }
});

const fileFilter =(req, file, cb) =>{
    // reject a file
    //cb(null,false)
    //accept a file
    //cb(null,true)
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const upload = multer({storage: storage, limits:{
    fileSize: 1024 * 1024 * 8,
    },fileFilter:fileFilter
});

const productRoute = express.Router();
const ProductModel = require('../models/product.model')


productRoute.get('/',async (req, res, next) =>{
    try{
        const results= await ProductModel.find({}).select('name price productImage');
        const response ={
            count: results.length,
            products: results,
        }
        
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
})

productRoute.post('/',upload.single('productImage'),async (req, res, next) =>{
    try{
        console.log(req.file);
        const product = await ProductModel.create({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: parseInt(req.body.price),
            productImage: req.file.path
        })
        res.status(200).json({
            message:"adding a product",
            createdProduct:product
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            error: err
        });
    }
})

productRoute.get('/:productId',async (req, res, next) =>{
    const id = req.params.productId;
    console.log(id);
    try{
        const result = await ProductModel.findById(id).exec()
        if(result){
            res.status(200).json(result);
        }else {
            res.status(404).json({
                message: "404 not found"
            })
        }
    }
   catch(err){
        console.error(err.message);
        res.status(500).json({
            error: err
        });
    }
})

productRoute.patch('/:productId',async (req, res, next) =>{
    const id = req.params.productId;
    const data = req.body;
    try {
        let product =await ProductModel.findById(id)
        if(!product){
            return res.status(404).json({
                message:"product does not exist!"
            })
        }
        product._doc ={...product._doc,...data}
        console.log(product,data);
        const productM = new ProductModel(product)
        const result = await productM.save();
        res.status(200).json({
            message:"Updated product!"
        })
    }catch(err){
        console.log(err.message);
        res.status(501).json({
            message:"bad request"
        })
    }
})


productRoute.delete('/:productId',async(req, res, next) =>{
    const id = req.params.productId;
    try{
        await ProductModel.remove({_id:id},)
        res.status(200).json({
            message:`product with id ${id} deleted successfully`
        })
    }catch(err){
        console.log(err.message);
        res.status(404).json({
            message:`Product with id ${id} not found`
        })
    }
    
})

module.exports = productRoute;