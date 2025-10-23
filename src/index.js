import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { AppDataSource, connectDB } from "./config/configDb.js";
import { routerApi } from "./routes/index.routes.js";
import {SERVER_HOST, SERVER_PORT} from "./config/configEnv.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi API REST con TypeORM!");
});


connectDB()
  .then(() => {
    routerApi(app);
    const PORT = process.env.PORT || 3000;
    app.listen(SERVER_PORT, SERVER_HOST, () => {
      console.log(`Servidor iniciado en http:${SERVER_HOST}:${SERVER_PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error al conectar con la base de datos:", error);
    process.exit(1);
  });
