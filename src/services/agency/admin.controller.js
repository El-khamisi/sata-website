const Agency = require('./agency.model');
const { successfulRes, failedRes } = require('../../utils/response');
const { agency_thumbs, agency_CRN, agency_taxCard } = require('../../config/cloudinary');

exports.readAgencys = async (req, res) => {
  try {
    let q = req.query;
    let response;

    if (q.name) {
      response = await Agency.find({ name: q.name }).exec();
    } else if (q.role) {
      response = await Agency.find({ role: q.role }).exec();
    } else if (q.title) {
      response = await Agency.find({ title: q.title }).exec();
    } else {
      response = await Agency.find({}).exec();
    }
    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.readAgency = async (req, res) => {
  try {
    const _id = req.params.id;

    const response = await Agency.findById(_id).exec();

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.addAgency = async (req, res) => {
  try {
    const data = req.body;
    const saved = new Agency(data);
    const files = req.files ? req.files['images'] : undefined;
    console.log(data)

    if (files && files.length > 0) {
      saved.thumbnail = await agency_thumbs(files[0], saved._id);
    }
    if (files && files.length > 1) {
      const url = await agency_CRN(files[1], 'CRN-' + saved._id);
      if (saved.CRN) {
        saved.CRN = { ...saved.CRN, thumbnail: url };
      } else {
        saved.CRN = { thumbnail: url };
      }
    }
    if (files && files.length > 2) {
      const url = await agency_taxCard(files[1], 'taxCard-' + saved._id);
      if (saved.taxCard) {
        saved.taxCard = { ...saved.taxCard, thumbnail: url };
      } else {
        saved.taxCard = { thumbnail: url };
      }
    }

    await saved.save();

    return successfulRes(res, 201, saved);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};

exports.editAgency = async (req, res) => {
  try {
    const _id = req.params.id;
    const update = req.body;
    const files = req.files ? req.files['images'] : undefined;

    if (files && files.length > 0) {
      update.thumbnail = await agency_thumbs(files[0], _id);
    }
    if (files && files.length > 1) {
      const url = await agency_CRN(files[1], 'CRN-' + _id);
      if (update.CRN) {
        update.CRN = { ...update.CRN, thumbnail: url };
      } else {
        update.CRN = { thumbnail: url };
      }
    }
    if (files && files.length > 2) {
      const url = await agency_taxCard(files[1], 'taxCard-' + _id);
      if (update.taxCard) {
        update.taxCard = { ...update.taxCard, thumbnail: url };
      } else {
        update.taxCard = { thumbnail: url };
      }
    }

    const response = await Agency.findByIdAndUpdate(_id, update, { new: true });

    return successfulRes(res, 200, response);
  } catch (e) {
    return failedRes(res, 505, e);
  }
};

exports.deleteAgency = async (req, res) => {
  try {
    const _id = req.params.id;

    const data = await Agency.findByIdAndDelete(_id).exec();

    return successfulRes(res, 200, data);
  } catch (e) {
    return failedRes(res, 500, e);
  }
};
