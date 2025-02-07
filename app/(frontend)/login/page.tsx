"use client"

import { Formik, useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { Typography, TextField, Paper, Button, Container } from "@mui/material";
import Controller from "@/app/(Components)/Formik/form/fields/Controller";
import useAuth from "@/app/hooks/useAuth";

const schema = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().min(6).required("Please enter your password")
})



const Login = () => {
const {handleLogin} = useAuth()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values, action) => {
      console.log(values);
      handleLogin(values)
      action.resetForm();
    },
    validationSchema: schema
  })

 const formJson = [
  {
    label: "Email",
    type: "textfield",
    name: "email",
    required: true
  },
  {
    label: "Password",
    type: "textfield",
    name: "password",
    required: true
  }
 ]
  

  return (
    <>
      <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
 
              
    <Paper elevation={3} sx={{height: "60vh", width: "25vw", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: "20px", padding: "20px"}}>
          <form
            action="#"
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-around h-full"
          >
            <Typography variant="h1" component="h2" sx={{textAlign: "center"}}>
              {/* DSMS */}
            </Typography>
             {formJson.map(v=> <Controller {...v} formik={formik} onBlur={()=>{}}/>)}
              <Link href="/forgotpassword">Forgot Password?</Link>
              <Button variant="contained" type="submit">
                Login
              </Button>
            
          </form>
        </Paper>
        
      </Container>
    </>
  );
};

export default Login;
