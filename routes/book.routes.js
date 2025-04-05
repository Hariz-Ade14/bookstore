import express from "express";
import { getBooks,postBooks ,deleteBooks,getBooksPostedByUser} from "../controller/book.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const bookRouter = express.Router();


bookRouter.post('/',verifyToken, postBooks);
bookRouter.get('/',verifyToken, getBooks);
bookRouter.delete('/:id',verifyToken, deleteBooks);
bookRouter.get('/',verifyToken, getBooksPostedByUser);

export default bookRouter