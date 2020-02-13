const router = require("express").Router();


router.get("/", (req, res) => {
  res.status(200).send({
    message: "this is blog route"
  })
})


module.exports = router;