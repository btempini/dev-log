const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();

//bucket info from .env
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_ACCESS_KEY;

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

const ObjectCall = async () => {
  try {
    //params to be passed to the s3 putObject function
    const params = {
      Bucket: bucketName,
      Key: "TestObject",
      Body: "test!",
      //   contentType: "passfile type",
    };
    //command to put
    putCommand = new PutObjectCommand(params);
    // send the command to aws bucket
    await s3.send(putCommand);
    console.log("putCommand sent to AWS");
  } catch (error) {
    console.log(error);
  }
};