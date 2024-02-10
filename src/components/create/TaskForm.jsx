import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  CircularProgress,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
} from "../../redux/task/action";
import {
  fetchprojectNames
} from "../../redux/project/action"
import {
  fetchuserNames
} from "../../redux/user/action";

const TaskForm = ({ title }) => {
  const dispatch = useDispatch();
  const { userNames }  = useSelector(
    (store) => store.UserReducer
  );
  const { isLoading } = useSelector(
    (store) => store.TaskReducer
  );
  const { projectNames } = useSelector(
    (store) => store.ProjectReducer
  );
  const { accessToken } = useSelector((store) => store.AuthReducer);

  const [taskDetails, setTaskDetails] = useState({});

  useEffect(() => {
    dispatch(fetchprojectNames(accessToken));
    dispatch(fetchuserNames(accessToken));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setTaskDetails((prev) => ({ ...prev, [name]: value }));
    // console.log(taskDetails);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(taskDetails);
    dispatch(createTask(taskDetails, accessToken)).then((res) => {
      if (res.type === "CREATE_TASK_SUCCESS") {
        toast.success("Task created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTaskDetails({});
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
    userNames !== null &&
    projectNames !== null && (
      <Box
        sx={{
          width: "auto",
          margin: "0 auto",
          boxShadow:
            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
          padding: "15px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Task Name"
            name="taskName"
            value={taskDetails?.taskName || ""}
            onChange={handleChange}
            required
          />
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Description (200 words)"
            multiline
            rows={4}
            name="description"
            value={taskDetails?.description || ""}
            onChange={handleChange}
            required
          />
          <Typography
            sx={{
              textAlign: "left",
              fontWeight: 300,
              fontSize: "12px",
              mb: "2px",
            }}
          >
            Start Date
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            name="startDate"
            value={taskDetails?.startDate || ""}
            type="date"
            onChange={handleChange}
            required
          />
          <Typography
            sx={{
              textAlign: "left",
              fontWeight: 300,
              fontSize: "12px",
              mb: "2px",
            }}
          >
            End Date
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            name="endDate"
            value={taskDetails?.endDate || ""}
            type="date"
            onChange={handleChange}
            required
          />
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Unit of Work"
            name="unitOfWork"
            value={taskDetails?.unitOfWork || ""}
            onChange={handleChange}
            required
          />
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Total Work Assigned"
            name="totalWorkAssigned"
            value={taskDetails?.totalWorkAssigned || ""}
            type="number"
            onChange={handleChange}
            required
          />
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Total Work Executed"
            value={taskDetails?.totalWorkExecuted || ""}
            name="totalWorkExecuted"
            type="number"
            onChange={handleChange}
            required
          />
          <FormControl sx={{ width: "100%", marginBottom: 2 }} size="small">
            <InputLabel>Associated Projects</InputLabel>
            <Select
              name="associatedProjects"
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={taskDetails?.associatedProjects || []}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              required
            >
              {projectNames?.map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.projectName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: "100%", marginBottom: 2 }} size="small">
            <InputLabel>Task Assigned To</InputLabel>
            <Select
              name="taskAssignedTo"
              value={taskDetails?.taskAssignedTo || ""}
              onChange={handleChange}
              required
            >
              {userNames?.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  {employee.fullname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "100%" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress
                size={25}
                sx={{ margin: "0 auto", display: "block" }}
              />
            ) : (
              "Create Task"
            )}
          </Button>
        </form>
        <ToastContainer />
      </Box>
    )
  );
};

export default TaskForm;
