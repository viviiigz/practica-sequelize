//este archivo define las rutas y las enlazará con las funciones del controlador
import { Router } from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js'; // Ajusta la ruta si es necesario

const router = Router();

// Rutas para usuarios
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
