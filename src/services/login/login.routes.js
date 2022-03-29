const router = require('express').Router();


const { logUser, regUser, regAgency, logAgency } = require('./login.controller');
const upload = require('../../config/multer');

const seeder = require('../../config/defaultConfig');
router.post('/postimage', upload.single('avatar'),  (req, res)=>{
    console.log(req.file);
    
})
// const fs = require('fs');
// router.get('/getimage', (req, res)=>{
//     const cont = fs.readFileSync(__dirname+'/senna2.jpg', {encoding: 'base64'})
//     res.send(`<div>
//     <p>Taken from wikpedia</p>
//     <img src="${cont}" alt="asd"/>
//     </div>`)
    
// })
router.post('/signup/user', regUser);
router.post('/login/user', logUser);

// router.post('/signup/agency', regAgency);    **deprecated
router.post('/login/agency', logAgency);

module.exports = router;
