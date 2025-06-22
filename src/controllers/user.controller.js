//este archivo tiene la lógica para cada operación CRUD.
import User from '../models/user.js';

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser); // 201 Created
    } catch (error) {
        // Manejo de errores específicos, por ejemplo, si el email ya existe
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El email ya está registrado.' }); // 409 Conflict
        }
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] } // Excluye la contraseña
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const [updatedRowsCount] = await User.update(req.body, {
            where: { id }
        });

        if (updatedRowsCount > 0) {
            // si se actualizó al menos una fila, buscar el usuario actualizado
            const updatedUser = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });

            if (updatedUser) {
                res.json(updatedUser); // enviar el usuario actualizado al cliente
            } 
        } else {
            res.status(404).json({ message: 'Usuario no encontrado o no hubo cambios para actualizar.' });
        }
    } catch (error) {
        // Manejo de errores específicos (ej. si el email ya existe en otra cuenta)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'El email ya está registrado para otro usuario.' });
        }
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};


// Eliminar un usuario
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await User.destroy({
            where: { id }
        });
        if (deletedRowCount > 0) {
            res.status(204).send(); // 204 No Content (indica éxito sin devolver contenido)
        } else {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
};
