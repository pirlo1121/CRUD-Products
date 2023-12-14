 const ProductModel = require( '../models/product' );

 async function registerProduct(){
    return await ProductModel.create( prodcut );
 }

 async function getAllProduct(){
    return await ProductModel.find();
 }

 async function getOneProductById( id ){
    return await ProductModel.findById( id );
 }

 async function removeOneProductById(id ){
    return await ProductModel.findOneAndRemove({_id: id});
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
    getAllProduct,
    getOneProductById,
    removeOneProductById,
    updateOneProductById
 }