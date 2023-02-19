import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Crops from "scenes/crops";
import MyTabs from "scenes/tabs";
import Workers from "scenes/workers"; 
import Tasks from "scenes/tasks";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Login from "scenes/login";
import Expenses from "scenes/expenses";
import Sales from "scenes/sales";
import AddCrop from "scenes/form/addCrop";
import AddTask from "scenes/form/addTask";
import EditCrop from "scenes/form/editCrop";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/crops" element={<MyTabs />} />
              <Route path="/addCrop" element={<AddCrop />} />
              <Route path="/addTask" element={<AddTask />} />
              <Route path="/planted" element={<Crops />} />
              <Route path="/workers" element={<Workers />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/expenses" element={<Expenses/>}/>
              <Route path="/sales" element={<Sales/>}/>
              <Route path="/admin" element={<Admin />} />
              
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
