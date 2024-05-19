import dotenv from "dotenv"
import connectDB from "./db/index.js"
import app from "./app.js"

dotenv.config({
  path: "./env",
})


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`\n Server running at port ${process.env.PORT || 8000}`)
    })
  })
  .catch((err) => console.log("MONGODB connection failed!!!", err))

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
