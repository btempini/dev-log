const router = require("express").Router();

const { createUser } = require("../../controllers/user-controller");

router.route("/").post(createUser);

module.exports = router;
