import App from "./app"

import Routes from "./routes/routes"

import connectToMongoDb from "./database"

connectToMongoDb()

const app = new App([
  new Routes()
])

app.listen()
app.test()

const io = app.getIo()
export {io}