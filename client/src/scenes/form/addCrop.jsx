import React,{useState} from 'react'
import { Alert, Box, Button, TextField } from "@mui/material";
import { Formik,Field} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import { useGetFieldQuery } from 'state/api';
import { useSelector } from 'react-redux';
import Select from "react-select";
import DatePicker from "react-datepicker";

export default function AddCrop() {
   const isNonMobile = useMediaQuery("(min-width:600px)");
   const [field,setField] = useState("");
   const [startDate, setStartDate] = useState(new Date());
   const [harvestDate, setHarvestDate] = useState(new Date());
   const email = useSelector((state) => state.global.email);
   const { data, isLoading } = useGetFieldQuery(email);
   console.log("f",data)

   const handleFormSubmit = (values) => {
 
   const formData = {email:email,cropName: values.cropName, fieldName:field, startingDate:startDate,HarvestDate:harvestDate,amount:values.amount,price:values.price}
   console.log(formData)
   fetch('http://192.168.3.186:8000/addCrops',{
        method:"post",
        mode: 'cors',
        headers: {
         'Content-Type': 'application/json'
       },
        body:JSON.stringify(formData),
      })
      .then((res) => window.alert("Added successfully!"))
   }
   return (
     <Box m="20px">
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
           <form onSubmit={handleSubmit}>
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
                 label="Crop Name"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.firstName}
                 name="cropName"
                 error={!!touched.cropName && !!errors.cropName}
                 helperText={touched.cropName && errors.cropName}
                 sx={{ gridColumn: "span 2" }}
               />

               <select onChange={(e)=>setField(e.target.value)} style={{backgroundColor:'#93a567'}}>
                  {data &&
                     data.map((opts,i)=><option>{opts.label}</option>)
                  }
               </select>
               <Box sx={{ gridColumn: "span 3" }}>
               <label style={{color:"white"}} >Planting Date</label>
               <DatePicker 
               selected={startDate} onChange={(date) => setStartDate(date)}
               />
               </Box>
               <Box sx={{ gridColumn: "span 3" }}>
               <label style={{color:"white"}} >Expected Harvest Date</label>
               <DatePicker 
               selected={harvestDate} onChange={(date) => setHarvestDate(date)}
               />
               </Box>

               <TextField
                 fullWidth
                 variant="filled"
                 type="number"
                 label="Amount"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.amount}
                 name="amount"
                 error={!!touched.amount && !!errors.amount}
                 helperText={touched.amount && errors.amount}
                 sx={{ gridColumn: "span 4" }}
               />
               <TextField
                 fullWidth
                 variant="filled"
                 type="number"
                 label="Price"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.price}
                 name="price"
                 error={!!touched.price && !!errors.price}
                 helperText={touched.price && errors.price}
                 sx={{ gridColumn: "span 4" }}
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
   cropName: yup.string().required("required"),
   amount: yup.number().required("required"),
   price: yup.number().required("required"),
 });
 const initialValues = {
   cropName: "",
   amount:0,
   price:0,
   
 };
