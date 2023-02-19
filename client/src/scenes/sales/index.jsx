import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const Sales = () => {
  const theme = useTheme();
  const email = useSelector((state) => state.global.email);
  const { data, isLoading } = useGetSalesQuery(email);
  console.log("data", data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.6,
    },
    {
      field: "harvestName",
      headerName: "Crop Name ",
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.5,
    },
    {
      field: "boxSize",
      headerName: "Box Size",
      flex: 0.5,
    },
    {
      field: "quality",
      headerName: "Quality",
      flex: 0.4,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      flex: 0.4,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Sales" subtitle="List of Sales from harvested crops" />
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
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Sales;
