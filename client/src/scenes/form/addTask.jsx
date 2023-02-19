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
import { useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';

const AddTask = () => {

   const isNonMobile = useMediaQuery("(min-width:600px)");
   const [field,setField] = useState("");
   const [workers,setWorkers]= useState([])
   const [selectedWorkers,setSelectedWorkers] = useState([]);
   const [submitDate, setSubmitDate] = useState(new Date());
   const [jobType,setJobType] = useState("spray");
   const email = useSelector((state) => state.global.email);
   const { data, isLoading } = useGetFieldQuery(email);
   let workersList = [];
   useEffect(()=>{
      fetch(`http://192.168.3.186:8000/get-worker/${email}`,{
        method:"get",
      })
      .then((response) => response.json())
      .then(response => setWorkers(response))
      
   },[])

   useEffect(()=>{
      workers.map((item)=>workersList.push(item.label));
      console.log(workersList)
   },[workers])

   const handleFormSubmit = (values) => {
   
   const formData ={adminEmail:email,workersName:selectedWorkers,fieldName:field,deadline:submitDate,jopType:jobType,taskStatues:'not completed', isDone:false,duration:values.duration,note:values.note }
   console.log(formData)
   fetch('http://192.168.3.186:8000/add-Task',{
        method:"post",
        mode: 'cors',
        headers: {
         'Content-Type': 'application/json'
       },
        body:JSON.stringify(formData),
      })
      .then((res) => console.log(res))
   }
   console.log("w",workers)
   console.log("s",selectedWorkers)
   console.log("j",jobType)
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
               <Box sx={{ gridColumn: "span 2" ,color:'white'}}>
               <label style={{marginHorizontal:20,color:'white',fontSize:16}}>Job Type</label>
               <select
                 style={{marginLeft:20,width:150,height:30,marginTop:20}}
                 onChange={(e)=>{
                  setJobType(e.target.value)}}
                 >
                  <option value={"spray"}>Spray</option>
                  <option value={"fence repairs"}>Fence Repairs</option>
                  <option value={"hand weeding"}>Hand Weeding</option>
                  <option value={"irrigation"}>Irrigation</option>
                  <option value={"treatment"}>Treatment</option>
               </select>
               
               </Box>
         
            <Box sx={{ gridColumn: "span 3" }}>
             <label style={{marginHorizontal:20,color:'white',fontSize:16}}>Field Name</label>
               <select 
               isMulti
               onChange={(e)=>setField(e.target.value)} style={{backgroundColor:'#93a567',marginLeft:20,width:150,height:30}}>
                  {data &&
                     data.map((opts,i)=><option>{opts.label}</option>)
                  }
               </select>
            </Box>
            <Box sx={{ gridColumn: "span 4" }}>
             <label style={{marginHorizontal:20,color:'white',fontSize:16}}>Workers Team</label>
               {/* <select 
               onChange={(e)=>setSelectedWorkers(e.target.value)} style={{backgroundColor:'#93a567',marginLeft:20,width:150,height:30}} >
                  {workers &&
                     workers.map((opts,i)=><option>{opts.label}</option>)
                  }
               </select> */}
            <div className='text-dark' style={{width:300,color:'black'}}>
               <Multiselect
               isObject={false}
               options={workersList}
               showCheckbox
               onSelect={(event)=>setSelectedWorkers(event)}
               // onRemove={(event)=>}
               />
            </div>
            </Box>
               <Box sx={{ gridColumn: "span 4" }}>
               <label style={{marginHorizontal:20,color:'white',fontSize:16}}>Date doing the task</label>
               <DatePicker 
               selected={submitDate} onChange={(date) => setSubmitDate(date)}
               />
               </Box>
               <TextField
                 fullWidth
                 variant="filled"
                 type="number"
                 label="Expected duration"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.duration}
                 name="duration"
                 error={!!touched.duration && !!errors.duration}
                 helperText={touched.duration && errors.duration}
                 sx={{ gridColumn: "span 4" }}
               />
               <TextField
                 fullWidth
                 variant="filled"
                 type="text"
                 label="Note"
                 onBlur={handleBlur}
                 onChange={handleChange}
                 value={values.note}
                 name="note"
                 error={!!touched.note && !!errors.note}
                 helperText={touched.note && errors.note}
                 sx={{ gridColumn: "span 4" }}
               />
             </Box>
             <Box display="flex" justifyContent="center" mt="20px">
               <Button type="submit" color="secondary" variant="contained">
                 Add 
               </Button>
             </Box>
           </form>
         )}
       </Formik>
     </Box>
   );
 };
 const checkoutSchema = yup.object().shape({
   duration: yup.number().required("required"),
   note: yup.string().required("required"),
 });
 const initialValues = {
   duration:0,
   note:" ",
 };


export default AddTask