const Product = require('../models/product.model')
const logger = require('../logger/logger')

exports.findAll = async(req,res) =>{
    console.log("Find all products");
    try{
        const result = await Product.find();
        res.status(200).json({status:true, data:result});
        logger.debug("Success in reading all products");
        logger.info("Success in reading all products");
    }catch(err){
        console.log(`Problem in reading products, ${err}`)
        logger.error(`Problem in reading all products, ${err}`);
    }
}

exports.findOne = async(req,res) =>{
    console.log("Find a product");

    const id = req.params.id;
    try{
        const result = await Product.findOne({_id: id})
        res.status(200).json({data: result}); 
        logger.debug("Success in reading product with id" + id);
        logger.info("Success in reading product with id" + id);
    }catch(err){
        console.log(err)
    }
}

exports.create = async(req,res) =>{
    console.log("Insert product")

    console.log(req.body);

    const newProduct = new Product({
       product: req.body.product,
       cost: req.body.cost,
       description: req.body.description,
       quantity: req.body.quantity
    });

    try{
        const result = await newProduct.save();
        res.status(200).json({data: result});
        console.log("Product saved");
    }catch(err){
        res.status(400).json({data: err})
        console.log("Problem while saving product");
    }
}

exports.update = async(req,res) => {
    const _id = req.params.id;

    console.log("Update product with id: ", _id);

    const updateUser = {
        product: req.body.product,
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity,
    }

    try{
        const result = await Product.findOneAndUpdate(
            {_id: _id},
            updateUser,
            {new: true}
        )
        res.status(200).json({data : result});
        console.log("Success in product update", _id);
    }catch(err){
        res.status(400).json({data:err})
        console.log("Problem in product update");
    }
}

exports.delete = async(req,res) =>{
    const _id = req.params.id;

    console.log("Delete product: ", _id);

    try{
        const result = await Product.findOneAndDelete({_id:_id})
        res.status(200).json({data: result});
        console.log("Product deleted", _id);
    }catch(err){
        res.json({data:err});
        console.log("Error in deleting");
    }
}