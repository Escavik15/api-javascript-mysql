import { Router } from 'express';
import  { obtenerUsuarios, obtenerUsuario, actualizarUsuario, borrarUsuarios, crearUsuarios, login }  from '../controllers/users.js';
const router = Router();


router.get('/users', obtenerUsuarios )
router.get('/users/:id', obtenerUsuario )
router.get('/login', login )
router.post('/register', crearUsuarios )
router.put('/users/:id', actualizarUsuario )
router.delete('/users/:id', borrarUsuarios )


export default router;