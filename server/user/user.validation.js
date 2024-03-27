import * as Yup from "yup";

export let registerUserValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required.")
    .trim()
    .max(25, "First name must be at max 25 characters."),
  lastName: Yup.string()
    .required("Last name is required.")
    .trim()
    .max(25, "Last name must be at max 25 characters."),
  email: Yup.string()
    .required("Email address is required.")
    .trim()
    .lowercase()
    .max(55, "Email address must be at max 55 characters."),
  password: Yup.string()
    .required("Password is required.")
    .trim()
    .min(4, "Password must is atleast 4 characters.")
    .max(20, "Password must be at max of 20 characters."),
  role: Yup.string()
    .required("Role is required.")
    .trim()
    .oneOf(["buyer", "seller"]),
});

export let loginUserValidationSchema = Yup.object({
  email: Yup.string()
    .email("Email must be valid.")
    .required("Email address is required.")
    .trim()
    .lowercase(),
  password: Yup.string().required("Password is required.").trim(),
});
