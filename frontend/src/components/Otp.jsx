/** @format */

import React, { useState } from "react";
import { Input, HStack, PinInputField, PinInput } from "@chakra-ui/react";

const OTPInput = ({ otp, setOtp }) => {
  // Array to store each digit of the OTP

  // Handle change and move focus to the next input
  // const handleChange = (e, index) => {
  //   const { value } = e.target;
  //   if (/^\d*$/.test(value)) {
  //     // Allow only numeric input
  //     const newOtp = [...otp];
  //     newOtp[index] = value; // Update the value at the correct index
  //     setOtp(newOtp);

  //     // Move focus to the next input field automatically
  //     if (value && e.target.nextSibling) {
  //       e.target.nextSibling.focus();
  //     }
  //   }
  // };

  // // Handle backspace to move focus to the previous input
  // const handleKeyDown = (e, index) => {
  //   if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
  //     e.target.previousSibling.focus();
  //   }
  // };

  return (
    <HStack>
      <PinInput
        otp
        size="lg"
        value={otp}
        onChange={setOtp} // Update OTP state on input change
      >
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  );
};

export default OTPInput;
