import React from "react";
import { Box, useTheme ,Button } from "@mui/material";
import { useGetWorkersQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import AddWorker from "scenes/form/addWorker";
import { useState } from "react";
import EditWorker from "scenes/form/editWorker";
import Popup from "components/Popup";

const Workers = () => {
  const theme = useTheme();
  const email = useSelector((state) => state.global.email);
  const { data, isLoading } = useGetWorkersQuery(email);
  const [status,setStatus] = useState("");
  const [openPopup,setOpenPopup] = useState(false)
  const [rowId,setRowId] = useState("");
  const [selectedRow,setSelectedRow] = useState([]);
  console.log(data);
  console.log(rowId)
  
  const closePopup = () => {
    setOpenPopup(false)
  }
 
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.6,
    },
    {
      field: "workerName",
      headerName: "Name",
      flex: 0.5,
      editable:true
    },
    {
      field: "workerEmail",
      headerName: "Email",
      flex: 0.5,
      editable:true
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      editable:true
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.4,
      editable:true
    },
    {
      field: "salary",
      headerName: "Salary",
      flex: 0.4,
      editable:true
    },
    {
      headerName:"Action",
      flex:0.8,
      renderCell: (params) => {
        const updateWorker = (data)=>{
      
          const id = data._id;
          console.log("id",id)
          const formData = {workerName:data.workerName,phoneNumber:data.phoneNumber,address:data.address,salary:data.salary}

          fetch(`http://192.168.3.186:8000/update-Worker/${id}`,{
             method:"put",
             mode: 'cors',
             headers: {
                'Content-Type': 'application/json'
             },
             body:JSON.stringify(formData),
             })
             .then(()=>window.alert("updated successfully!"))
             .catch((err)=>console.log(err))
        }
        const deleteWorker = (id)=>{
            try{
            fetch(`http://192.168.3.186:8000/delete-Worker/${id}`,{
               method:"delete",
               mode: 'cors',
               headers: {
                  'Content-Type': 'application/json'
               },
               })
               .then(() => window.alert("deleted successfully!") )
              }
            catch(err){
              console.log(err)
            }
            }
        
        return (
        <>
        <Button onClick={()=>updateWorker(selectedRow)} style={{color:'black',backgroundColor:'#f1e15b'}}>update</Button>
        <Button onClick={()=>deleteWorker(selectedRow._id)} style={{color:'black',backgroundColor:'#f47560',marginLeft:10}}>delete</Button>
        </>
        );

      }
    }
  ];
  console.log("sele",selectedRow)
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
      <Header title="Workers" subtitle="List of Workers" />
      <Box>
        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={() =>{
            setStatus("add")
            setOpenPopup(true)
          } }
        >
          Add New Worker
        </Button>
      </Box>
      </FlexBetween>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        { status === "add" ? 
          <Popup 
          title="Add Worker"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          handleClose={closePopup}
          >
            <AddWorker/>
          </Popup> : null
           }
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
          onCellEditCommit = {params => setRowId(params.rows)}
          onCellClick = {(newSelect)=>{
            setSelectedRow(newSelect.row);
          }}
       />
      </Box>
    </Box>
  );
};

export default Workers;
