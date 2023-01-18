const router = require("express").Router();
const axios = require("axios");
const webScraper = require("../utils/webScrapper");

router.get("/getDailyChallenge", async (req, res) => {
  //get from codewars API
  const ids = await webScraper();
  console.log(ids);
  const getFromCodeWars = async (ID) => {
    try {
      const data = await axios.get(
        `https://www.codewars.com/api/v1/code-challenges/${ID}`
      );
      res.send(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  getFromCodeWars("5831200eb812b8016d000094");
});

module.exports = router;
