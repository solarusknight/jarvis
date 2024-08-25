const express = require('express');
const router = express.Router();
const {sendEmail} = require('../../controllers/portfolio/Email');
const {validateFormData,validateEmail} = require('../../middlewares/Email');
router.post("/sendEmail",validateFormData,validateEmail,sendEmail);
module.exports = router;