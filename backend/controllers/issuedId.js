/** @format */

const Account = require("../models/AccountModels"); // Adjust the path as needed
const transporter = require("../config/emailConfig"); // Ensure this is configured correctly

exports.issueId = async (req, res) => {
  const { userId, issuedBy } = req.body; // Get the issuedBy and userId from request body

  try {
    if (!userId || !issuedBy) {
      return res.status(400).json({
        // Use 400 for bad request
        message: "Issued not found",
      });
    }

    const user = await Account.findById(userId)

    const updatedAccount = await Account.findByIdAndUpdate(
      userId,
      {
        IssuedBy: issuedBy,
        isIdIssued: true,
        IssuedDate: Date.now(),
      },
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "ID issued successfully",
      data: updatedAccount,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email, 
      subject: "Get your ID ",
      text: 'You"re ID is available now',
    };

    await transporter.sendMail(mailOptions);

    
  } catch (error) {
    console.error("Error issuing ID:", error);
    res.status(500).json({
      message: "Error issuing ID",
      error: error.message,
    });
  }
};


exports.fetchIssuedId = async (req, res) => {
  try {
    const result = await Account.aggregate([
      {
        $match: {
          IssuedBy: { $exists: true },
          IssuedDate: { $exists: true },
        },
      },
      {
        $group: {
          _id: {
            issuedDate: {
              $dateToString: { format: "%Y-%m-%d", date: "$IssuedDate" },
            },
            issuedBy: "$IssuedBy",
          },
          totalIssued: { $sum: 1 },
        },
      },
      {
        $project: {
          issuedDate: "$_id.issuedDate",
          issuedBy: "$_id.issuedBy",
          totalIssued: 1,
        },
      },
      { $sort: { issuedDate: -1 } },
    ]);

    res.status(200).json({
      message: "Fetched issued IDs successfully",
      data: result, // No need for further processing
    });
  } catch (error) {
    console.error("Error fetching issued IDs:", error);
    res.status(500).json({
      message: "Error fetching issued IDs",
      error: error.message,
    });
  }
};
