//import dependencies
const router = require('express').Router();

const {resources} = require('../../config/resources');

//Resources
router.get('/', (req, res)=>{
    res.json({
        resources: Object.keys(resources)
    })
});

module.exports = router;