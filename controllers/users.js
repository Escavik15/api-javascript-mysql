import {User} from "../models/users.js";
import bcrypt from "bcrypt";
import jsonWebTokenMiddleware from "../helpers/jwt.js";


//============ funcion para Crear un usuario ==============================================//  

export const crearUsuarios = async(req, res)=>{
    //evaluo que los campos obligatorios sean llenados en el formulario que envian
    if (!req.body.username  || !req.body.password  || !req.body.email ){ 
        return res.status(400).send({
            message : 'todos los campos son obligatorios'
        })
    }

    //evaluo que el email no se repita en la base de datos, si se repite envio un mensaje de error y no se crea el usuario.
    const query = User.where({ email: req.body.email });
    const userRepetido = await query.findOne();
    
    if( userRepetido != null ){
        return res.status(400).send({
            message : 'El email ya existe'
        })
    }else{
    
    // encripto la contraseña y guardo el usuario en la base de datos.   
      const pwd = bcrypt.hashSync(req.body.password, 10)

  
      
    // creo un objeto con los datos del usuario que se va a guardar en la base de datos y la contraseña encriptada.        
      const userHash = {
                username : req.body.username,
                password : pwd,
                email : req.body.email,
                avatar: req.body.avatar,
                
            }
    // creo el usuario en base al modelo que hemos creado.        
    const newUser = new User(userHash);      
    // guardo el usuario en la base de datos.        
    User.create(userHash)

    // si todo sale bien envio un mensaje de exito. 
    res.status(200).send({message : 'usuario creado con exito'} )
    
    }
}


//============ funcion para iniciar sesion ==============================================//  

export const login = async (req, res)=>{
   
   // desestructuramos los datos que vienen en el body de la peticion.
   const { email , password} = req.body
   
   // buscamos un usuario en la base de datos con el username ingresado.
   const user = await User.findOne({email})
   
   // verificamos si el usuario existe en la base de datos.
   if( !user ) { 
        return res.status(400).send({
            message : 'El email no existe'
        })
    }
    
    const token = jsonWebTokenMiddleware({
        username : user.username,
        id : user.id,
        
      })
      
    // comparamos la contraseña ingresada con la contraseña encriptada de la base de datos.
     const pwdComparacion = bcrypt.compareSync( password, user.password)
    // si la contraseña es incorrecta envio un mensaje de error.
    if( pwdComparacion === false ){
        return res.status(400).send({
            message : 'La contraseña es incorrecta'
        })
    }
    // si todo sale bien envio un mensaje de exito y el usuario.
     res.status(200).send({message : 'success', user : { username: user.username, email : user.email, avatar : user.avatar, id : user.id, token : token }})
}   


//============ funcion para obtener la lista de tosos usuarios ==============================================// 
export const obtenerUsuarios = async (req, res)=>{
    
    // buscamos todos los usuarios en la base de datos.
    const users = await User.find().exec()
    
    // si todo sale bien envio un mensaje de exito y la lista de usuarios.
    res.status(200).send({message : 'Lista de usuarios obtenida con exito' , users : users})
}


//============ funcion para obtener un usuario usando su ID ==============================================// 
export const obtenerUsuario = async (req, res)=>{

    const {id} = req.params;
    console.log(id)

    const user = await User.findById(id)

    res.status(200).send({message : 'un usuario', user})
}


//============ funcion para actualizar datos de un usuario ==============================================//

export const actualizarUsuario = async (req, res)=>{
  // Obtenemos el id del usuario a actualizar desde los parámetros de la solicitud.
  const {id} = req.params;
  
  // Verificamos que el id no sea nulo. Si es nulo, devolvemos un mensaje de error.
  if(id === null){
      return res.status(400).send({
          message : 'El id es requerido'
      })
  }

  // Buscamos el usuario en la base de datos con el id proporcionado.
  const user = await User.findById(id)
  // verificamos que el usuario exista en la base de datos. Si no se encuentra, devolvemos un mensaje de error.
    if(user === null){
        return res.status(400).send({
            message : 'El usuario no encontrado'
        })
   }

   // si obtenemos un usuario valido, continuamos actualizando los datos
   if(user){

    // encripto la contraseña y guardo el usuario en la base de datos.
    const pwd = bcrypt.hashSync(req.body.password, 10)

    // actualizo el usuario en la base de datos.
    const actualizar = await User.findByIdAndUpdate(id, { username: req.body.username, email : req.body.email, password : pwd, avatar : req.body.avatar  } , {new : true})

    // si todo sale bien envio un mensaje de exito y el usuario.
    res.status(200).send({message : 'update usuario' , update: actualizar })  
    }else{
        res.status(400).send({message : 'Error al intentar actualizar los datos, verifica los campos ingresados' })
    }
}



//============ funcion para borrar un usuario por su ID ==============================================// 

export const borrarUsuarios = async (req, res)=>{

    const {id} = req.params;

    if (id === null){
        return res.status(400).send({
            message : 'El id es requerido'
        })
    }

    if(id){
        await User.findByIdAndDelete(id)
        res.status(200).send({message : 'usuario delete' })
    }
}












