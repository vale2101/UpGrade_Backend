import express, { Application } from "express";
import userRoutes from "./routes/user.routes";
import direccionRoutes from "./routes/direccion.routes"
import trabajadorRoutes from "./routes/trabajador.routes"
import fichaRoutes from "./routes/ficha.routes"
import productoRoutes from "./routes/producto.routes"
import pedidoRoutes from "./routes/pedido.routes"
import administradorRoutes from "./routes/administrador.routes"
import reparacionRoutes from "./routes/reparacion.routes"
import cors from "cors";
import cookieParser from "cookie-parser";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Aplicacion corriendo por el puerto", this.port);
    });
  }

middlewares() {
  this.app.use(express.json());
  // Cors configurado correctamente
  this.app.use(cors({
    origin: 'http://localhost:3001', 
    credentials: true,               
  }));

  this.app.use(cookieParser());
}


  routes() {
    this.app.use('/api', userRoutes); 
    this.app.use('/api', direccionRoutes); 
    this.app.use('/api', trabajadorRoutes); 
    this.app.use('/api', fichaRoutes); 
    this.app.use('/api', productoRoutes); 
    this.app.use('/api', pedidoRoutes); 
    this.app.use('/api', administradorRoutes); 
    this.app.use('/api', reparacionRoutes); 

  }
}

export default Server;
