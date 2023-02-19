import React, { useState } from "react";
import { Box, useTheme ,Button} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetExpenseQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import AddExpense from "scenes/form/addExpense";
import Popup from "components/Popup";

const Expenses = () => {

  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const email = useSelector((state) => state.global.email);
  const { data, isLoading } = useGetExpenseQuery(email);
  const [status,setStatus] = useState("");
  const [openPopup,setOpenPopup] = useState(false)
  const [selectedRow,setSelectedRow] = useState([]);

 console.log(data)
 console.log(selectedRow)
 const closePopup = () => {
  setOpenPopup(false)
 }

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.7,
    },
    {
      field: "Name",
      headerName: "Expense Type",
      flex: 0.5,
      editable:true
    },
    {
      field: "amount",
      headerName: "Cost",
      flex: 0.5,
      editable:true
    },
    {
      field: "HDate",
      headerName: "Created At",
      flex: 0.5,
      editable:true,
      renderCell: (params) => params.value ?`${new Date(params.value).getFullYear()}-${new Date(params.value).getMonth()}-${new Date(params.value).getDay()}`:null,
    },
    {
      headerName:"Action",
      flex:0.8,
      renderCell: (params) => {
        const updateExpense = (data)=>{
      
          const id = data._id;
          console.log("id",id)
          const formData = {Name:data.Name,HDate:data.HDate,amount:data.amount,typeExpense:data.typeExpense}

          fetch(`http://192.168.3.186:8000/edit-expense/${id}`,{
             method:"put",
             mode: 'cors',
             headers: {
                'Content-Type': 'application/json'
             },
             body:JSON.stringify(formData),
             })
             .then((res)=>window.alert("updated successfully!"))
             .catch((err)=>console.log(err))
        }
        const deleteExpense = (id)=>{
          console.log(id)
            try{
            fetch(`http://192.168.3.186:8000/delete-exp/${id}`,{
               method:"delete",
               mode: 'cors',
               headers: {
                  'Content-Type': 'application/json'
               },
               })
               .then((res) => window.alert("deleted successfully!") )
              }
            catch(err){
              console.log(err)
            }
            }
        
        return (
        <>
        <Button onClick={()=>updateExpense(selectedRow)} style={{color:'black',backgroundColor:'#f1e15b'}}>update</Button>
        <Button onClick={()=>deleteExpense(selectedRow._id)} style={{color:'black',backgroundColor:'#f47560',marginLeft:10}}>delete</Button>
        </>
        );

      }
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
      <Header title="Expenses" subtitle="Track your farm Expenses Here" />
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
          Add New Transaction
        </Button>
      </Box>
      </FlexBetween>
      <Box
        height="80vh"
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
          title="Add Transaction"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          handleClose={closePopup}
          >
          <AddExpense/>
          </Popup> : null
           }
         <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data ) || []}
          columns={columns}
          onCellClick = {(newSelect)=>{
            setSelectedRow(newSelect.row);
          }}
        />
      </Box>
    </Box>
  );
};

export default Expenses;
