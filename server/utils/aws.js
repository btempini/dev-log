const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();

//bucket info from .env
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_ACCESS_KEY;

console.log(bucketRegion);
//creates s3
const s3 = new S3Client({
  region: bucketRegion,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  config: {
    region: bucketRegion,
  },
});

let url = "";
const putObject = async (key) => {
  try {
    //params to be passed to the s3 putObject function
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: "test!",
      //   contentType: "passfile type",
    };
    //command to put
    putCommand = new PutObjectCommand(params);
    // send the command to aws bucket
    const response = await s3.send(putCommand);
    console.log(response);
    url = `https://devlog-bucket-2023.s3.us-west-1.amazonaws.com/${key}`;
    console.log(url);
  } catch (error) {
    console.log(error);
  }
};

putObject("newObject1");
