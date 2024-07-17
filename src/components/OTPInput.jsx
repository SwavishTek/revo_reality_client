import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function OTPInput({ onChange }) {
  const [otp, setOtp] = useState("");

  const handleChange = (v) => {
    setOtp(v);
    if (onChange) {
      onChange(v);
    }
  };

  return (
    <OtpInput
      value={otp}
      onChange={handleChange}
      numInputs={6}
      inputStyle={{ height: "2.8rem", width: "2.8rem", borderRadius: "15px" }}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
  );
}
