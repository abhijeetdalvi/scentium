const router = require("express").Router();

const isLoggedOut = require("../middleware/isLoggedOut");

/* GET contact page */
router.get("/contact", (req, res) => {
  res.render("/views/contact/contact");
});

router.post("/contact", isLoggedOut, (req, res) => {
  const { name, email, enquiry } = req.body;
});

module.exports = router;
