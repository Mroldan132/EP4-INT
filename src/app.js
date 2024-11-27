import express from "express";
import morgan from "morgan"
import plato from "./routes/plato.routes";
import client from "./routes/cliente.routes";
import order from "./routes/orden.routes";
import category from "./routes/categoria.routes";
import mesero from "./routes/mesero.routes";
import cors from "cors";
import path from "path";

const app = express();

//Settings
app.set("port",4000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Routes
app.use(plato);
app.use(client);
app.use(order);
app.use(category);
app.use(mesero);

//Styles 
app.use(express.static(path.join(__dirname, "public")));


//Menu Principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"public/partials","index.html"))
})


export default app;
