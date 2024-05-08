// import express from 'express';

// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello, TypeScript with me!');
// });


// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


import cookieParser from 'cookie-parser';
import express from 'express';
import bodyParser from "body-parser"
import cors from "cors"

class App {
  public app: express.Application
  public port: string | number
  private routes: any

  constructor(routes: any) {
    this.port=3000
    this.app=express()
    this.routes = routes

    this.initializeMiddlewares()
  }

  public listen() {
    this.app.listen(this.port, ()=>{
      console.log(`=================================`);
      console.log(`======= ENV: Devlopment =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    })
  }

  public test() {
    this.app.get("/", (req: Request, res: any) => {
      res.status(200).send("Hello World!");
    });
  }

  public getServer() {
    return this.app
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({extended: false}))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors())
    this.app.use(cookieParser())

    this.initializeRoutes(this.routes);

    
  }

  private initializeRoutes(routes: any){
    routes.forEach((route: any) => {
      this.app.use("/api", route.router)
    })
  }
}

export default App