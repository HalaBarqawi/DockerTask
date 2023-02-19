import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PermIdentityOutlined,
  Traffic,
  LocationOnOutlined
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import RevenueChart from "components/OverviewChart";
import { useGetCountQuery,useGetFieldNumberQuery,useGetExpenseQuery } from "state/api";
import StatBox from "components/StatBox";
import { useSelector } from "react-redux";
import BarChart from "components/BarChart";
import TasksPieChart from "components/TasksPieChart";
import LineChart from "components/LineChart";
import NavBar from "components/Navbar";
import SeasonSales from "components/SalesBySeason";
import SeasonExpense from "components/SeasonExpense";

const Dashboard = () => {
  const theme = useTheme();
  const email = useSelector((state) => state.global.email);
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetCountQuery(email);
  // const {data:expense} = useGetExpenseQuery(email);
  // console.log("workers",data)
   console.log("all data",data)
  //  console.log("ex",expense)
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Workers"
          value={data && data.worker}
          icon={
            <PermIdentityOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Fields"
          value={data && data.field}
          icon={
            <LocationOnOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
         <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
            <BarChart isDashboard={true} />
        </Box>
        {/* <Box height="500px" m="-20px 0 0 0">
            <NavBar isDashboard={true} />
        </Box> */}
       
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >

           <StatBox
            title="Total Tasks"
            value={data && data.allTask}
           />
           <Box
            // mt="10px"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            // gridAutoRows="160px"
            gap="60px"
            sx={{
              "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
            }}
          > 
          <StatBox
          title="Completed"
          value={data && data.completeTask}
           />
          <StatBox
          title="Pending"
          value={data && data.pendingTask}
           />
          </Box>
          <TasksPieChart isDashboard={true} />
        </Box>
        {/* <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        /> */}

        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
                >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box> */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Revenues By Season
          </Typography>
          <RevenueChart  isDashboard={true} />
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Season
          </Typography>
          <SeasonSales isDashboard={true} />
        </Box>

        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Expenses By Season
          </Typography>
          <SeasonExpense isDashboard={true} />
        </Box>

        

      </Box>
    </Box>
  );
};

export default Dashboard;
