import PropTypes from "prop-types";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import {
  Box,
  Divider,
  IconButton,
  TextField,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Tooltip,
  Button,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";

import {
  deleteTask,
  fetchTaskSearch,
  fetchtasksData,
} from "../../redux/task/action";
import { Link } from "react-router-dom";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewTaskModal from "../projects/ViewTaskModal";
import { toast } from "react-toastify";
const labelStyles = {
  marginTop: "-0px",
};

export default function TaskManagement({
  projectId,
  open,
  handleClose,
  projectData,
}) {
  const dispatch = useDispatch();
  const { projectTasksData } = useSelector((store) => store.TaskReducer);
  // console.log('data => ',useSelector(store => store.TaskReducer))
  console.log("projectdata =>", projectData?.projectSupervisor?.fullname);
  const { accessToken } = useSelector((store) => store.AuthReducer);
  const [del, setdel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasks = [];
  useEffect(() => {
    dispatch(fetchtasksData(accessToken, projectId)).then((res) =>
      console.log("fetch", res.payload)
    );
    // console.log(tasksData);
  }, [projectId, accessToken]);
  const handleSearch = (e) => {
    console.log("Seaching");
    const searchTerm = e.target.value;
    dispatch(
      fetchTaskSearch(accessToken, searchTerm, currentPage, projectId, false)
    );
  };
  const handleDelete = (id) => {
    console.log("Deleting", id);
    dispatch(deleteTask(id, accessToken, projectId)).then((res) => {
      if (res.type === "DELETE_PROJECT_TASK_DATA_SUCCESS") {
        dispatch(fetchtasksData(accessToken, projectId));
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
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={StyledBackdrop}
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <IconButton
              sx={{ position: "absolute", right: 8, top: 8 }}
              onClick={handleClose}
            >
              <ClearIcon />
            </IconButton>
            <TextField
              id="standard-basic"
              label="Search"
              variant="outlined"
              size="small"
              sx={{
                width: "100%",
                mt: "20px",
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
                    <TableCell> Task Name</TableCell>
                    <TableCell>Unit of Work</TableCell>
                    <TableCell>Project Supervisor</TableCell>
                    <TableCell>View</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projectTasksData?.map((task, index) => {
                    if (!task.isDeleted) {
                      // console.log(project);
                      return (
                        <TableRow key={task._id}>
                          <TableCell>{index + 1}.</TableCell>
                          <TableCell component="th" scope="row">
                            {task.taskName}
                          </TableCell>
                          <TableCell>{task.unitOfWork}</TableCell>
                          <TableCell>
                            {projectData?.projectSupervisor?.fullname}
                          </TableCell>
                          <TableCell>
                            <ViewTaskModal task={task} />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Edit">
                              <Link to={`/task/edit/${task._id}`}>
                                <IconButton>
                                  <EditNoteOutlinedIcon />
                                </IconButton>
                              </Link>
                            </Tooltip>
                          </TableCell>

                          <TableCell>
                            <Tooltip title="Delete">
                              {!del ? (
                                <IconButton onClick={() => setdel(true)}>
                                  <DeleteIcon />
                                </IconButton>
                              ) : (
                                <div>
                                  <Button
                                    sx={{
                                      backgroundColor: "gray",
                                    }}
                                    variant="contained"
                                    onClick={() => setdel(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="contained"
                                    sx={{
                                      backgroundColor: "red",
                                      marginLeft: "10px",
                                    }}
                                    startIcon={<DeleteIcon />}
                                    onClick={() => {
                                      handleDelete(task._id);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </Paper>
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  );
}

const Backdrop = forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: "95%",
  height: "95%",
  overflow: "scroll",
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
