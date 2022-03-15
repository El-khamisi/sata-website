const User = require('../models/user');
const Agency = require('../models/agency');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {TOKENWORD} = require('../../config');


exports.regUser = async (req, res, next)=>{
    let {name, email, phone, password, thumbnail, country} = req.body;
    if(email && password)
            password = bcrypt.hashSync(password, 10);
    else 
        res.status(400).json({
            stauts: 400,
            msg:'Email and password are REQUIRED'});

    try{
       let saved = new User({name, email, phone, password, thumbnail, country});
       await saved.save();
       
       const token = jwt.sign({
           id:saved._id, email:saved.email, 
       }, TOKENWORD);
       res.header('auth-token', token);
        
    }catch(e){
        res.status(500).json({e: e.message})
    }
    res.send();
//    next();
}

exports.logUser = async(req, res, next)=>{
    let {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({
            stauts: 400,
            msg:'Email and password are REQUIRED'});
    }
    
    try{
        let logged = await User.findOne({email}).exec();
        const matched = bcrypt.compareSync(password, logged.password);
        if(!matched || !logged) res(400).json({
            stauts: 400,
            msg: 'Email or Password is invalid'
        })
        
        const token =jwt.sign({
            id: logged._id, email: logged.email
        }, TOKENWORD);

       res.set('auth-token', token);

    }catch(e){
        res.status(500).json({e: e.message})
    }
    next();
    
}

exports.regAgency = async(req, res)=>{

    if(email && password)
            password = bcrypt.hashSync(password, 10);
    else 
        res.status(400).json({
            stauts: 400,
            msg:'Email and password are REQUIRED'});

    try{
       const saved = new User({name, email, phone, password, thumbnail, country});
       await saved.save();
       const token = jwt.sign({name, email}, TOKENWORD);
       res.stauts(201).cookie('logged', token, {
           httpOnly:true, secure: true})
           .json({
               status: 200,
               msg: 'OK',
               data: {
                name, email
               }
           });
    }catch(e){
        res.status(500).json({e: e.message})
    }
    
}

exports.logAgency = async(req, res)=>{
    let {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({
            stauts: 400,
            msg:'Email and password are REQUIRED'});
    }
    
    try{
        const logged = await User.findOne({email}).exec();
        const matched = bcrypt.compareSync(password, logged.password);
        if(!matched || !logged) res(400).json({
            stauts: 400,
            msg: 'Email or Password is invalid'
        })
        const token =jwt.sign({
            email:logged.email, name: logged.name}, TOKENWORD);

        res.stauts(201).cookie('logged', token, {
            httpOnly:true, secure: true})
            .json({
                status: 200,
                msg: 'OK',
                data: {
                    name: logged.name, email: logged.email
                }
            });

    }catch(e){
        res.status(500).json({e: e.message})
    }
}


