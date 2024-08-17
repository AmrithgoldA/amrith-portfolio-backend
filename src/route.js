const express = require('express');
const router = express.Router();
const { getUserSkills, getSocialLinks } = require('./controller');

router.get('/portfolio/userskills', getUserSkills);
router.get('/portfolio/sociallinks', getSocialLinks);

module.exports = router;
