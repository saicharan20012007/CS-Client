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
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { editIndent, fetchIndentData } from "../../redux/indent/action";
import { fetchprojectNames } from "../../redux/project/action";
import { fetchuserNames } from "../../redux/user/action";
import { fetchtasksData } from "../../redux/task/action";
import { useParams } from "react-router-dom";

const EditMaterial = ({ title }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [indentDetails, setIndentDetails] = useState();
  const [date, setDate] = useState("");
  const [projectIds, setProjectIds] = useState([]);
  const [taskIds, setTaskIds] = useState([]);
  const [taskNames, setTaskNames] = useState([]);
  const { userNames } = useSelector((store) => store.UserReducer);
  const { indentData, isLoading } = useSelector((store) => store.IndentReducer);
  const { projectNames } = useSelector((store) => store.ProjectReducer);
  const { accessToken } = useSelector((store) => store.AuthReducer);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() < 9 ? 0 : ""}${
      d.getMonth() + 1
    }-${d.getDate() < 10 ? 0 : ""}${d.getDate()}`;
  };

  useEffect(() => {
    dispatch(fetchprojectNames(accessToken));
    dispatch(fetchuserNames(accessToken));
    dispatch(fetchIndentData(accessToken, id)).then((res) => {
      if (res.type === "FETCH_INDENT_DATA_SUCCESS") {
        if (res.payload.hasOwnProperty("date") && res.payload.date) {
          setDate(formatDate(res.payload.date));
        }
        res.payload?.associatedTasks?.forEach((project) => {
          project.tasks.forEach((task) => {
            setTaskIds((arr) => [...arr, `${project.project}:${task}`]);
          });
        });
        setProjectIds(res.payload?.projects || []);
        setIndentDetails(res.payload);
      }
    });
  }, [accessToken, id]);

  useEffect(() => {
    setTaskNames([]);
    projectIds.forEach((projectId) => {
      dispatch(fetchtasksData(accessToken, projectId)).then((res) => {
        if (res.type === "FETCH_PROJECT_TASKS_DATA_SUCCESS") {
          res.payload.forEach((task) => {
            setTaskNames((prevObj) => [
              ...prevObj,
              {
                taskId: task._id,
                taskName: task.taskName,
                projectId: projectId,
                projectName: projectNames
                  ?.filter((project) => project._id == projectId)
                  ?.map((project) => project.projectName)[0],
              },
            ]);
          });
        }
      });
    });
  }, [projectIds]);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name == "date") {
      setDate(formatDate(value));
    }
    setIndentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectProjects = (e) => {
    setProjectIds(e.target.value);
  };

  const handleSelectTasks = (e) => {
    setTaskIds(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    indentDetails.projects = projectIds;
    let taskDetails = {};
    taskIds.forEach((taskId) => {
      let taskIdArr = taskId.split(":");
      if (!taskDetails.hasOwnProperty(taskIdArr[0])) {
        taskDetails[taskIdArr[0]] = [taskIdArr[1]];
      } else {
        taskDetails[taskIdArr[0]].push(taskIdArr[1]);
      }
    });
    indentDetails.associatedTasks = [];
    Object.keys(taskDetails).forEach((key) => {
      indentDetails.associatedTasks.push({
        project: key,
        tasks: taskDetails[key],
      });
    });
    dispatch(editIndent(id, indentDetails, accessToken)).then((res) => {
      if (res.type === "EDIT_INDENT_SUCCESS") {
        toast.success("Material edited successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setDate("");
        setIndentDetails({});
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
  // console.log(projectDetails);
  return (
    indentDetails &&
    userNames &&
    indentData && (
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
            label="Material Name"
            onChange={handleChange}
            value={indentDetails?.materialName || ""}
            name="materialName"
            required={true}
          />
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Unit of Material"
            onChange={handleChange}
            value={indentDetails?.unitOfMaterial || ""}
            name="unitOfMaterial"
            required={true}
          />
          <FormControl sx={{ width: "100%", marginBottom: 2 }} size="small">
            <InputLabel>Projects*</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={projectIds}
              onChange={handleSelectProjects}
              input={<OutlinedInput label="Name" />}
              required={true}
            >
              {projectNames?.map((project) => (
                <MenuItem
                  key={project._id}
                  value={project._id}
                  sx={{
                    borderBottom: "1px solid grey",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{project.projectName}</Typography>
                    <CheckBoxOutlinedIcon
                      sx={{
                        color: projectIds?.includes(project._id)
                          ? "green"
                          : "black",
                      }}
                    />
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {projectIds.length ? (
            <FormControl sx={{ width: "100%", marginBottom: 2 }} size="small">
              <InputLabel>Task Names*</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={taskIds}
                onChange={handleSelectTasks}
                input={<OutlinedInput label="Name" />}
                required={true}
              >
                {taskNames?.map((task, index) => (
                  <MenuItem
                    key={index}
                    value={`${task.projectId}:${task.taskId}`}
                    sx={{
                      borderBottom: "1px solid grey",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography>{`${task.projectName}:${task.taskName}`}</Typography>
                      <CheckBoxOutlinedIcon
                        sx={{
                          color: taskIds?.includes(
                            `${task.projectId}:${task.taskId}`
                          )
                            ? "green"
                            : "black",
                        }}
                      />
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            ""
          )}
          <FormControl sx={{ width: "100%", marginBottom: 2 }} size="small">
            <InputLabel>Supervisor Name*</InputLabel>
            <Select
              value={indentDetails?.supervisorName || ""}
              name="supervisorName"
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
          <Typography
            sx={{
              textAlign: "left",
              fontWeight: 300,
              fontSize: "12px",
              mb: "2px",
            }}
          >
            Expected Date of Delivery
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            // label="Expected Date of Delivery"
            type="date"
            onChange={handleChange}
            value={date || ""}
            name="date"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "100%" }}
            disabled={isLoading}
          >
            Save
          </Button>
          {isLoading && (
            <CircularProgress sx={{ margin: "0 auto", display: "block" }} />
          )}
        </form>
        <ToastContainer />
      </Box>
    )
  );
};

export default EditMaterial;
