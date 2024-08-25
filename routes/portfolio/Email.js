const express = require('express');
const router = express.Router();
const {sendEmail***REMOVED*** = require('../../controllers/portfolio/Email');
const {validateFormData,validateEmail***REMOVED*** = require('../../middlewares/Email');
router.post("/sendEmail",validateFormData,validateEmail,sendEmail);
module.exports = router;