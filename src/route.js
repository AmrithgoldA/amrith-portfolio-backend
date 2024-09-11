const express = require('express');
const router = express.Router();
const { getUserSkills, getSocialLinks, callMailer, getProjectDetails } = require('./controller');

router.get('/portfolio/userskills', getUserSkills);
router.get('/portfolio/sociallinks', getSocialLinks);
router.post('/portfolio/sendmail', callMailer);
router.get('/portfolio/getprojectdetails', getProjectDetails);

module.exports = router;
