import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { Box } from "@mui/material";
import Sidebar from "./constant/Sidebar";
import Home from "./pages/Home";
import LogIn from "./pages/Login";
import Create from "./pages/Create";
import UserManagement from "./components/users/UserManagement";
import EditUser from "./components/users/EditUser";
import AssignControls from "./components/users/AssignControls";
import PrivateRoute from "./utils/PrivateRoute";
import { useSelector } from "react-redux";
import PublicRoute from "./utils/PublicRoute";
import ProjectManagement from "./components/projects/ProjectManagement";
import MaterialManagement from "./components/materials/MaterialManagement";
import EditProject from "./components/projects/EditProject";
import EditMaterial from "./components/materials/EditMaterial";
import EditTask from "./components/projects/EditTask";
import EditVendor from "./components/vendors/EditVendor";
import VendorManagement from "./components/vendors/VendorManagement";

function App() {
  return (
    <div className="App">
      <Box>
        <Box>
          <Routes>
            <Route exact path="/login" element={<LogIn />} />
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Sidebar children={<Home />} />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/create"
              element={
                <PrivateRoute>
                  <Sidebar children={<Create />} />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/user/management"
              element={
                <PrivateRoute>
                  <Sidebar children={<UserManagement />} />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/projects/management"
              element={
                <PrivateRoute>
                  <Sidebar children={<ProjectManagement />} />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/material-management"
              element={
                <PrivateRoute>
                  <Sidebar children={<MaterialManagement />} />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/indent/edit/:id"
              element={
                <PrivateRoute>
                  <Sidebar children={<EditMaterial />} />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/user/edit/:id"
              element={
                <PrivateRoute>
                  <Sidebar children={<EditUser />} />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/user/assignControls/:id"
              element={
                <PrivateRoute>
                  <Sidebar children={<AssignControls />} />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/project/edit/:id"
              element={
                <PrivateRoute>
                  <Sidebar children={<EditProject />} />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/task/edit/:id"
              element={
                <PrivateRoute>
                  <Sidebar children={<EditTask />} />
                </PrivateRoute>
              }
            />
            ,
            <Route
              exact
              path="/vendor/edit/:id"
              element={
                <PrivateRoute>
                  <Sidebar children={<EditVendor />} />
                </PrivateRoute>
              }
            />
            ,
            <Route
              exact
              path="/vendor-management"
              element={
                <PrivateRoute>
                  <Sidebar children={<VendorManagement />} />
                </PrivateRoute>
              }
            />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;
