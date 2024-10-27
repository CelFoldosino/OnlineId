const transporter = require('../config/emailConfig');

exports.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent', response: info.response });
  } catch (error) {
    res.status(500).send({ message: 'Error sending email', error });
  }
};
