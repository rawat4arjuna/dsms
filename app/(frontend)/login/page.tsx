"use client";

import { Formik, useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import {
  Typography,
  TextField,
  Paper,
  Button,
  Container,
  Grid,
} from "@mui/material";
import Controller from "@/app/(Components)/Formik/form/fields/Controller";
import useAuth from "@/app/hooks/useAuth";

const schema = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const { handleLogin } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, action) => {
      console.log(values);
      handleLogin(values);
    },
    validationSchema: schema,
  });

  const formJson = [
    {
      label: "Email",
      type: "textfield",
      name: "email",
      required: true,
    },
    {
      label: "Password",
      type: "textfield",
      name: "password",
      required: true,
    },
  ];

  return (
    <>
      <Paper elevation={3} sx={{ maxWidth: 300 }}>
        <form
          action="#"
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-around h-full"
        >
          <Grid container spacing={2} p={2} py={4}>
            <Grid item xs={12}>
              <Typography
                variant="h1"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                {/* DSMS */}
              </Typography>
            </Grid>

            {formJson.map((v) => (
              <Grid item xs={12} key={v.name}>
                <Controller {...v} formik={formik} onBlur={() => {}} />{" "}
              </Grid>
            ))}

            <Grid item xs={12}>
              <Link href="/forgotpassword">Forgot Password?</Link>
            </Grid>
            <Grid item xs={12}>
              {" "}
              <Button variant="contained" type="submit" fullWidth>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default Login;
