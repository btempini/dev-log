const router = require("express").Router();

router.get("/getDailyChallenge", async (req, res) => {
  const response = await fetch(
    "https://www.codewars.com/api/v1/code-challenges/{challenge}"
  );
  console.log(response);
});

module.exports = router;
