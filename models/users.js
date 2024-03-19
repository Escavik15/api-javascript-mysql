import { Schema, model } from 'mongoose';


const Users = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,        
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlenght: 15,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    } ,
    avatar: {
        type: String,
        trim: true,
        default: 'assets/default.jpeg' ,
   } ,
  
})

 export const User = model('user', Users) 

 