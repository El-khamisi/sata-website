const User = require('../models/user');

exports.find = async (req, res)=>{
    const name = null
    const  email = "find@test.com";
    const password = '6526556'
    const save = new User({password, name, email, 
        role:{
            grants: [{resource: 'now', create: ['tio', 'titi']}, {resource:'Fly', read: ['title', 'name of movie', 'Date of creation']}]
        }
    })

    await save.save();
    const coco = await User.findById('62320bdbc2af4ff0728bd4df').exec();

    res.json({
        data: coco
    })
}