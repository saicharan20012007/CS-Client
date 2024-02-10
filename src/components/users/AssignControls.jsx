import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import Checkbox from "@mui/material/Checkbox";
import {
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { edituserData, fetchuserData } from "../../redux/user/action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignControls = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useSelector((store) => store.UserReducer);
  const { accessToken } = useSelector((store) => store.AuthReducer);
  const { isLoading } = useSelector((store) => store.UserReducer);
  const { id } = useParams();
  const tasks = [
    "All Task",
    "Assigned Task",
    "Project Profile",
    "Vendor",
    "Material Management",
    "Stock Updates",
    "Material Issue",
    "Site Transfer",
    "Purchase Order",
    "Indent",
    "GRN Billing",
    "Attendance",
    "Issues",
    "User Role and Permission",
    "Expenses",
  ];
  const [controls, setControls] = useState(
    Array.from({ length: tasks.length }, () =>
      Array.from({ length: 4 }, () => false)
    )
  );
  const handleChange = (e, idx1, idx2) => {
    let newControls = [...controls];
    if (idx1 == -1) {
      for (let i = 0; i < tasks.length; i++) {
        newControls[i][idx2] = e.target.checked;
      }
    } else {
      newControls[idx1][idx2] = e.target.checked;
    }
    setControls(newControls);
    // console.log(controls);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let controlsObj = {};
    for (let i = 0; i < tasks.length; i++) {
      controlsObj[tasks[i]] = controls[i];
    }
    // console.log(controlsObj);
    dispatch(edituserData(id, { controls: [controlsObj] }, accessToken)).then(
      (res) => {
        if (res.type === "EDIT_USER_DATA_SUCCESS") {
          toast.success(
            `Controls assigned successfully to ${
              userData ? userData.fullname : "user"
            }!`,
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
      }
    );
  };
  useEffect(() => {
    dispatch(fetchuserData(id, accessToken));
    if (userData && userData.hasOwnProperty("controls")) {
      let pastControls = Array.from({ length: tasks.length }, () =>
        Array.from({ length: 4 }, () => false)
      );
      for (const task in userData.controls[0]) {
        pastControls[tasks.indexOf(task)] = userData.controls[0][task];
      }
      setControls(pastControls);
    }
  }, [id, accessToken]);
  useEffect(() => {}, [controls]);
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <form onSubmit={handleSubmit}>
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
                <TableCell>TASK</TableCell>
                <TableCell>
                  View
                  <Checkbox
                    onChange={(e) => handleChange(e, -1, 0)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
                <TableCell>
                  Create
                  <Checkbox
                    onChange={(e) => handleChange(e, -1, 1)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
                <TableCell>
                  Edit
                  <Checkbox
                    onChange={(e) => handleChange(e, -1, 2)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
                <TableCell>
                  Delete
                  <Checkbox
                    onChange={(e) => handleChange(e, -1, 3)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks?.map((task, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{task}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={controls[index][0]}
                        onChange={(e) => handleChange(e, index, 0)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={controls[index][1]}
                        onChange={(e) => handleChange(e, index, 1)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={controls[index][2]}
                        onChange={(e) => handleChange(e, index, 2)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={controls[index][3]}
                        onChange={(e) => handleChange(e, index, 3)}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
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
    </div>
  );
};
export default AssignControls;
