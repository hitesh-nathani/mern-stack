const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => res.send("Users"))
  .post()
  .put()
  .delete();


module.exports = router;