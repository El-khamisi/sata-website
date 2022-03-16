const Hotel = require('../models/hotel');
const {hotel}= require('../config/resources');
const { successfulRes, failedRes } = require('../utils/response');

exports.getHotels = async(req, res)=>{

    try{
        const data = await Hotel.find({}).exec();
        return successfulRes(res, 200, data);
    }catch(e){
        failedRes(res, 400, e);
    }
}

exports.getHotel = async(req, res)=>{

    try{
        const search = req.query;
        const data = await Hotel.find({search}).exec();

        return successfulRes(res, 200, data);
    }catch(e){
        return failedRes(res, 400, e);
    }
}

exports.addHotel = async(req, res)=>{
    const grants = res.locals.grants;
    try{
        if(grants.hotel && grants.hotel.create.length>0){

            
        }else{
            throw new Error('You are not autharized')
        }
    }catch(e){

    }
}