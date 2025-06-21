import sequelize from "./database.js";

const initDB= async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a MySQL establecida.");
    await sequelize.sync(); //repasar y entender mejor el async await
  } catch (error) {
    console.log("Error al conectar a la base de datos:", error);
  }
};

export default initDB;