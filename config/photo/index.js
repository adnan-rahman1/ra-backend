const multer = require("multer");

let limits = {
  files: "2MB"
};
const fileFilter = (req, file, cb) => {
  const FileType = ["jpg", "png", "jpeg"];
  const isFileTypeMatched = FileType.some(
    ext => ext == file.originalname.split(".")[1]
  );
  if (!isFileTypeMatched) {
    cb(new Error("Please upload a png or jpg or jpeg file"));
  }
  cb(null, true);
};
exports.userAvaterConfigMiddleware = (req, res, next) => {
  try {
    const avater = multer({
      limits,
      fileFilter,
      preservePath: false
    }).single("photo");
    console.log(avater);
    next();
  } catch (err) {
    res.status(400).send({
      message: "Something went wrong with the photo uploadk"
    });
  }
};

