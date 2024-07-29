import * as Yup from "yup";

export const forgetPasssword = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required"),
});

export const resetPassword = Yup.object().shape({
  password: Yup.string()
    .required("New Password is required")
    .min(4, "Password must be at least 4 characters long"),

  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});
