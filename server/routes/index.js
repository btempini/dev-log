const router = require("express").Router();
const bucketRoute = require("./bucketRoute");
router.use("/api", bucketRoute);

module.exports = router;
