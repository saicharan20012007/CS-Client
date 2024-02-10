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
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import { useDispatch, useSelector } from "react-redux";
import { createMember, } from "../../redux/user/action";
import { fetchprojectNames } from "../../redux/project/action";
import Loader from "../../constant/Loader";
const MemberForm = ({ title }) => {
  const dispatch = useDispatch();
  const { projectNames, isLoading } = useSelector((store) => store.ProjectReducer);
  const { accessToken } = useSelector((store) => store.AuthReducer);
  console.log(projectNames,isLoading)
  const [projectIds, setProjectIds] = useState([]);
  const [memberDetails, setMemberDetails] = useState({});
  const [loader,setLoader] = useState(true);
  const fetchprojectNameshandler = () => {
    dispatch(fetchprojectNames(accessToken));
  };

  useEffect(() => {
    fetchprojectNameshandler();

  }, []);

  const handleSelectProjects = (e) => {
    const {
      target: { value },
    } = e;
    setProjectIds(value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "contactNumber") {
      const numericValue = value.replace(/\D/g, "");

      const truncatedValue = numericValue.slice(0, 10);

      setMemberDetails((prev) => ({ ...prev, [name]: truncatedValue }));
    } else {
      setMemberDetails((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    memberDetails.projectIds = projectIds;

    dispatch(createMember(memberDetails, accessToken)).then((res) => {
      if (res.type === "CREATE_MEMBER_SUCCESS") {
        setMemberDetails({});
        setProjectIds([]);
        toast.success("Member added successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error(
          "Email or mobile number already in use. Please use different credentials !",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      }
    });
  };

  return (
    <Box
        sx={{
          width: "100%",
          boxShadow:
            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
          padding: "15px",
        }}>
        <form onSubmit={handleSubmit}>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Full Name"
            name="fullname"
            value={memberDetails?.fullname || ""}
            onChange={handleChange}
            required={true}
          />

          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Mobile Number"
            value={memberDetails?.contactNumber || ""}
            name="contactNumber"
            onChange={handleChange}
            required={true}
          />

          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Email"
            type="email"
            name="email"
            value={memberDetails?.email || ""}
            onChange={handleChange}
            required={true}
          />
          <Typography
            sx={{
              textAlign: "left",
              fontWeight: 300,
              fontSize: "12px",
              mb: "2px",
            }}>
            Date Of Birth
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            value={memberDetails?.dob || ""}
            type="date"
            onChange={handleChange}
            required
            name="dob"
          />

          <Typography
            sx={{
              textAlign: "left",
              fontWeight: 300,
              fontSize: "12px",
              mb: "2px",
            }}>
            Date Of Join
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            value={memberDetails?.dateOfJoin || ""}
            type="date"
            onChange={handleChange}
            required
            name="dateOfJoin"
          />

          <FormControl
            sx={{ width: "100%", marginBottom: 2 }}
            required={true}
            size="small">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              required={true}
              value={memberDetails?.role || ""}
              onChange={handleChange}>
              <MenuItem value="SuperAdmin">Super Admin</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="ProjectManager">Project Manager</MenuItem>
              <MenuItem value="SiteSupervisor">Site supervisor</MenuItem>
              <MenuItem value="SiteStaff">SiteStaff</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "100%", marginBottom: 2 }} size="small">
            <InputLabel>Choose Project (optional)</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={projectIds}
              onChange={handleSelectProjects}
              input={<OutlinedInput label="Name" />}>
              {projectNames?.map((project) => (
                <MenuItem
                  key={project._id}
                  value={project._id}
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
              "Create Member"
            )}
          </Button>
        </form>
        <ToastContainer />
      </Box>
  );
};

export default MemberForm;
