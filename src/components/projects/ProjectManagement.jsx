import React, { useState } from "react";
import { useEffect } from "react";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Modal,
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
import { fetchprojectsData, editProject } from "../../redux/project/action";
import ViewModal from "./ViewModal";
import TaskManagement from "../tasks/TaskManagement";
import AddTaskIcon from "@mui/icons-material/AddTask";

const ProjectManagement = () => {
  const { accessToken } = useSelector((store) => store.AuthReducer);
  const { projectsData, projectNames } = useSelector(
    (store) => store.ProjectReducer
  );
  const totalProjects = projectNames?.length || 0;
  // console.log(
  //   "projects =>",
  //   useSelector((store) => store)
  // );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [projectCount, setProjectCount] = useState(0);
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
    dispatch(fetchprojectsData(accessToken, searchTerm, currentPage, false));
  }, [searchTerm, accessToken, currentPage]);
  useEffect(() => {
    setProjectCount(projectsData ? projectsData.length : 0);
  }, [projectsData]);
  const handleDelete = (id) => {
    dispatch(editProject(id, { isDeleted: true }, accessToken)).then((res) => {
      if (res.type === "EDIT_PROJECT_SUCCESS") {
        dispatch(
          fetchprojectsData(accessToken, searchTerm, currentPage, false)
        );
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
              <TableCell> Project Name</TableCell>
              <TableCell>Assigned Tasks</TableCell>
              <TableCell>Project Supervisor</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectsData?.map((project, index) => {
              if (!project.isDeleted) {
                // console.log(project.tasks);
                return (
                  <TableRow key={project._id}>
                    <TableCell>{index + 1}.</TableCell>
                    <TableCell component="th" scope="row">
                      {project.projectName}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpen(project._id)}>
                        <AddTaskIcon />
                      </IconButton>
                      {open && (
                        <TaskManagement
                          projectId={projectId}
                          open={open}
                          handleClose={handleClose}
                          projectData={project}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {project?.projectSupervisor?.fullname}
                    </TableCell>
                    <TableCell>
                      <ViewModal project={project} />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <Link to={`/project/edit/${project._id}`}>
                          <IconButton>
                            <EditNoteOutlinedIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(project._id)}>
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
      <ToastContainer />
      {searchTerm?.length <= 0 && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          count={Math.ceil(totalProjects / 10)}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handlePagination}
        />
      )}
    </div>
  );
};
export default ProjectManagement;
