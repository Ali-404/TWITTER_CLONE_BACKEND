import { readdirSync } from "fs";
import { basename, dirname } from "path";
import { Sequelize, DataTypes } from "sequelize";
import { fileURLToPath } from 'url';
import database from "../config/config_js.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const db = {};
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{port: process.env.DB_PORT,host:process.env.DB_HOST,dialect:'mysql', module: import('mysql2')});

export default  (async () => {
  const files = readdirSync(__dirname)
    .filter(
      (file) => file.indexOf('.') !== 0
      && file !== basename(__filename)
      && file.slice(-3) === '.js',
    );

  for await (const file of files) {
    const model = await import(`./${file}`);
    const namedModel = model.default(sequelize, DataTypes);
    db[namedModel.name] = namedModel;
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
	
  return db;
})();


export function errMsg(res, e, errorNumber = 500) {
  const message = typeof (e) == "string" ? e : e.message 
  return res.status(errorNumber).json({error: message})
}