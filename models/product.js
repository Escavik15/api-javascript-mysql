import { Schema, model } from 'mongoose';


const Products = new Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    date: { type: String, required: true },
    
})

export const Product = model('product', Products) 