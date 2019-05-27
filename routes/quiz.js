// express wywoluje w kazdym tym /

const express = require('express');
const router = express.Router();

// jak zrobimy teraz metode post na / to bedzie 404 bo nie przechwyujemy tutaj takej metody

/* GET home page. */
router.get('/', (req, res, next) => {
    // calback czyli to co po przechwyceniu requestu

    // index to nazwa szablonu czyli tutaj index pug, drui praramet - obiekt. parametry przekazywane do szablony
    res.render('quiz', { title: 'Quiz' });
});

module.exports = router;
