import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

//Route for saving a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: `Send all the required fields: title, author, publishedYear`
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear
    }
    const book = await Book.create(newBook)
    return res.status(201).send(book)

  }
  catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message })
  }
})

//Route for getting all books from DB
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({})
    return res.status(200).send({
      count: books.length,
      data: books
    })

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message })
  }
});

// Route for getting books from db by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    return res.status(200).send({
      data: books
    })

  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
})

//Route for updating a book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: `Book Not Found` })
    }
    return res.status(200).send({ message: `Book Updated Successfully` })


  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })

  }
})

//Route for deleting a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: `Book Not Found` })
    }
    return res.status(200).send({ message: `Book Deleted Successfully` })


  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })

  }
})

export default router;