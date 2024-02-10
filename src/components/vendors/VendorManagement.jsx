import {
  Button,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editVendor, fetchvendorsData } from "../../redux/vendor/action";
import { Link } from "react-router-dom";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewVendorModal from "./ViewVendorModal";
function VendorManagement() {
  const { accessToken } = useSelector((store) => store.AuthReducer);
  const { vendorsData } = useSelector((store) => store.VendorReducer);
  const [searchTerm, setSearchTerm] = useState("");
  const [del, setdel] = useState(false);

  const handleSearch = (e) => {
    console.log("searching...");
    console.log(vendorsData);
    setSearchTerm(e.target.value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchvendorsData(accessToken, searchTerm));
  }, [accessToken, searchTerm]);

  const handleDelete = (id) => {
    dispatch(editVendor(id, { isDeleted: true }, accessToken)).then((res) => {
      if (res.type === "EDIT_VENDOR_DATA_SUCCESS") {
        dispatch(fetchvendorsData(accessToken, searchTerm));
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
    <div
      style={{
        width: "100%",
        padding: "15px",
      }}
    >
      <TextField
        id="standard-basic"
        label="Search"
        variant="outlined"
        size="small"
        sx={{
          width: "100%",
          mb: "10px",
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
              <TableCell> Vendor Name</TableCell>
              <TableCell> Vendor Type</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          {vendorsData?.map((vendor, index) => {
            if (!vendor.isDeleted) {
              // console.log(project);
              return (
                <TableRow key={vendor._id}>
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell component="th" scope="row">
                    {vendor.vendorName}
                  </TableCell>
                  <TableCell>{vendor.vendorType}</TableCell>
                  <TableCell>{vendor.contactPerson}</TableCell>
                  <TableCell>
                    <ViewVendorModal vendor={vendor} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <Link to={`/vendor/edit/${vendor._id}`}>
                        <IconButton>
                          <EditNoteOutlinedIcon />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </TableCell>

                  <TableCell>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(vendor._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </Table>
      </Paper>
    </div>
  );
}

export default VendorManagement;
