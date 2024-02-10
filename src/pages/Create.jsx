import React from "react";
import MemberForm from "../components/create/MemberForm";
import ProjectForm from "../components/create/ProjectForm";
import TaskForm from "../components/create/TaskForm";
import IndentForm from "../components/create/IndentForm";
import PurchaseorderForm from "../components/create/PurchaseorderForm";
import VendorForm from "../components/create/VendorForm";
import IssueForm from '../components/create/IssueForm'
import { Box, Tabs, Tab, Typography } from "@mui/material";
import Loader from "../constant/Loader";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="Customtabpanel"
      hidden={value !== index}
      id={`simple-Customtabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-Customtabpanel-${index}`,
  };
}

export default function Create() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        minWidth: "100%",
        maxWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example">
          <Tab label="Create Member" {...a11yProps(0)} />
          <Tab label="Create Project" {...a11yProps(1)} />
          <Tab label="Create Task" {...a11yProps(2)} />
          <Tab label="Create Issue" {...a11yProps(3)} />
          <Tab label="Create Vendor" {...a11yProps(4)} />
          <Tab label="Create Indent" {...a11yProps(5)} />
          <Tab label="Create Purchase Order" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <Box
        sx={{
          width: "100%",
        }}>
        <CustomTabPanel value={value} index={0}>
          <MemberForm title="Create Member" />
        </CustomTabPanel>
        <CustomTabPanel
          value={value}
          index={1}
          sx={{
            position: "relative",
          }}>
             <ProjectForm title="Create Project" />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
            <TaskForm title="Create Task" />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
            <IssueForm title="Create Issue" />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
            <VendorForm title="Create Vendor" />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
            <IndentForm title="Create Indent" />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
            <PurchaseorderForm title="Create Purchase Order" />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
