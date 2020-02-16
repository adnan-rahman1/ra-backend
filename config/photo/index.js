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
const avater = multer({
  limits,
  fileFilter,
  preservePath: false
}).single("photo");

exports.userAvaterConfigMiddleware = async (req, res, next) => {
  try {
    await avater(req, res, (err) => {
      if (err) {
        // An unknown error occurred when uploading.
        res.status(401).send({
          msg: "Failed to upload photo"
        });
      } 
      else {
        let data = JSON.stringify(req.body);
        console.log(JSON.parse(data));
        // Everything went fine
        // console.log(Buffer.from(req.body.photo, "base64"));
        // if(req.file){
        //   req.body.avater = req.file.buffer;
        // }
        // else req.body.avater = Buffer.from(req.body.photo, "base64");
        next();
      }
    })
  } catch (err) {
    res.status(400).send({
      message: "Something went wrong with the photo uploadk"
    });
  }
};
