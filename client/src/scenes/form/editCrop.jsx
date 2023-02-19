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

export default function EditCrop(props) {
   const allData = props.item;
   const isNonMobile = useMediaQuery("(min-width:600px)");
   const [field,setField] = useState(allData.fieldName);
   const [startDate, setStartDate] = useState(new Date(allData.startingDate));
   const [harvestDate, setHarvestDate] = useState(new Date(allData.HarvestDate));
   const email = useSelector((state) => state.global.email);
   const { data, isLoading } = useGetFieldQuery(email);
   console.log(allData)
   const checkoutSchema = yup.object().shape({
      cropName: yup.string().required("required"),
      amount: yup.number().required("required"),
      price: yup.number().required("required"),
    });
    const initialValues = {
      cropName:allData.cropName,
      amount:allData.amount,
      price:allData.price,
    };

   const handleFormSubmit = (values) => {
      const formData = {email:allData.email,cropName: values.cropName,fieldName:field,startingDate:startDate,HarvestDate:harvestDate,amount:values.amount,price:values.price}
      console.log(formData)
      const id = allData._id;
      fetch(`http://192.168.3.186:8000/updatecrop/${id}`,{
         method:"put",
         mode: 'cors',
         headers: {
            'Content-Type': 'application/json'
         },
         body:JSON.stringify(formData),
         })
         .then((res) => window.alert("updated successfully!"))
   }
   return (
     <Box m="20px" >
 
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
                 value={values.cropName}
                 name="cropName"
                 error={!!touched.cropName && !!errors.cropName}
                 helperText={touched.cropName && errors.cropName}
                 sx={{ gridColumn: "span 2" }}
               />

               <select onChange={(e)=>setField(e.target.value)} style={{backgroundColor:'#93a567'}}>
                 
                  {data &&
                     data.map((opts,i)=>
                      allData.fieldName.toString() === opts.label ?
                     <option selected>{opts.label}</option>:<option>{opts.label}</option>)
                  }
               </select>
               <Box sx={{ gridColumn: "span 3" }}>
               <label >Planting Date</label>
               <DatePicker 
               selected={startDate} onChange={(date) => setStartDate(date)}
               />
               </Box>
               <Box sx={{ gridColumn: "span 3" }}>
               <label >Expected Harvest Date</label>
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
             <Box display="flex" justifyContent="end" mt="20px">
               <Button type="submit" color="secondary" variant="contained">
                 UPDATE
               </Button>
             </Box>
           </form>
         )}
       </Formik>
     </Box>
   );
 };
 
