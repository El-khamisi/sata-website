exports.filterByGDS = async (model, gdsName) => {
  let response = await model.find({ 'GDSproviders.name': gdsName }).exec();

  if (!response) {
    return response;
  } else if (response.length && response.length > 0) {
    response.forEach((e, i) => {
      let filterGDS = [];
      e.GDSproviders.forEach((ee) => {
        gdsName == ee.name ? filterGDS.push(ee) : null;
      });
      response[i].GDSproviders = filterGDS;
    });
  } else {
    response.GDSproviders.forEach((e) => {
      let filterGDS = [];
      gdsName == gdsName ? filterGDS.push(e) : null;
      response.GDSproviders = filterGDS;
    });
  }
  return response;
};
