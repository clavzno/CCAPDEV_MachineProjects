var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var data ={
        feed: "/feed",
        text: 'yooooo'
    }
    res.render('index', data);
});

module.exports = router;