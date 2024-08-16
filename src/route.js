const express = require('express');
const router = express.Router();
const { getUserSkills } = require('./controller');

router.get('/portfolio/userskills', getUserSkills);

module.exports = router;
