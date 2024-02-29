import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "romixeno@gmail.com",
    pass: process.env.PASS,
  },
});
export const sendEmail = (req, res) => {
  const data = req.body;

  const mailOptions = {
    from: "romixeno@gmail.com",
    ...data,
  };

  console.log(mailOptions);
};
