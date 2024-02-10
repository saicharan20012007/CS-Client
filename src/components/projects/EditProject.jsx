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

import { editProject, fetchprojectData } from "../../redux/project/action";
import { fetchuserNames } from "../../redux/user/action";
import { useParams } from "react-router-dom";

const EditProject = ({ title }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [projectDetails, setProjectDetails] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { userNames } = useSelector((store) => store.UserReducer);
  const { isLoading } = useSelector((store) => store.ProjectReducer);
  const { accessToken } = useSelector((store) => store.AuthReducer);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() < 9 ? 0 : ""}${
      d.getMonth() + 1
    }-${d.getDate() < 10 ? 0 : ""}${d.getDate()}`;
  };
  useEffect(() => {
    dispatch(fetchprojectData(accessToken, id)).then((res) => {
      if (res.type === "FETCH_PROJECT_DATA_SUCCESS") {
        setStartDate(res.payload.startDate);
        setEndDate(res.payload.endDate);
        if (startDate) {
          setStartDate(formatDate(startDate));
        }
        if (endDate) {
          setEndDate(formatDate(endDate));
        }

        setProjectDetails(res.payload);
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
    setProjectDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(editProject(id, projectDetails, accessToken)).then((res) => {
      if (res.type === "EDIT_PROJECT_SUCCESS") {
        toast.success("Project edited successfully!", {
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
  // console.log(projectDetails);
  return (
    projectDetails &&
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
            }}
          >
            Start Date
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            value={startDate}
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
            }}
          >
            End Date
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            value={endDate}
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
              "Update Project"
            )}
          </Button>
        </form>
        <ToastContainer />
      </Box>
    )
  );
};

export default EditProject;
