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

class App {
  public app: express.Application
  public port: string | number

  constructor() {
    this.port=8000
    this.app=express()
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
}

export default App