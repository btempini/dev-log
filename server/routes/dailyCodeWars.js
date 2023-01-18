const router = require("express").Router();
const axios = require("axios");

router.get("/getDailyChallenge", async (req, res) => {
  //get from codewars API
  try {
    const data = await axios.get(
      "https://www.codewars.com/api/v1/code-challenges/5831200eb812b8016d000094"
    );
    res.send(data.data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
