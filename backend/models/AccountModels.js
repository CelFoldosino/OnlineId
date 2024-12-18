/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  middlename: { type: String },
  suffix: { type: String },

  role: {
    type: String,
    enum: ["student", "permanent_employee", "cos_employee", "admin"],
    required: true,
  },
  position: String,
  course: String,
  year: String,
  schoolyear: String,
  semestertype: String,
  address: String,
  contactnumber: String,
  contactperson: String,
  contactpersonnumber: String,
  signature: String,
  birthdate: Date,
  position: String,
  designation: String,
  hgt: String,
  wgt: String,
  sss: String,
  tin: String,
  picture: {
    type: String,
    required: false,
  },
  affidavit: String,
  receipt: String,
  schoolid: String,

  isIdIssued: Boolean,
  IssuedBy: String,
  IssuedDate: { type: Date },
  roleLevel: { type: String, default: "4" },
  message: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  otpCode: { type: String },
  otpExpiresAt: { type: Date },
  otpIsUsed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Account", userSchema);
