import express from "express";
import { PORT, mongoDBURL } from './config.js';
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
import cors from "cors";


const app = express();

app.use(express.json())

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );




app.use('/books', booksRoute)

//Default home page
app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send('Welcome to MERN stack tutorial')
})



//APP LISTEN
app.listen(PORT, () => { console.log(`App running on ${PORT}`) })


mongoose.connect(mongoDBURL)
  .then(() => {
    console.log(`App Connected to DB`);
  })
  .catch((err) => {
    console.log(err);
  });