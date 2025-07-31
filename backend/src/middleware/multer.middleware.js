import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // file store on "/public/temp " folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // i wan't a original file name
  },
});

export const upload = multer({ storage: storage });

