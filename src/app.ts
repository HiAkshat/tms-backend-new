import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from "body-parser"
import cors from "cors"

import Verfication from './middlewares/verification';

import Routes from './routes/routes';

import { Request, Response } from 'express';
import ErrorHandler from './middlewares/errorHandler';

import { Server } from "socket.io"

class App {
  public app: express.Application
  public io : Server
  public port: string | number
  private routes: [Routes]
  
  private verification = new Verfication()
  private errorHandler = new ErrorHandler()

  constructor(routes: [Routes]) {
    this.port=3000
    this.app=express()
    this.routes = routes

    this.initializeMiddlewares()

    const server = this.app.listen(this.port, ()=>{
      console.log(`=================================`);
      console.log(`======= ENV: Development =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    })
  
    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:5173"
      }
    })
    
    this.io.listen(4000)
  }
  
  public listen() {
  }

  public test() {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send("Hello World!");
    });
  }

  public getServer() {
    return this.app
  }

  public getIo() {
    return this.io
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({extended: false}))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors())
    this.app.use(cookieParser())

    this.initializeRoutes(this.routes); 
    this.app.post("/api/verifyToken", this.verification.verifyToken)

    this.app.use(this.errorHandler.handleError)
  }

  private initializeRoutes(routes: [Routes]){
    routes.forEach((route: Routes) => {
      this.app.use("/api", route.router)
    })
  }
}

export default App