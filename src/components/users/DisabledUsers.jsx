import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  Box,
  IconButton,
  Pagination,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  edituserData,
  deleteuserData,
  fetchuserCount,
  fetchusersData,
} from "../../redux/app/action";
const DisabledUsers = ({ props }) => {
  const {
    dispatch,
    accessToken,
    searchTerm,
    currentPage,
    userCount,
    usersData,
    handlePagination,
    handleSearch,
  } = props;
  let sno = 0;
  const handleDelete = (id) => {
    dispatch(deleteuserData(id, accessToken)).then((res) => {
      if (res.type === "DELETE_USER_DATA_SUCCESS") {
        const isEnable = false;
        const isDeleted = false;
        dispatch(fetchuserCount(accessToken, isEnable, isDeleted));
        dispatch(
          fetchusersData(
            searchTerm,
            currentPage,
            accessToken,
            isEnable,
            isDeleted
          )
        );
      }
    });
  };

  const handleEnable = (id) => {
    dispatch(edituserData(id, { isEnable: true }, accessToken)).then((res) => {
      if (res.type === "EDIT_USER_DATA_SUCCESS") {
        const isEnable = false;
        const isDeleted = false;
        dispatch(fetchuserCount(accessToken, isEnable, isDeleted));
        dispatch(
          fetchusersData(
            searchTerm,
            currentPage,
            accessToken,
            isEnable,
            isDeleted
          )
        );
      }
    });
  };
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <TextField
        id="standard-basic"
        label="Search"
        variant="outlined"
        size="small"
        sx={{
          width: "100%",
          mb: "10px",
        }}
        onChange={handleSearch}
      />
      <Paper
        className="container"
        sx={{
          width: "100%",
          mb: "15px",
          boxShadow:
            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>User Role</TableCell>
              <TableCell>Enable</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData &&
              usersData.map(({ _id, fullname, role, isEnable }) => {
                sno = sno + 1;
                return (
                  <TableRow key={_id}>
                    <TableCell component="th" scope="row">
                      {sno}.
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Tooltip title="Edit">
                        <Link to={`/user/edit/${_id}`}>
                          <IconButton>
                            <EditNoteOutlinedIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{fullname}</TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell>
                      <Tooltip title="Enable">
                        <IconButton onClick={() => handleEnable(_id)}>
                          <ManageAccountsIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(_id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
      {searchTerm?.length <= 0 && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          count={Math.ceil(userCount / 5)}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handlePagination}
        />
      )}
    </div>
  );
};
export default DisabledUsers;
