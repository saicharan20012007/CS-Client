import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  CircularProgress,
  Typography,
  OutlinedInput,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { fetchuserNames } from "../../redux/user/action";
import { useNavigate, useParams } from "react-router-dom";
import { editTask, fetchTaskData } from "../../redux/task/action";

const EditTask = ({ title }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [taskDetails, setTaskDetails] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { userNames } = useSelector((store) => store.UserReducer);
  const { isLoading } = useSelector((store) => store.TaskReducer);
  // console.log("task data recieved : ", taskData);
  const { accessToken } = useSelector((store) => store.AuthReducer);
  const navigate = useNavigate();
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() < 9 ? 0 : ""}${
      d.getMonth() + 1
    }-${d.getDate() < 10 ? 0 : ""}${d.getDate()}`;
  };
  useEffect(() => {
    dispatch(fetchTaskData(accessToken, id)).then((res) => {
      if (res.type === "FETCH_PROJECT_TASK_DATA_SUCCESS") {
        setStartDate(res.payload?.startDate);
        setEndDate(res.payload?.endDate);
        if (startDate) {
          const d = new Date(startDate);
          setStartDate(formatDate(startDate));
        }
        if (endDate) {
          const d = new Date(endDate);
          setEndDate(formatDate(endDate));
        }
        setTaskDetails(res.payload);
      }
    });
    dispatch(fetchuserNames(accessToken));
  }, [accessToken, id]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "startDate") {
      setStartDate(formatDate(value));
    } else if (name == "endDate") {
      setEndDate(formatDate(value));
    }
    setTaskDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(editTask(id, taskDetails, accessToken)).then((res) => {
      if (res.type === "EDIT_PROJECT_TASK_DATA_SUCCESS") {
        toast.success("Task edited successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setStartDate("");
        setEndDate("");
        setTaskDetails({});
        setTimeout(() => navigate("/projects/management"), 1000);
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
    taskDetails &&
    userNames && (
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
              "Update Task"
            )}
          </Button>
        </form>
        <ToastContainer />
      </Box>
    )
  );
};

export default EditTask;
