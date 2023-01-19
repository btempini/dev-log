const router = require("express").Router();
const axios = require("axios");
const { getOneID } = require("../utils/webScrapper");

router.get("/getDailyChallenge", async (req, res) => {
  const getFromCodeWars = async (ID) => {
    try {
      const data = await axios.get(
        `https://www.codewars.com/api/v1/code-challenges/${ID}`
      );
      res.send(data.data);
    } catch (error) {
      console.log(ID);
      console.log(error);
    }
  };
  ID = await getOneID();
  getFromCodeWars(ID);
});

module.exports = router;
