import express from "express";
import { getBooks,postBooks ,deleteBooks,getBooksPostedByUser,getBooksbyId} from "../controller/book.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const bookRouter = express.Router();

bookRouter.post('/addbook', postBooks);
bookRouter.get('/allbooks', getBooks);
bookRouter.get('/:id', getBooksbyId);
bookRouter.delete('/:id', deleteBooks);
bookRouter.get('/', getBooksPostedByUser);

export default bookRouter;