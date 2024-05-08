import App from "./app"

import OrganisationRoutes from "./routes/organisation.router"

import connectToMongoDb from "./database"

connectToMongoDb()

const app = new App([
  new OrganisationRoutes()
])

app.listen()
app.test()