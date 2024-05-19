import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

//multer used for file uploading configuration

app.use(
  express.json({
    limit: "16kb",
  })
)

//for urls for eg: space = %20

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use(express.static("public")) // this will be used to store our files/pdfs/images

app.use(cookieParser())

export default app
