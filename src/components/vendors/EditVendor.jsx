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
import { useNavigate, useParams } from "react-router-dom";
import { editVendor, fetchVendorData } from "../../redux/vendor/action";

function EditVendor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [vendorDetails, setVendorDetails] = useState();
  const { vendorData, isLoading } = useSelector((store) => store.VendorReducer);
  console.log("task data recieved : ", vendorData);
  const { accessToken } = useSelector((store) => store.AuthReducer);
  const vendorTypes = [
    "Trader",
    "Dealer",
    "Distributor",
    "Brand Manufacturer",
    "Manpower Supplier",
    "Contractor",
  ];
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editVendor(id, vendorDetails, accessToken)).then((res) => {
      if (res.type === "EDIT_VENDOR_DATA_SUCCESS") {
        toast.success("Vendor edited successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setVendorDetails({});
        setTimeout(() => navigate("/vendor-management"), 1000);
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
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setVendorDetails((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    dispatch(fetchVendorData(accessToken, id)).then((res) => {
      if (res.type === "FETCH_VENDOR_DATA_SUCCESS") {
        setVendorDetails(res.payload);
      }
    });
  }, [accessToken, id]);
  return (
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
          label="Vendor Name"
          value={vendorDetails?.vendorName || ""}
          onChange={handleChange}
          name="vendorName"
          required
        />
        <FormControl sx={{ width: "100%", marginBottom: 2 }} size="small">
          <InputLabel>Vendor Type</InputLabel>
          <Select
            value={vendorDetails?.vendorType || ""}
            onChange={handleChange}
            name="vendorType"
            required
          >
            {vendorTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Business Address"
          multiline
          rows={4}
          value={vendorDetails?.businessAddress || ""}
          onChange={handleChange}
          name="businessAddress"
          required
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Contact Person"
          value={vendorDetails?.contactPerson || ""}
          onChange={handleChange}
          name="contactPerson"
          required
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Mobile No."
          value={vendorDetails?.mobileNumber || ""}
          onChange={handleChange}
          name="mobileNumber"
          required
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Designation"
          value={vendorDetails?.designation || ""}
          onChange={handleChange}
          name="designation"
          required
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Email Id"
          type="email"
          value={vendorDetails?.emailId || ""}
          onChange={handleChange}
          name="emailId"
          required
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="GSTIN"
          value={vendorDetails?.GSTIN || ""}
          onChange={handleChange}
          name="GSTIN"
          required
          inputProps={{
            minLength: 15,
            maxLength: 15,
          }}
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="PAN No."
          value={vendorDetails?.panNumber || ""}
          onChange={handleChange}
          name="panNumber"
          required
          inputProps={{
            minLength: 10,
            maxLength: 10,
          }}
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Bank Name"
          value={vendorDetails?.bankName || ""}
          onChange={handleChange}
          name="bankName"
          required
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Account Holder Name"
          value={vendorDetails?.accountHolderName || ""}
          onChange={handleChange}
          name="accountHolderName"
          required
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Account Number"
          value={vendorDetails?.accountNumber || ""}
          onChange={handleChange}
          name="accountNumber"
          required
          inputProps={{
            minLength: 11,
            maxLength: 14,
          }}
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="IFSC Code"
          value={vendorDetails?.IFSCCode || ""}
          onChange={handleChange}
          name="IFSCCode"
          required
          inputProps={{
            minLength: 11,
            maxLength: 11,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "100%" }}
          disabled={isLoading}
        >
          Update Vendor
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
}

export default EditVendor;
