const express = require('express');
const router = express.Router();
const { getUserSkills, getSocialLinks, callMailer, getProjectDetails, getCarrierDetails, healthCheck } = require('./controller');

router.get('/portfolio/userskills', getUserSkills);
router.get('/portfolio/sociallinks', getSocialLinks);
router.post('/portfolio/sendmail', callMailer);
router.get('/portfolio/getprojectdetails', getProjectDetails);
router.get('/portfolio/carrierdetails', getCarrierDetails);
router.get('/portfolio/health', healthCheck);

module.exports = router;
