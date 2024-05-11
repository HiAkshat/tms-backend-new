import App from "./app"

import OrganisationRoutes from "./routes/organisation.router"
import OrganisationUserRoutes from "./routes/organisationUser.router"
import SystemUserRoutes from "./routes/systemUser.router"
import TicketRoutes from "./routes/ticket.router"

import connectToMongoDb from "./database"

connectToMongoDb()

const app = new App([
  new OrganisationRoutes(),
  new OrganisationUserRoutes(),
  new SystemUserRoutes(),
  new TicketRoutes
])

app.listen()
app.test()