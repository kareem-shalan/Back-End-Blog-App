import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('bjvisvfwlrb5lmjos4mr', 'uglvgflnshesl1yz', 'gCCTIZdq8NaUzHbt96rM', {
    host: 'bjvisvfwlrb5lmjos4mr-mysql.services.clever-cloud.com',
    dialect: "mysql",
    port: 3306,
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
        await sequelize.sync({ alter: false, force: false })
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.log("😪😪😪😪😪😪 Database sync failed:", error);

    }
}