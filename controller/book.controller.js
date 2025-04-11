import cloudinary from "../utils/cloudinary.js";
import { Books } from "../model/books.model.js";

const postBooks = async (req, res) => {
  try {
    const { title,rating, caption,description, image } = req.body;
    !image ||
      !title ||
      !caption ||
      !description ||
      (!rating &&
        res
          .status(400)
          .json({ success: false, message: "Provide all fields" }));

    //upload image to cloudinary
    // const uploadResponse = await cloudinary.uploader.upload(image);
    // const imageURL = uploadResponse.secure_url;

    const newBook = new Books({
      title,
      caption,
      image,
      rating,
      description
      // user: req.user._id,
    });

    await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await Books.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username profileImage");

    const totalBooks = await Books.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);
    res.json({
      success: true,
      books,
      totalBooks,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.log("Error in getBooks ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBooksPostedByUser =   async (req, res) => {
  const userId = req.user._id;
  try {
    await Books.find({ user: userId }).sort({createdAt: -1});
     res.json({
      success: true,
      message: "Books fetched successfully",
      books,});
  } catch (error) {
    console.log("Error in getBooksPostedByUser ", error);
    res.status(500).json({ success: false, message: error.message });
    
  }
};

const getBooksbyId = async (req,res) => {
      const id  = req.params.id;
      try {
        const book = await Books.findById(id);
        if (!book) {
          return res.status(404).json({ success: false, message: "Book not found" });
        }
        res.json({
             success: true,
             book: book
        });
      } catch (error) {
        console.log("Error in getBooksbyId ", error);
        res.status(500).json({ success: false, error: "Error in getBooksbyId", message: error.message });
      }
      
}

const deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    //delete image from cloudinary
    if (book.image && book.image.includes("cloudinary")) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log("Error in deleting image from cloudinary ", error);
        return res.status(500).json({
          success: false,
          message: "Error deleting image from cloudinary",
        });
      }
    }
    await book.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error in deleteBooks ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export { postBooks, getBooks, deleteBooks, getBooksPostedByUser,getBooksbyId };
