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

exports.canCreate = (resource)=>{
    return (req, res, next)=>{
        try{
            let title = res.locals.token.role.title;
            let grants = res.locals.token.role.grants;

            if(title && title == Admin) {
                res.locals.grants = ['*'];
                return next();
            }

            grants = grants.find(e=>e.resource == resource);
            if(grants && grants.create.length>0){
                res.locals.grants = grants.create;
                return next();
            }else {
                throw new Error('You are NOT authorized');
            }
        }catch(e){
            if(e instanceof ReferenceError)
                return failedRes(res, 505, e);
            else
                return failedRes(res, 401, e);
        }
    
    }
}
 
exports.canRead = (resource)=>{
    return (req, res, next)=>{
        try{
            let title = res.locals.token.role.title;
            let grants = res.locals.token.role.grants;

            if(title && title == Admin) {
                res.locals.grants = ['*'];
                return next();
            }

            grants = grants.find(e=>e.resource == resource);
            if(grants && grants.read.length>0){
                res.locals.grants = grants.read;
                return next();
            }else {
                throw new Error('You are NOT authorized');
            }
        }catch(e){
            if(e instanceof ReferenceError)
                return failedRes(res, 505, e);
            else
                return failedRes(res, 401, e);
        }
    
    }
}

exports.canUpdate = (resource)=>{
    return (req, res, next)=>{
        try{
            let title = res.locals.token.role.title;
            let grants = res.locals.token.role.grants;

            if(title && title == Admin) {
                res.locals.grants = ['*'];
                return next();
            }

            grants = grants.find(e=>e.resource == resource);
            if(grants && grants.update.length>0){
                res.locals.grants = grants.update;
                return next();
            }else {
                throw new Error('You are NOT authorized');
            }
        }catch(e){
            if(e instanceof ReferenceError)
                return failedRes(res, 505, e);
            else
                return failedRes(res, 401, e);
        }
    
    }
}

exports.canDelete = (resource)=>{
    return (req, res, next)=>{
        try{
            let title = res.locals.token.role.title;
            let grants = res.locals.token.role.grants;

            if(title && title == Admin) {
                res.locals.grants = ['*'];
                return next();
            }

            grants = grants.find(e=>e.resource == resource);
            if(grants && grants.delete.length>0){
                res.locals.grants = grants.delete;
                return next();
            }else {
                throw new Error('You are NOT authorized');
            }
        }catch(e){
            if(e instanceof ReferenceError)
                return failedRes(res, 505, e);
            else
                return failedRes(res, 401, e);
        }
    
    }
}
