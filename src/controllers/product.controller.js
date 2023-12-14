const { registerProduct, getAllProducts, getOneProductById, removeOneProductById, updateOneProductById } = require("../services/product.service");



const createProduct = async ( req, res ) => {
    const inputData = req.body;
    const payload = req.authUser;
    
    console.log(`data: ${inputData} payload: ${payload}`)

    if (inputData?.category?.length === 0)  delete inputData.category;

    inputData.userId = payload._id;

    try {
        const data = await registerProduct( inputData );
        res.status( 201 ).json({ok: true, data})
        
    } catch (error) {
        console.error( error );
        res.status( 500 ).json({ ok: false , msg: "Error al crear"});
    }
}

const getProducts = async( req, res ) =>{
    console.log( req.authUser );

    try {
        const data = await getAllProducts();
        res.status( 200 ).json({ ok: true, data});
        
    } catch (error) {
        console.error( error );
        res.status( 500 ).json({ok: false, msg: "error al obtener productos"})
        
    }
}

const getProductById = async( req, res ) => {
    const prodcut_id = req.params.id;

    try {
        const data = await getOneProductById( prodcut_id );
        res.status( 200 ).json({ ok: true, data });
        
    } catch (error) {
        console.error( error );
        res.status( 500 ).json({ ok: false, msg: "Error al obtener el producto" })
        
    }
}

const removeProductById = async (req, res ) => {
    const prodcut_id = req.params.id;

    try {
        const data = await removeOneProductById( prodcut_id )
        res.status( 204 ).json({ ok: true, data })
        
    } catch (error) {
        console.error( error );
        res.status( 500 ).json({ ok: false, msg: "Error al eliminar el producto"})
        
    }
}

const updateProductById = async ( req, res ) => {
    const product_id = req.params.id;
    const newdata = req.body;

    try {
        const data = await updateOneProductById( product_id, newdata);
        res.status( 206 ).json({ ok: true, newdata });
        
    } catch (error) {
        console.error( error );
        res.status( 500 ).json({ ok: false, msg: "Error al actualizar"})
        
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    removeProductById,
    updateProductById
}