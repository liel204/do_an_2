const SendEmailService = require("../services/SendEmailService");

const sendEmail = async (req, res) => {
  try {
    const response = await SendEmailService.sendEmail(req.query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = { sendEmail };
