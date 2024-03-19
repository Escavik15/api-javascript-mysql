import { Product } from "../models/product.js";



export const getProducts = async (req, res)=>{

    const allProducts = await Product.find();

    console.log(allProducts)

     res.status(200).json(allProducts);
}

export const getProduct = async (req, res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
}

export const createProducts = async (req, res)=>{
    const data = req.body;

    const newProduct = new Product(data);

    Product.create(newProduct)
   
    res.status(201).json(newProduct);

}

export const updateProduct = async (req, res)=>{
    const {id} = req.params;
    const data = req.body;
    const product = await Product.findByIdAndUpdate(id, data, {new: true});
    res.status(200).json(product);
}

export const deleteProduct = async (req, res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
}


