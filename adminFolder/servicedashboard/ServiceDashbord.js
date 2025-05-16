import React, { useEffect, useState, useCallback } from "react";
import CustomTable from "../commons/TableComponent";
import ApiService from "../../services/ApiService";
import API_URLS from "../../services/ApiUrl"
import {Select, MenuItem,AppBar,Toolbar,Typography,TextField,Button,IconButton,Box,Dialog,DialogActions,DialogContent,DialogTitle,Switch} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const ServiceDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [updateed, setUpdated]=useState(true);
  // Log to verify parent's selectedRows value
  console.log("Parent selectedRows:", selectedRows);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await ApiService.get(API_URLS.GET_SERVICES,{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        console.log("API Response:", response);
        const transformedData = response.map(itam=>(
          {
            id:itam.serviceId,
            name: itam.serviceName,
            description:itam.serviceDescription,
            image:itam.serviceImage,
            show: itam.serviceShow,
            sector: itam.serviceType
          }
        ));
        console.log(transformedData)
        setData(transformedData);
        console.log(data);
      } catch (error) {
        console.log("Unable to fetch: " + error);
      }
    };
    fetchData();
  }, [updateed]);
  const memoizedSetSelectedRow = useCallback((selected) => {
    setSelectedRows(selected);
  }, []);
  const updateShow = useCallback( async(id, value) => {
    console.log("id is "+id +"vlaue :"+value);
    try {
      const response = await ApiService.put(API_URLS.UPDATEA_SERVICE_SHOW+id,{"serviceShow": value });
      console.log("API Response:", response);
    } catch (error) {
      console.log("Unable to fetch: " + error);
    }
  }, []);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceShow, setServiceShow] = useState(false);
  const [serviceImage, setServiceImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sector, setSector] = useState("");
  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setServiceImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddSubmit = async () => {
    console.log("submit clicked");
    const formData = new FormData();
    formData.append("serviceName", serviceName);
    formData.append("serviceDescription", serviceDescription);
    formData.append("serviceShow", serviceShow);
    formData.append("serviceImage", serviceImage); // Ensure it's a File object
    formData.append("serviceType", sector);
    console.log("FormData:", formData);
    try {
        const response = await ApiService.post(API_URLS.UPLODAD_SERVICES, formData, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        });
        console.log("Response from server:", response);
        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("Failed to submit the form. Please try again.");
      }
    handleCloseAddDialog();
    setUpdated(prev => !prev);
  };
  async function handleUpdate(data){
    console.log("data insde dashbord: "+ data.id);
    console.log("data insde dashbord: "+ data.sector);
    const formData = new FormData();
    formData.append("serviceId", data.id);
    formData.append("serviceName", data.name);
    formData.append("serviceDescription", data.description);
    formData.append("serviceShow", data.show);
    formData.append("serviceImage", data.image); // Ensure this is a `File` object
    formData.append("serviceType", data.sector);
    
    console.log("FormData:", formData);
    
    try {
      const response = await ApiService.put(API_URLS.UPDATE_SERVICES, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      console.log("Response from server:", response);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  setUpdated(prev => !prev);
  }

  const handleDelete = () => {
    console.log(selectedRows);
    alert("Service Deleted Successfully!");
    handleCloseDeleteDialog();
  };

  const headings = ["Serviceid", "Name","sector", "Description", "show"];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#FFFFFF", padding: "10px" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="h6" sx={{ color: "#6A45F4", fontWeight: "bold" }}>
            Service Dashboard
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0" }}>
            <TextField
              placeholder="Search services..."
              variant="outlined"
              size="small"
              sx={{
                width: "200px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "5px 0 0 5px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#b0b0b0"
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#b0b0b0"
                  }
                }
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6A45F4",
                color: "#FFFFFF",
                borderRadius: "0 5px 5px 0",
                height: "40px",
                "&:hover": {
                  backgroundColor: "#5636c7"
                }
              }}
            >
              Search
            </Button>
          </Box>

          <Box sx={{ display: "flex", gap: "10px" }}>
            <IconButton sx={{ color: "#6A45F4" }} onClick={handleOpenAddDialog}>
              <AddIcon />
            </IconButton>
            <IconButton sx={{ color: "#6A45F4" }} onClick={handleOpenDeleteDialog}   disabled={selectedRows.length === 0}>
              <DeleteIcon  />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <CustomTable
        headings={headings}
        data={data}
        selectedRowsMethod={memoizedSetSelectedRow}
        updateShow= {updateShow}
        updateDataparent= {handleUpdate}
      />

<Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#6A45F4" }}>
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

        <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: "15px", mt: 2 }}>
          {/* Service Name Input */}
          <TextField
            label="Service Name"
            variant="outlined"
            fullWidth
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
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
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#6A45F4" },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" },
            }}
          />

          {/* Sector Dropdown (New Feature) */}
          <Select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            displayEmpty
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": { borderColor: "#6A45F4" },
              },
            }}
          >
            <MenuItem value="" disabled>Select Sector</MenuItem>
            <MenuItem value="3D Printing Services">3D Printing Services</MenuItem>
            <MenuItem value="Engineering Services">Engineering Services</MenuItem>
          </Select>

          {/* Service Show Toggle */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Typography>Service Show:</Typography>
            <Switch
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#6A45F4",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#6A45F4",
                },
              }}
              checked={serviceShow}
              onChange={(e) => setServiceShow(e.target.checked)}
            />
          </Box>

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
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleAddSubmit}
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
    </>
  );
};

export default ServiceDashboard;
