import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; //la instancia de Sequelize

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false // el nombre es requerido
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // el email es requerido
        unique: true,     // el email debe ser único
        validate: {
            isEmail: true // valide que sea un formato de email válido
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false // La contraseña es requerida
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // Es requerido
        defaultValue: true // por defecto, un nuevo usuario está activo
    }
}
)
export default User;