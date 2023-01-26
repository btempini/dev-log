const router = require("express").Router();
const axios = require("axios");
const { putObject } = require("../utils/aws");
const dotenv = require("dotenv");
const multer = require("multer");
console.log(process.env.Route);
dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { showUploadWidget } = require("../utils/uploadWidget");
router.post(
  `/bucketRequest/${process.env.ROUTE}`,
  upload.single("files"),
  async (req, res) => {
    console.log("file", req.file);
    showUploadWidget();
    // try {
    //   console.log("all good!");
    //   res.json({ message: "Successfully uploaded files" });
    //   //params to be passed to the s3 putObject function
    //   imageKey = req.file.originalname;
    //   const params = {
    //     Bucket: process.env.BUCKET_NAME,
    //     Key: req.file.originalname,
    //     //file buffer
    //     Body: req.file.buffer,
    //     contentType: req.file.mimetype,
    //   };

    //   putObject(params, imageKey);
    // } catch (error) {
    //   console.log(error);
    //   res.status(500);
    // }
  }
);

module.exports = router;
