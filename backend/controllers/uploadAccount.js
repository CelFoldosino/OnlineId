/** @format */

const XLSX = require("xlsx");
const transporter = require("../config/emailConfig"); // Ensure this is configured correctly
const User = require("../models/AccountModels");

// Controller to handle file upload and processing
exports.uploadUsers = async (req, res) => {
  try {
    const file = req.file;
    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // Assuming first sheet
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Trim the data and map it into an array of users
    const users = sheet.map((row) => ({
      email: String(row.email).trim() ? String(row.email).trim() : "",
      password: String(row.password).trim() ? String(row.password).trim() : "",
      role: row.role ? row.role.trim() : "", // Ensure role is handled
    }));

    const existingUsers = []; // Array to collect existing users
    const newUsers = []; // Array to collect new users

    // Check each user and categorize them
    for (const user of users) {
      // Check if the user already exists in the database by email
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        existingUsers.push(existingUser.email); // Collect existing users
      } else {
        newUsers.push(user); // Collect only new users
      }
    }

    // Insert new users into the database
    if (newUsers.length > 0) {
      await User.insertMany(newUsers); // Bulk insert new users

      // Loop through the new users and send individual emails
      for (const user of newUsers) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email, // Send to each new user's email
          subject: "Account for Philsca System",
          text: `Your account has been successfully created.\n\nEmail: ${user.email}\nPassword: ${user.password}\nRole: ${user.role}\n\nPlease use these credentials to log in to the system.`,
        };

        // Send an email for each new user
        await transporter.sendMail(mailOptions);
      }
    }

    // Prepare the response structure
    const response = {
      existingUsers,
      message:
        newUsers.length > 0
          ? "New users added successfully and emails sent."
          : "No new users to add.",
    };

    // If there are existing users, include them in the response
    if (existingUsers.length > 0) {
      response.message += ` The following users already exist: ${existingUsers.join(
        ", "
      )}.`;
    }

    res.status(200).json(response); // OK if no errors
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading file");
  }
};
