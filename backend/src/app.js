import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"

const corsOptions = {
    origin: "https://get-placed-18lp.onrender.com",
    credentials: true
}
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors(corsOptions))

const _dirname = path.resolve()

import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"

app.use('/api/v1/user',userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/job', jobRoute)
app.use('/api/v1/application', applicationRoute)

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})


export {app}