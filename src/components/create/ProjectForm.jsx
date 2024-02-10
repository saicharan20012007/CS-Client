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
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../redux/project/action";
import { fetchuserNames } from "../../redux/user/action"
const ProjectForm = ({ title }) => {
  const dispatch = useDispatch();
  const [projectDetails, setProjectDetails] = useState();
  const { userNames, isLoading } = useSelector((store) => store.UserReducer);
  const { accessToken } = useSelector((store) => store.AuthReducer);

  useEffect(() => {
    dispatch(fetchuserNames(accessToken));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(name,value)
    setProjectDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(createProject(projectDetails, accessToken)).then((res) => {
      if (res.type === "CREATE_PROJECT_SUCCESS") {
        toast.success("Project created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setProjectDetails({});
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
    userNames !== null && (
      <Box
        sx={{
          width: "auto",
          margin: "0 auto",
          boxShadow:
            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
          padding: "15px",
        }}>
        <form onSubmit={handleSubmit}>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Project Name"
            value={projectDetails?.projectName || ""}
            onChange={handleChange}
            required
            name="projectName"
          />
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Description (200 words)"
            multiline
            rows={4}
            value={projectDetails?.description || ""}
            onChange={handleChange}
            required
            name="description"
          />
          <Typography
            sx={{
              textAlign: "left",
              fontWeight: 300,
              fontSize: "12px",
              mb: "2px",
            }}>
            Start Date
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            value={projectDetails?.startDate || ""}
            type="date"
            onChange={handleChange}
            required
            name="startDate"
          />
          <Typography
            sx={{
              textAlign: "left",
              fontWeight: 300,
              fontSize: "12px",
              mb: "2px",
            }}>
            End Date
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            value={projectDetails?.endDate || ""}
            type="date"
            onChange={handleChange}
            required
            name="endDate"
          />
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Project Address"
            value={projectDetails?.projectAddress || ""}
            onChange={handleChange}
            required
            name="projectAddress"
          />

          <FormControl sx={{ width: "100%", marginBottom: 2 }} size="small">
            <InputLabel>Project Supervisor</InputLabel>
            <Select
              value={projectDetails?.projectSupervisor || ""}
              name="projectSupervisor"
              onChange={handleChange}
              required>
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
            disabled={isLoading}>
            {isLoading ? (
              <CircularProgress
                size={25}
                sx={{ margin: "0 auto", display: "block" }}
              />
            ) : (
              "Create Project"
            )}
          </Button>
        </form>
        <ToastContainer />
      </Box>
    )
  );
};

export default ProjectForm;
