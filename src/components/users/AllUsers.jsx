import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import {
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  edituserData,
  deleteuserData,
  fetchuserCount,
  fetchusersData,
} from "../../redux/user/action";

const AllUsers = ({ props }) => {
  const {
    dispatch,
    searchTerm,
    currentPage,
    accessToken,
    userCount,
    usersData,
    handlePagination,
    handleSearch,
    handleChangeEnableDisable,
  } = props;
  let sno = 0;
  const handleDelete = (id) => {
    dispatch(deleteuserData(id, accessToken)).then((res) => {
      if (res.type === "DELETE_USER_DATA_SUCCESS") {
        const isEnable = true;
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

  const handleDisable = (id) => {
    dispatch(edituserData(id, { isEnable: false }, accessToken)).then((res) => {
      if (res.type === "EDIT_USER_DATA_SUCCESS") {
        const isEnable = true;
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
              <TableCell> Assign Controls</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>User Role</TableCell>
              <TableCell>Disable</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData?.map(({ _id, fullname, role, isEnable }) => {
              if (isEnable) {
                sno = sno + 1;
                return (
                  <TableRow key={_id}>
                    <TableCell>{sno}.</TableCell>
                    <TableCell component="th" scope="row">
                      <Tooltip title="Edit">
                        <Link to={`/user/edit/${_id}`}>
                          <IconButton>
                            <EditNoteOutlinedIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Link to={`/user/assignControls/${_id}`}>
                        <IconButton>
                          <StorageOutlinedIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                    <TableCell>{fullname}</TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell>
                      <Tooltip title="Disable">
                        <IconButton onClick={() => handleDisable(_id)}>
                          <BlockIcon />
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
              }
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
export default AllUsers;
