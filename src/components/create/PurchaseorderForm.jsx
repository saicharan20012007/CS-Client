import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPurchase } from "../../redux/purchase/action";
import { fetchvendorsDataGet } from "../../redux/vendor/action";
import { fetchindentsData } from "../../redux/indent/action";
const PurchaseorderForm = ({ title }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store.AuthReducer);
  const { indentsData } = useSelector((store) => store.IndentReducer);
  const { vendorsData } = useSelector((store) => store.VendorReducer);
  // const [purchaseOrderNo, setPurchaseOrderNo] = useState("");
  // const [vendorName, setVendorName] = useState("");
  // const [materialName, setMaterialName] = useState("");
  // const [materialUnit, setMaterialUnit] = useState("");
  // const [siteName, setSiteName] = useState("");
  // const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  // const [deliveryAddress, setDeliveryAddress] = useState("");
  // const [billingDescription, setBillingDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState();
  // You might want to fetch vendor names and material details from the server.
  // For simplicity, let's assume you already have this data.
  useEffect(() => {
    dispatch(fetchvendorsDataGet(accessToken));
    dispatch(fetchindentsData(accessToken));
  }, [accessToken]);

  const handleChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;
    if (name === "unitOfMaterial") {
      value = Math.max(value.replace(/\D/g, ""), 0);
    }
    // console.log(name, value);
    setPurchaseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(createPurchase(purchaseDetails, accessToken)).then((res) => {
      if (res.type === "CREATE_PURCHASE_SUCCESS") {
        toast.success("Purchase Order Created Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setPurchaseDetails({});
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
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     setIsLoading(true);
  //     await axios.post("/create/purchase-order/", {
  //       purchaseOrderNo,
  //       vendorName,
  //       materialName,
  //       materialUnit,
  //       siteName,
  //       expectedDeliveryDate,
  //       deliveryAddress,
  //       billingDescription,
  //     });
  //     alert("Purchase Order created successfully!");
  //     setPurchaseOrderNo("");
  //     setVendorName("");
  //     setMaterialName("");
  //     setMaterialUnit("");
  //     setSiteName("");
  //     setExpectedDeliveryDate("");
  //     setDeliveryAddress("");
  //     setBillingDescription("");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error creating Purchase Order!");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
          label="Purchase Order No."
          value={purchaseDetails?.purchaseOrderNo || ""}
          onChange={handleChange}
          name="purchaseOrderNo"
          required={true}
        />
        <FormControl sx={{ width: "100%", marginBottom: 2 }} size="small">
          <InputLabel>Vendor Name*</InputLabel>
          <Select
            value={purchaseDetails?.vendorName || ""}
            name="vendorName"
            onChange={handleChange}
            required
          >
            {(vendorsData || []).map((vendor) => (
              <MenuItem key={vendor._id} value={vendor._id}>
                {vendor.vendorName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "100%", marginBottom: 2 }} size="small">
          <InputLabel>Material Name*</InputLabel>
          <Select
            value={purchaseDetails?.materialName || ""}
            name="materialName"
            onChange={handleChange}
            required
          >
            {(indentsData || []).map((indent) => (
              <MenuItem key={indent._id} value={indent._id}>
                {indent.materialName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Unit of Material"
          value={purchaseDetails?.unitOfMaterial || ""}
          onChange={handleChange}
          name="unitOfMaterial"
          required={true}
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Site Name"
          value={purchaseDetails?.siteName || ""}
          onChange={handleChange}
          name="siteName"
          required={true}
        />
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
          type="date"
          value={purchaseDetails?.date || ""}
          onChange={handleChange}
          name="date"
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Delivery Address"
          value={purchaseDetails?.deliveryAddress || ""}
          onChange={handleChange}
          name="deliveryAddress"
          required={true}
        />
        <TextField
          size="small"
          sx={{ width: "100%", marginBottom: 2 }}
          label="Billing Description"
          multiline
          rows={4}
          value={purchaseDetails?.billingDescription || ""}
          onChange={handleChange}
          name="billingDescription"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "100%" }}
          disabled={isLoading}
        >
          Create Purchase Order
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default PurchaseorderForm;
