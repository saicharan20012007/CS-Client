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
  Switch,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { edituserData, fetchuserData } from "../../redux/user/action";

const EditUser = ({ title }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [memberDetails, setMemberDetails] = useState(null);
  const { isLoading } = useSelector((store) => store.UserReducer);
  const { accessToken } = useSelector((store) => store.AuthReducer);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "isEnable") {
      setMemberDetails((prev) => ({ ...prev, [name]: e.target.checked }));
    } else if (name === "contactNumber") {
      const numericValue = value.replace(/\D/g, "");

      const truncatedValue = numericValue.slice(0, 10);

      setMemberDetails((prev) => ({ ...prev, [name]: truncatedValue }));
    } else if (name === "password") {
      if (value.length <= 8) {
        setMemberDetails((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setMemberDetails((prev) => ({ ...prev, [name]: value }));
    }
    // console.log(memberDetails);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(edituserData(id, memberDetails, accessToken)).then((res) => {
      if (res.type === "EDIT_USER_DATA_SUCCESS") {
        toast.success("Member edited successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate(location?.state?.from?.pathname || "/user/management");
      } else {
        toast.error("Something went wrong !", {
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

  useEffect(() => {
    dispatch(fetchuserData(id, accessToken)).then((res) => {
      if (res.type === "FETCH_USER_DATA_SUCCESS") {
        console.log(res.payload);
        setMemberDetails(res.payload);
      }
    });
  }, [accessToken, id]);

  return (
    memberDetails !== null && (
      <Box
        sx={{
          width: "100%",
          boxShadow:
            "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
          padding: "15px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Full Name"
            name="fullname"
            value={memberDetails?.fullname || ""}
            onChange={handleChange}
          />

          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Mobile Number"
            value={memberDetails?.contactNumber || ""}
            name="contactNumber"
            onChange={handleChange}
          />

          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Email"
            type="email"
            name="email"
            value={memberDetails?.email || ""}
            onChange={handleChange}
          />
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            label="Password"
            value={memberDetails?.password || ""}
            name="password"
            onChange={handleChange}
          />
          <Typography
            sx={{
              textAlign: "left",
              fontWeight: 300,
              fontSize: "12px",
              mb: "2px",
            }}
          >
            Date Of Birth
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            value={memberDetails?.dob || ""}
            type="date"
            onChange={handleChange}
            name="dob"
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Typography
              sx={{
                textAlign: "left",
                fontWeight: 300,
                fontSize: "12px",
                mb: "2px",
              }}
            >
              <span
                style={{
                  textDecoration: memberDetails?.isEnable
                    ? "none"
                    : "line-through",
                }}
              >
                Enable
              </span>
              /
              <span
                style={{
                  textDecoration: memberDetails?.isEnable
                    ? "line-through"
                    : "none",
                }}
              >
                Disable
              </span>
            </Typography>
            <Switch
              checked={memberDetails?.isEnable}
              onChange={handleChange}
              name="isEnable"
            />
          </Box>
          <Typography
            sx={{
              textAlign: "left",
              fontWeight: 300,
              fontSize: "12px",
              mb: "2px",
            }}
          >
            Date Of Join
          </Typography>
          <TextField
            size="small"
            sx={{ width: "100%", marginBottom: 2 }}
            value={memberDetails?.dateOfJoin || ""}
            type="date"
            onChange={handleChange}
            name="dateOfJoin"
          />

          <FormControl sx={{ width: "100%", marginBottom: 2 }} size="small">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={memberDetails?.role || ""}
              onChange={handleChange}
            >
              <MenuItem value="SuperAdmin">Super Admin</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="ProjectManager">Project Manager</MenuItem>
              <MenuItem value="SiteSupervisor">Site supervisor</MenuItem>
              <MenuItem value="SiteStaff">SiteStaff</MenuItem>
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
              "Save"
            )}
          </Button>
        </form>
        <ToastContainer />
      </Box>
    )
  );
};

export default EditUser;
