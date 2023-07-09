const express = require('express');
const { addToLikedMovies, getLikedMovies } = require('../controllers/userContoller');
const router = express.Router();

router.post('/add' , addToLikedMovies);
router.get('/liked/:email' , getLikedMovies);
router.put('/delete')
module.exports = router;