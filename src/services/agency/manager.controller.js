const Agency = require('./agency.model');
const User = require('../user/user.model');
const { successfulRes, failedRes } = require('../../utils/response');
const { Assistant } = require('../../config/titles');

exports.readAssistants = async (req, res) => {
  try {
    let q = req.query;
    let response;
    const id = res.locals.user.id;

    if (q.name) {
      response = await Agency.findOne({ name: q.name }).populate('assistants').select('assistants').exec();
    }else {
      response = await Agency.findById(id).populate('assistants').select('assistants').exec();
    }
    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.readAssistant = async (req, res) => {
  try {
    const _id = req.params.id;
    const id = res.locals.user.id;

    const manager = await Agency.findById(id).exec();

    let response;
    if(manager.assistants.includes(_id)){
      response = await User.findById(_id).exec();
    }else{
      throw new Error('You DO NOT have an assistant associated with this ID')
    }
  
    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.addAssistant = async (req, res) => {
  try {
    const data = req.body;
    const id = res.locals.user.id;

    const manager = await Agency.findById(id).exec();
    const saved = new User({...data, manager: manager.nameOfAgency});
    
    saved.title = Assistant;
    manager.assistants.push(saved._id);

    await saved.save();
    manager.save();

    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.editAssistant = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = req.body;
    const response = await User.findByIdAndUpdate(_id, update, { new: true });

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 505, e);
  }
};

exports.deleteAssistant = async (req, res) => {
  try {
    const _id = req.params.id;
    const id = res.locals.user.id;

    const manager = await Agency.findById(id).exec();
    
    let data;
    const indexAssis = manager.assistants.indexOf(_id);
    if(indexAssis>-1){
      data = await User.findByIdAndDelete(_id).exec();
      manager.assistants.splice(indexAssis, 1);
      await manager.save();
      
    }else{
      throw new Error('You DO NOT have an assistant associated with this ID')
    }


    return successfulRes(res, 200, data);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
