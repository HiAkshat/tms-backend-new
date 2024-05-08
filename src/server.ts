import App from "./app"
import Routes from "./routes/organisation.router"

import connectToMongoDb from "./database"

connectToMongoDb()

const app = new App([
  new Routes()
])

app.listen()
app.test()