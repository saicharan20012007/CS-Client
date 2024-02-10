import React from "react";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import {
  Box,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
const DeletedUsers = ({ props }) => {
  const {
    searchTerm,
    currentPage,
    userCount,
    usersData,
    handlePagination,
    handleSearch,
  } = props;
  let idx = 0;
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
              <TableCell>S.NO.</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>User Role</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData &&
              usersData.map(({ _id, fullname, role, email, isDeleted }) => {
                if (isDeleted) {
                  idx = idx + 1;
                  return (
                    <TableRow key={_id}>
                      <TableCell>{idx}</TableCell>
                      <TableCell>{fullname}</TableCell>
                      <TableCell>{role}</TableCell>
                      <TableCell>{email}</TableCell>
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
export default DeletedUsers;
