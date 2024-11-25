const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = 'secert_jwt';

router.use(bodyParser.json());

router.post('/login', async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({ error: 'Email and password are required'});
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
         return res.status(401).json({ error: 'Invalid Email or password' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         return res.status(401).json({ error: 'Invalid Email or password' });
      }
      const accessToken = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ id:user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

      res.status(200).json({
         accessToken,
         refreshToken,
         user: {
            id: user.id,
            name: user.name,
            email: user.email,
         },
      });
   } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occured during login' });
   }
});

module.exports = router;
