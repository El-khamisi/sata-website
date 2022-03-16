const User = require('../models/user');
const {Admin} = require('../config/roles');
const { failedRes } = require('../utils/response');

exports.isAdmin = async(req, res, next)=>{
    
    try {
        const id = res.locals.token.id;
        const role = res.locals.token.role.title;
        if(role && role == Admin){
            next();
        }else{
            throw new Error('You are NOT authorized');
        }
        
      } catch (e) {
        return failedRes(res, 500, e);
    }

}

exports.getPermissions = async(req, res, next)=>{
    
    try{
        const grants = res.locals.token.role.grants;

        res.locals.grants = grants;
        next();
    }catch(e){
        return failedRes(res, 500, e);
    }
}