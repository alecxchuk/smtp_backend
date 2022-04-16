const formidable = require("formidable");
const { sendError } = require("../helpers/response_handler");

// Midlleware that handles form-data multipart request
const formData = (req, res, next) => {
  //
  const form = formidable({ multiples: true });
  try {
    form.parse(req, (err, fields, files) => {
      // error
      if (err) {
        next(err);
      }
      // user id from req fields
      const { user_id } = fields;
      // pdf filepath, filename and type
      const { filepath, originalFilename, mimetype } = files.pdf;

      // store filepath, name and type in req
      req.user_id = user_id;
      req.filepath = filepath;
      req.filename = originalFilename;
      req.mimetype = mimetype;
      next();
    });
  } catch (error) {
    sendError(res, error);
  }
};

module.exports = formData;
