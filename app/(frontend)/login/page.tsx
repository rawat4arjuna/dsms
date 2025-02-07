"use client"

import { useFormik } from "formik";
import Link from "next/link";
import * as yup from "yup";
import Image from "next/image";
import login from "./login-final.svg";
import { Typography, TextField, Paper, Button, Container } from "@mui/material";

const schema = yup.object({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().min(6).required("Please enter your password")
})



const Login = () => {

  const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    },
    validationSchema: schema
  })

  console.log(errors);
  

  return (
    <>
      <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <Image src={login} width={"auto"} height={"100vh"} alt="login-image" />
              
                  <Paper elevation={3} sx={{height: "60vh", width: "25vw", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: "20px", padding: "20px"}}>
          <form
            action="#"
            onSubmit={handleSubmit}
            className="flex flex-col justify-around h-full"
          >
            <Typography variant="h1" component="h2" sx={{textAlign: "center"}}>
              {/* DSMS */}
            </Typography>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                  type="email"
                  name="email"
                  value={ values.email }
                  onChange={ handleChange }
                  onBlur={handleBlur}
                  sx={{width: "20vw"}}
              />
                {errors.email && touched.email ? <Typography sx={{fontSize: "1rem", color: "red"}} variant="h6">{ errors.email}</Typography> : null}
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                  type="password"
                  name="password"
                  value={ values.password }
                  onChange={ handleChange }
                  onBlur={handleBlur}
                  sx={{width: "20vw"}}
                />
                {errors.password && touched.password ? <Typography sx={{fontSize: "1rem", color: "red"}} variant="h6">{ errors.password}</Typography> : null}
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
