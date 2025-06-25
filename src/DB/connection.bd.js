import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('blogAppSequelize', 'root', '', {
    host: 'localhost',
    dialect: "mysql"
})

export async function checkDBconnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

export const syncDBconnection = async () => {
    try {
        await sequelize.sync({ alter: false , force: false })
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.log("😪😪😪😪😪😪 Database sync failed:", error);

    }
}