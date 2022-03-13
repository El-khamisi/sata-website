const router = require('express').Router();

router.get('/route', (req, res)=>{
    res.send('from route')
})

module.exports = router;