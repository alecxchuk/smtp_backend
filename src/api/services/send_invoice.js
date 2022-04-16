const {
  getUserPlanDetail,
  updateUserPlan,
} = require("../../config/user_plans_db");
const { throwError } = require("../helpers/response_handler");
const {
  noValidUserPlan,
  insufficientPlanBalance,
} = require("../helpers/response_messages");
const sendEmail = require("../helpers/send_email");

const sendInvoiceMessage = async ({
  user_id,
  filepath,
  mimetype,
  filename,
}) => {
  //  mail options
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: "aconalexx@gmail.com",
    // subject: `${recipient_name} Invoice`,
    subject: `Amaka Invoice`,
    html: `<p>Please find the bill of sale invoice in this email</p>`,
    attachments: [
      {
        filename: filename, //"ChukwudiOkani_ConstructionForeman.pdf",
        path: filepath, //"C:/Users/WORK/Downloads" + "/ChukwudiOkani_ConstructionForeman.pdf",
        contentType: mimetype, //"application/pdf",
      },
    ],
  };

  const plan = await getUserPlanDetail(user_id);

  // check if sufficient balance
  if (plan == null) {
    throwError(noValidUserPlan);
  }

  if (plan.invoice_units < 1) {
    throwError(insufficientPlanBalance);
  }

  // deduct price
  await updateUserPlan(user_id, [plan.plan_id, -1, plan.expiresAt]);

  // send pdf
  let s = sendEmail(mailOptions);

  console.log(s, 3244);

  //return response
  return true;
};

module.exports = sendInvoiceMessage;
