
import jwt  from 'jsonwebtoken';
import 'dotenv/config'

const secret = process.env.SECRET;

const jsonWebTokenMiddleware =(payload)=>{
    
    const token = jwt.sign( {payload }, secret, { expiresIn: 60 * 60 })
   
    return token
}

export default jsonWebTokenMiddleware;