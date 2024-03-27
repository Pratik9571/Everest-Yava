import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import $axios from "../lib/axios.instance";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();
  const { isLoading, isError, error, mutate } = useMutation({
    mutationKey: "register-user",
    mutationFn: async (values) => {
      return await $axios.post("/user/register", values);
    },
    onSuccess: (response) => {
      console.log(response);
      navigate("/login");
    },

    onError: (error) => {
      console.log(error?.response?.data?.message);
    },
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {isLoading && <LinearProgress color="success" />}
      <Formik
        initial
        values={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        }}
        validationSchema={Yup.object({
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
        })}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {(formik) => {
          <form onSubmit={formik.handleSubmit}>
            <Typography variant="h5">Sign Up</Typography>
            {/* For First Name */}
            <FormControl fullWidth>
              <TextField
                required
                label="First Name"
                {...formik.getFieldProps("firstName")}
              />

              {formik.touched.firstName && formik.errors.firstName ? (
                <FormHelperText error>{formik.errors.firstName}</FormHelperText>
              ) : null}
            </FormControl>

            {/* For Last Name */}
            <FormControl fullWidth>
              <TextField
                required
                label="Last Name"
                {...formik.getFieldProps("lastName")}
              />

              {formik.touched.lastName && formik.errors.lastName ? (
                <FormHelperText error>{formik.errors.lastName}</FormHelperText>
              ) : null}
            </FormControl>

            {/* For Email */}
            <FormControl fullWidth>
              <TextField
                required
                label="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <FormHelperText error>{formik.errors.email}</FormHelperText>
              ) : null}
            </FormControl>

            {/* For Password */}
            <FormControl fullWidth>
              <TextField
                required
                label="Password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              ) : null}
              {formik.error}
            </FormControl>

            {/* For Role */}
            <FormControl fullWidth>
              <InputLabel required>Role</InputLabel>
              <Select label="Role" {...formik.getFieldProps("role")}>
                <MenuItem value="buyer">Buyer</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
              </Select>
              {formik.touched.role && formik.errors.role ? (
                <FormHelperText error>{formik.errors.role}</FormHelperText>
              ) : null}
            </FormControl>
            <Button type="submit" variant="contained" color="success">
              Register
            </Button>
            <Link to="/login">
              <Typography variant="subtitle2">
                Already registered? Login
              </Typography>
            </Link>
          </form>;
        }}
      </Formik>
    </Box>
  );
};

export default Register;
