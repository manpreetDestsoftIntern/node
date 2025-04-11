const express = require("express");
const router = express.Router();
const axios = require('axios');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
dotenv.config();



// authController.js
router.get("/", async (req, res) => {
    const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.ClientID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
    res.redirect(redirectUri);
  })

module.exports = router;
