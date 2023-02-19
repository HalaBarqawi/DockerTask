import React ,{useState}from 'react'
import { Alert, Box, Button, TextField } from "@mui/material";
import { Formik,Field} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import { useGetCategoryQuery } from 'state/api';
import { useSelector } from 'react-redux';
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useEffect } from 'react';

export default function AddExpense() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [type,setType] = useState("");
  const [submitDate, setSubmitDate] = useState(new Date());
  const [selectedId,setSelectedId] = useState("");
  const [selectedName,setSelectedName] = useState("");
  const email = useSelector((state) => state.global.email);
  const {data,isLoading} = useGetCategoryQuery(email);

  let catInfo = [];

  if(data){
  data.forEach((item)=>{
     catInfo.push({name:item.name,id:item._id})
  })}

console.log(catInfo)
console.log(data)
 
// const getCategoryId = (name) =>{
//   const res = catInfo.find(element => element.name === name);
//   setSelectedId(res);
//   console.log(res);
// }
  const handleFormSubmit = (values) => {
    console.log("hi")
  const formData = {email:email,categoryId:selectedId,Name:values.name,HDate:submitDate,amount:values.amount,typeExpense:type}
  console.log("add",formData)
  fetch('http://192.168.3.186:8000/add-expense',{
       method:"post",
       mode: 'cors',
       headers: {
        'Content-Type': 'application/json'
      },
       body:JSON.stringify(formData),
     })
     .then((res) =>window.alert("added successfully!"))
  }
  console.log("i",selectedId)
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
                label="Transaction name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 3" }}
              />

               <Box sx={{ gridColumn: "span 2" ,color:'white'}}>
                  <label style={{marginHorizontal:20,color:'white',fontSize:16}}>Transaction Type</label>
                    <select
                      style={{marginLeft:20,width:150,height:30,marginTop:20}}
                      onChange={(e)=>{
                        setType(e.target.value)}}
                      >
                        <option value={"expense"}>Expense</option>
                        <option value={"income"}>Income</option>
                    </select>
               </Box>

               <select onChange={(e)=>setSelectedId(e.target.value)} >
                  {catInfo &&
                     catInfo.map((opts,i)=><option value={opts.id}>{opts.name}</option>)
                  }
               </select>

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Cost/ Income"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
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
  name: yup.string().required("required"),
  amount: yup.number().required("required"),
  price: yup.number().required("required"),
});
const initialValues = {
  name: "",
  amount:0,
  
};
