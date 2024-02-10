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
  OutlinedInput,
  Typography,
} from "@mui/material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import axios from "axios";
import { createIssue,} from "../../redux/issue/action";
import { fetchtaskNames } from "../../redux/task/action";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
const IssueForm = ({ title }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store.AuthReducer);
  const { tasksData, isLoading } = useSelector((store) => store.TaskReducer);
  console.log(useSelector(store => store.TaskReducer))
  const [issueDetails,setIssueDetails] = useState();
  const [taskIds,setTaskIds] = useState([]);
  const fetchtaskNameshandler = () => {
    dispatch(fetchtaskNames(accessToken)).then(res => console.log("disp",res.payload));
  };
  useEffect(() => {
      fetchtaskNameshandler();
  },[]);

  const handleSelectTasks = (e) => {
    const {
      target: { value },
    } = e;
    setTaskIds(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    // console.log(name,value)
    setIssueDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    issueDetails.taskIds = taskIds;
    dispatch(createIssue(issueDetails, accessToken)).then((res) => {
      if (res.type === "CREATE_ISSUE_SUCCESS") {
        toast.success("Issue created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIssueDetails({});
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
    <Box
      sx={{
        width: "auto",
        margin: "0 auto",
        boxShadow:
          "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
        padding: "15px",
      }}>
      <form onSubmit={handleSubmit}>
          <FormControl sx={{ width: "100%", marginBottom: 2 }} size="small" required>
            <InputLabel>Choose Tasks</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={taskIds}
              onChange={handleSelectTasks}
              input={<OutlinedInput label="Name" />}>
              {tasksData?.map((task) => (
                <MenuItem
                  key={task._id}
                  value={task._id}
                  sx={{
                    borderBottom: "1px solid grey",
                  }}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <Typography>{task.taskName}</Typography>
                    <CheckBoxOutlinedIcon
                      sx={{
                        color: taskIds?.includes(task._id)
                          ? "green"
                          : "black",
                      }}
                    />
                  </Box>
                </MenuItem>
              )) || <div>You don't have task already created please create them</div>}
            </Select>
          </FormControl>
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Issue Description (In 200 words)"
          multiline
          rows={6}
          value={issueDetails?.description || ""}
          onChange={handleChange}
          name = "description"
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "100%" }}
          disabled={isLoading}>
          Create Issue
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default IssueForm;
