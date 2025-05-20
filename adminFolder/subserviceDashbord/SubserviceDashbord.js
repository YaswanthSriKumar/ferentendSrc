import React, { useState, useEffect } from "react";
import { Table,AppBar,Toolbar, TableHead, TableRow, Box, TableCell, TableBody, Checkbox, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Add icon
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon
import API_URLS from "../../services/ApiUrl";
import ApiService from "../../services/ApiService";

const SubServiceDashboard = () => {
  const [subservices, setSubservices] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true); // Track API loading state
  const [updateed, setUpdated]=useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


  // Fetch data from API
  useEffect(() => {
    const fetchSubservices = async () => {
      try {
        const response = await ApiService.get(API_URLS.GET_SUBSERVICES);
        setSubservices(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Unable to fetch:", error);
        setSubservices([]); // Ensures empty array on failure
      } finally {
        setLoading(false);
      }

      try {
        const response = await ApiService.get(API_URLS.GET_SERVICE_NAME_ID);
        setSectors(response);
      } catch (error) {
        console.error("Unable to fetch:", error);
      } 
    };

    fetchSubservices();
  }, [updateed]);

  // Handle checkbox selection
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = (event) => {
    setSelectedRows(
      event.target.checked ? subservices.map((s) => s.subserviceId) : []
    );
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const handleDelete =async () => {
    console.log(selectedRows);
    try {
      const response = await ApiService.delete(API_URLS.DELETE_SUBSERVICE+selectedRows);
      console.log(response);
    } catch (error) {
      console.error("Unable to fetch:", error);
    }     handleCloseDeleteDialog();
    setUpdated(prev => !prev);

  };
  // ---------- Dialog-related state & handlers ----------
  const [openDialog, setOpenDialog] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData1, setFormData1] = useState({
    subserviceId: 0,
    subserviceName: "",
    subserviceDescription: "",
    subserviceCost: "",
    serviceId: "",
    subserviceImage: null,
  });

  // Dummy sector options (Replace with API call)
  const [sector,setSectors] = useState([]);


  // Handle form input change
  const handleChange = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData1({ ...formData1, subserviceImage: file });
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle submit button click in dialog
  const handleSubmit = async() => {
    console.log("Submitted Data:", formData1);
    const formData = new FormData();
    formData.append("subserviceId", formData1.subserviceId);
    formData.append("subserviceName", formData1.subserviceName);
    formData.append("subserviceDescription",formData1.subserviceDescription);
    formData.append("subserviceCost", formData1.subserviceCost);
    formData.append("subserviceImage",formData1.subserviceImage); // Ensure it's a File object
    formData.append("serviceId",formData1.serviceId);
    console.log("FormData:", formData);

    try {
        const response = await ApiService.post(API_URLS.UPLOAD_SUBSERVICES,formData, {
            headers: {
              "Content-Type": "multipart/form-data", 
            },
          });
       console.log(response);
       setUpdated(prev => !prev);

      } catch (error) {
        console.error("Unable to fetch:", error);
      } 
      setFormData1({
        subserviceId: 0,
        subserviceName: "",
        subserviceDescription: "",
        subserviceCost: "",
        serviceId: "",
        subserviceImage: null,
      })
      setImagePreview("");
    setOpenDialog(false); // Close dialog after submitting
  };

  // Open Dialog
    const handleOpenAddDialog = async() => {
        
        setOpenDialog(true);}
  const handleCloseAddDialog = () => setOpenDialog(false);

  // ---------- End of Dialog-related section ----------

  async function urlToFile(imageUrl, fileName) {
    const response = await fetch(imageUrl);
    const blob = await response.blob(); // Convert response to Blob

    // Create File object
    const file = new File([blob], fileName, { type: blob.type });
    return file;
}
// -------------------------method to update--------------------
  const handleUpdateClick=(subservice)=>{
      const match = sector.find(service => service[0] === subservice.serviceName);
      setImagePreview(subservice.subserviceImage)
      setFormData1({
        subserviceName: subservice.subserviceName,       // Assuming item[0] holds the name
        subserviceDescription: subservice.subserviceDescription, // Assuming item[1] holds the description
        subserviceCost: subservice.subserviceCost,  // Assuming item[2] holds the cost
        serviceId:match[1],        // Assuming item[3] holds the serviceId
        subserviceImage: null ,          // Image will be updated separately
        subserviceId:subservice.subserviceId
      });
      urlToFile(subservice.subserviceImage, "subserviceImage.jpg").then(file => {
        setFormData1(prevState => ({
            ...prevState,
            subserviceImage: file
        }));
    });
    console.log(formData1)
      setOpenDialog(true); // Open Dialog
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFFFFF", padding: "10px" }}>
    {/* Dashboard Heading */}
    <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="h6" sx={{ color: "#6A45F4", fontWeight: "bold" }}>
            SubService Dashboard
          </Typography>

          

          <Box sx={{ display: "flex", gap: "10px" }}>
          <IconButton sx={{ color: "#6A45F4" }} onClick={handleOpenAddDialog}>
          <AddIcon />
        </IconButton>
        <IconButton
          sx={{ color: "#6A45F4" }}
          onClick={handleOpenDeleteDialog}
          disabled={selectedRows.length === 0}
        >
          <DeleteIcon />
        </IconButton>
          </Box>
        </Toolbar>
      

      {/* Handling API loading & empty data cases */}
      {loading ? (
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          Loading services...
        </Typography>
      ) : subservices.length === 0 ? (
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{ textAlign: "center", marginTop: "20px" }}
        >
          No Service Data Available
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  onChange={handleSelectAll}
                  checked={
                    selectedRows.length === subservices.length &&
                    subservices.length > 0
                  }
                />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Cost</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Service Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {subservices.map((subservice) => (
              <TableRow key={subservice.subserviceId}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(subservice.subserviceId)}
                    onChange={() => handleSelectRow(subservice.subserviceId)}
                  />
                </TableCell>
                <TableCell>{subservice.subserviceId}</TableCell>
                <TableCell>{subservice.subserviceName}</TableCell>
                <TableCell>{subservice.subserviceDescription}</TableCell>
                <TableCell>{subservice.subserviceCost}</TableCell>
                <TableCell>
                  {subservice.serviceName}
                </TableCell>
                <TableCell>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#6A45F4",
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "#5636c7" },
        }}
        onClick={() => handleUpdateClick(subservice)} // Pass row data
      >
        Update
      </Button>
    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Dialog Box */}
      <Dialog
        open={openDialog}
        onClose={handleCloseAddDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: "bold", color: "#6A45F4" }}
        >
          Add New Service
        </DialogTitle>
        <DialogContent sx={{ display: "flex", gap: "20px" }}>
          <Box
            sx={{
              flex: 1,
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              backgroundColor: "#f7f7f7",
              mt: 2,
            }}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              <Typography color="textSecondary">No Image Selected</Typography>
            )}
          </Box>

          <Box
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              mt: 2,
            }}
          >
            {/* Service Name Input */}
            <TextField
              label="Service Name"
              variant="outlined"
              fullWidth
              name="subserviceName"
              value={formData1.subserviceName}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" },
              }}
            />

            {/* Service Cost Input */}
            <TextField
              label="Service Cost"
              variant="outlined"
              fullWidth
              name="subserviceCost"
              value={formData1.subserviceCost}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" },
              }}
            />

            {/* Service Description Input */}
            <TextField
              label="Service Description"
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              name="subserviceDescription"
              value={formData1.subserviceDescription}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" },
              }}
            />

            {/* Sector Dropdown */}
            <Select
              name="serviceId"
              value={formData1.serviceId}
              onChange={handleChange}
              displayEmpty
              fullWidth
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6A45F4",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6A45F4",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6A45F4",
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Sector
              </MenuItem>
              {sector.map(item=>(<MenuItem key={item[1]} value={item[1]}>
                {item[0]}
              </MenuItem>))}
              
            </Select>

            {/* Upload Image Button */}
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: "#6A45F4",
                color: "#FFFFFF",
                "&:hover": { backgroundColor: "#5636c7" },
              }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#6A45F4",
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#5636c7" },
              margin: "0 auto",
              display: "block",
              width: "100%",
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#6A45F4" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography textAlign="center">Would you like to delete?</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleDelete}
            variant="outlined"
            sx={{
              color: "#6A45F4",
              borderColor: "#6A45F4",
              "&:hover": { backgroundColor: "#f4f1ff" }
            }}
          >
            Yes
          </Button>
          <Button
            onClick={handleCloseDeleteDialog}
            variant="outlined"
            sx={{
              color: "#6A45F4",
              borderColor: "#6A45F4",
              "&:hover": { backgroundColor: "#f4f1ff" }
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default SubServiceDashboard;
