import React, { useState } from "react";
import { useEffect } from "react";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { ToastContainer, toast } from "react-toastify";
import { fetchindentsData, editIndent } from "../../redux/indent/action";
import ViewModal from "./ViewModal";

const MaterialManagement = () => {
  const { accessToken } = useSelector((store) => store.AuthReducer);
  const { indentsData } = useSelector((store) => store.IndentReducer);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [indentCount, setIndentCount] = useState(0);
  const [projectId, setProjectId] = useState(-1);
  const handleOpen = (id) => {
    setProjectId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handlePagination = (e, newPage) => {
    setCurrentPage(newPage);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchindentsData(accessToken, searchTerm, currentPage, false));
  }, [searchTerm, accessToken, currentPage]);
  useEffect(() => {
    setIndentCount(indentsData ? indentsData.length : 0);
  }, [indentsData]);
  const handleDelete = (id) => {
    dispatch(editIndent(id, { isDeleted: true }, accessToken)).then((res) => {
      if (res.type === "EDIT_INDENT_SUCCESS") {
        dispatch(fetchindentsData(accessToken, searchTerm, currentPage, false));
      } else {
        toast.error("Something went wrong, Please try again !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    });
  };

  // console.log(projectsData, accessToken);

  return (
    <div
      style={{
        width: "100%",
        padding: "15px",
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
              <TableCell>Material Name</TableCell>
              <TableCell>Unit of Material</TableCell>
              <TableCell>Supervisor</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {indentsData?.map((indent, index) => {
              return (
                <TableRow key={indent._id}>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell component="th" scope="row">
                    {indent?.materialName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {indent?.unitOfMaterial}
                  </TableCell>
                  <TableCell>{indent?.supervisorName?.fullname}</TableCell>
                  <TableCell>
                    <ViewModal indent={indent} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <Link to={`/indent/edit/${indent._id}`}>
                        <IconButton>
                          <EditNoteOutlinedIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(indent._id)}>
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
      <ToastContainer />
      {searchTerm?.length <= 0 && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          count={Math.ceil(indentCount / 5)}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handlePagination}
        />
      )}
    </div>
  );
};
export default MaterialManagement;
