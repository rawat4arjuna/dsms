"use client"

import * as yup from "yup";
import { useFormik } from "formik";
import { Paper, Button, Box, Typography, TextField } from "@mui/material";
import Image from "next/image";
import image from "./login-final.svg"

const schema = yup.object({
  email: yup.string().email().required("Please enter your email")
})

export default function ForgotPassword() {

  const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit: (values, actions) => {
      console.log(values);
      actions.resetForm()
    },
    validationSchema: schema
  })

  console.log(errors);
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
          >
              <Image src={image} alt="forgotpass"/>
        <Paper sx={{ width: "auto", height: "auto", padding: "40px" }}>
          <form
            action=""
            className="flex flex-col gap-5"
             onSubmit={handleSubmit}
          >
            <Typography variant="h2">Forgot Password</Typography>

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={ values.email }
              onChange={ handleChange }
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? <Typography sx={{fontSize: "1rem", color: "red"}} variant="h6">{ errors.email}</Typography> : null}
            <Button variant="contained" type="submit">
              Continue
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}
