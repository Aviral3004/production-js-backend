import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
  path: "./env",
})

connectDB()

//IIFE function for DB_Connection request
//   async () => {
//     try {
//       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       app.on("error", () => {
//         console.log("ERROR: ", error)
//         throw error
//       })

//       app.listen(process.env.PORT, () => {
//         console.log("Connected to DB and listening on PORT: ", process.env.PORT)
//       })
//     } catch (error) {
//       console.log("ERROR: ", error)
//     }
//   }
// )()
