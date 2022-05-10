const express = require('express');
const multer = require('multer');
const checkAuth = require('../../middleware/check-outh');
const { getAllProducts, addProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/product.controller');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null, `${file.originalname}`);
    }
});

const fileFilter =(req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const upload = multer({storage: storage, limits:{
    fileSize: 1024 * 1024 * 10,
    },fileFilter:fileFilter
});

const productRoute = express.Router();



productRoute.get('/',getAllProducts)

productRoute.post('/',upload.single('productImage'),checkAuth,addProduct)

productRoute.get('/:productId',getProductById)

productRoute.patch('/:productId',checkAuth,updateProduct)


productRoute.delete('/:productId',checkAuth,deleteProduct)

module.exports = productRoute;