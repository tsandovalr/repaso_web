const express = require('express');
const router = express.Router();

router.get('/', (req,res, next) => {
    res.status(200).json({
        message:'Orders were fetched'
    });
});


router.post('/', (req,res, next) => {
    res.status(200).json({
        message:'Order was created'
    });
});



module.exports = router;