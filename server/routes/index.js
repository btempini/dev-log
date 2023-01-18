const router = require("express").Router();
const dailyCodeWars = require("./dailyCodeWars");
router.use("/api", dailyCodeWars);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
