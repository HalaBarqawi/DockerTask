import React, { useState } from "react";
import { Box, useTheme ,Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTasksQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import FlexBetween from "components/FlexBetween";
import Popup from "components/Popup";
import AddTask from "scenes/form/addTask";

const Tasks = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [rowId,setRowId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedRow,setSelectedRow] = useState([]);
  const [openPopup,setOpenPopup] = useState(false)
  const { data, isLoading } = useGetTasksQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
 console.log("data",data)
 const closePopup = () => {
  setOpenPopup(false)
 }
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.7,
    },
    { field:"jobType",
      headerName:"Job Type",
      flex: 0.5,
    },
    {
      field: "fieldName",
      headerName: "Field Name",
      flex: 0.5,
    },
    {
      field: "workersName",
      headerName: "Workers Name",
      flex: 0.7,
      editable:true
    },
    {
      field: "deadline",
      headerName: "Deadline Date",
      flex: 0.5,
      renderCell: (params) => params.value ?`${new Date(params.value).getFullYear()}-${new Date(params.value).getMonth()}-${new Date(params.value).getDay()}`:null,
    },
    {
      field: "submitDate",
      headerName: "Submit Date",
      flex: 0.5,
      renderCell: (params) => `${new Date(params.value).getFullYear()}-${new Date(params.value).getMonth()}-${new Date(params.value).getDay()}`,
    },
    {
      field: "taskStatues",
      headerName: "Status",
      flex: 0.5,
    },
    {
      headerName:"Action",
      flex:0.7,
      renderCell: (params) => {
        const deleteWorker = (id)=>{
          try{
          fetch(`http://192.168.3.186:8000/delete-Task/${id}`,{
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
         <Button style={{color:'black',backgroundColor:'#f1e15b'}}>update</Button>
        <Button onClick={()=>deleteWorker(selectedRow._id)} style={{color:'black',backgroundColor:'#f47560',marginLeft:10}}>delete</Button>
        </>
        );

      }
    }
  ];
console.log("id",selectedRow)
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
      <Header title="TASKS" subtitle="Entire list of tasks" />
      <Box>
        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={() => setOpenPopup(true)}
        >
          Add New Task
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
        <Popup 
          title="Add Task"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          handleClose={closePopup}
          >
          <AddTask/>
          </Popup>
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.taskFilter) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
          onCellEditCommit = {params => setRowId(params.id)}
          onCellClick = {(newSelect)=>{
            setSelectedRow(newSelect.row);
          }}
        />
      </Box>
    </Box>
  );
};

export default Tasks;
