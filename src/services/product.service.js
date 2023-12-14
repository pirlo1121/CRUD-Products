 const ProductModel = require( '../models/product' );

 async function registerProduct( product ){
    return await ProductModel.create( product );
 }

 async function getAllProducts(){
    return await ProductModel.find();
 }

 async function getOneProductById( id ){
    return await ProductModel.findById( id );
 }

 async function removeOneProductById(id ){
    return await ProductModel.findByIdAndDelete({_id: id});
 }

 async function updateOneProductById(id , updateProduct){
    return await ProductModel.findOneAndUpdate(
        { _id: id},
        updateProduct,
        {new: true}
    );
 }

 module.exports = {
    registerProduct,
    getAllProducts,
    getOneProductById,
    removeOneProductById,
    updateOneProductById
 }