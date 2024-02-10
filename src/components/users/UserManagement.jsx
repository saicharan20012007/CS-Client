import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import AllUsers from "./AllUsers";
import DisabledUsers from "./DisabledUsers";
import DeletedUsers from "./DeletedUsers";
import { useDispatch, useSelector } from "react-redux";
import {
  edituserData,
  fetchuserCount,
  fetchusersData,
} from "../../redux/user/action";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="Customtabpanel"
      hidden={value !== index}
      id={`simple-Customtabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, width: "100%" }}>
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

export default function UserManagement() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { accessToken } = useSelector((store) => store.AuthReducer);
  const { userCount, usersData } = useSelector((store) => store.UserReducer);
  const [isEnable, setIsEnable] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const handlePagination = (e, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      setIsEnable(true);
      setIsDeleted(false);
    } else if (newValue === 1) {
      setIsEnable(false);
      setIsDeleted(false);
    } else {
      setIsEnable(false);
      setIsDeleted(true);
    }
    setValue(newValue);
  };

  const handleChangeEnableDisable = (id, value) => {
    dispatch(edituserData(id, { isEnable: value }, accessToken));
  };

  useEffect(() => {
    dispatch(fetchuserCount(accessToken, isEnable, isDeleted));
    dispatch(
      fetchusersData(searchTerm, currentPage, accessToken, isEnable, isDeleted)
    );
  }, [accessToken, currentPage, searchTerm, value]);

  return (
    <Box
      sx={{
        minWidth: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
          width: "100%", // Set the width to 100%
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTabs-root": {
            width: "100%",
          },
        }}
      >
        <Tab
          label="All Members"
          sx={{ minWidth: "fit-content", flex: 1 }}
          {...a11yProps(0)}
        />
        <Tab
          label="Disabled Members"
          sx={{ minWidth: "fit-content", flex: 1 }}
          {...a11yProps(1)}
        />
        <Tab
          label="Deleted Members"
          sx={{ minWidth: "fit-content", flex: 1 }}
          {...a11yProps(2)}
        />
      </Tabs>
      <Box>
        <CustomTabPanel value={value} index={0}>
          <AllUsers
            title="All Members"
            props={{
              currentPage,
              searchTerm,
              userCount,
              usersData,
              handleChange,
              handlePagination,
              handleSearch,
              dispatch,
              accessToken,
              handleChangeEnableDisable,
            }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <DisabledUsers
            title="Disabled Members"
            props={{
              currentPage,
              searchTerm,
              userCount,
              usersData,
              handleChange,
              handlePagination,
              handleSearch,
              dispatch,
              accessToken,
              handleChangeEnableDisable,
            }}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <DeletedUsers
            title="Deleted Members"
            props={{
              currentPage,
              searchTerm,
              userCount,
              usersData,
              handleChange,
              handlePagination,
              handleSearch,
              dispatch,
              accessToken,
            }}
          />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
