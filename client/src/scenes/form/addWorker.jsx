import React,{useState} from 'react'
import { Alert, Box, Button, TextField } from "@mui/material";
import { Formik,Field} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import { useSelector } from 'react-redux';

export default function AddWorker() {

   const isNonMobile = useMediaQuery("(min-width:600px)");
   const email = useSelector((state) => state.global.email);

   const handleFormSubmit = (values) => {
    
      const formData = {adminEmail:email,workerName:values.fullName,workerEmail:values.email,password:values.password,confirmPassword:values.confirmPassword,phoneNumber:values.phoneNumber,address:values.address,salary:values.salary}
      console.log(formData)
      fetch('http://192.168.3.186:8000/add-worker',{
           method:"post",
           mode: 'cors',
           headers: {
            'Content-Type': 'application/json'
          },
           body:JSON.stringify(formData),
         })
         .then((res) => console.log(res.json()))
         window.alert("added worker successfully!")
      }
      return (
        <Box  m="20px" 
      //   style={{backgroundColor:"#a9b785"}} 
        >
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} >
                  <Box
                     display="grid"
                     gap="30px"
                     gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                     sx={{
                     "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                     }}
                  >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Full Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fullName}
                    name="fullName"
                    error={!!touched.fullName && !!errors.fullName}
                    helperText={touched.fullName && errors.fullName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                   <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Confirm Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    error={!!touched.confirmPassword && !!errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    sx={{ gridColumn: "span 4" }}
                  />
   
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name="phoneNumber"
                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                    sx={{ gridColumn: "span 4" }}
                  />
             
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Salary"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.salary}
                  name="salary"
                  error={!!touched.salary && !!errors.salary}
                  helperText={touched.salary && errors.salary}
                  sx={{ gridColumn: "span 4" }}
                  placeholder="in dollar"
              />
              </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                   ADD
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      );
    };
    
    const checkoutSchema = yup.object().shape({
      email: yup.string().required("required"),
      fullName: yup.string().required("required"),
      phoneNumber: yup.number().required("required"),
      address: yup.string().required("required"),
      salary: yup.number().required("required"),
      password: yup.string().required("required"),
      confirmPassword: yup.string().required("required"),
    });
    const initialValues = {
      email: "",
      fullName:"",
      phoneNumber:0,
      address:"",
      salary:0,
      password:"",
      confirmPassword:"",
    };
   
