const express = require("express");
const router = express.Router();
const {
  getUserSkills,
  getSocialLinks,
  callMailer,
  getProjectDetails,
  getCarrierDetails,
} = require("./controller/controller");
const { chatBot } = require("./controller/chatBotController");

router.get("/portfolio/userskills", getUserSkills);
router.get("/portfolio/sociallinks", getSocialLinks);
router.post("/portfolio/sendmail", callMailer);
router.get("/portfolio/getprojectdetails", getProjectDetails);
router.get("/portfolio/carrierdetails", getCarrierDetails);
router.post("/portfolio/chatBot", chatBot);

module.exports = router;
