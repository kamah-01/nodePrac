const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../models/models');

const router = express.Router();


router.use(bodyParser.json());

router.post('/register', async (req, res) => {
   try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
         return res.status(400).json({error: 'Name, email, and password are required'});
      }

      const user = await User.create({ name, email, password });

      res.status(201).json({
         id: user.id,
         name: user.name,
         email: user.email,
      });
   } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
         res.status(400).json({error: 'Email is already in use.'});
      } else {
         console.error('Error registering user:', error);
         res.status(500).json({ error: 'An error occurred while registering the user.' })
      }
   }
});

module.exports = router;