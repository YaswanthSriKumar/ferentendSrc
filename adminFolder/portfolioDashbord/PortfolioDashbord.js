import React, { useEffect, useState, useCallback } from "react";
import CustomTable from "../commons/TableComponent";
import ApiService from "../../services/ApiService";
import API_URLS from "../../services/ApiUrl"

import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const PortfolioDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [updateed, setUpdated]=useState(true);
  // Log to verify parent's selectedRows value
  console.log("Parent selectedRows:", selectedRows);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');

      try {
        const response = await ApiService.get(API_URLS.GET_PORTFOLIO,{
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is sent
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        console.log("API Response:", response);
        const transformedData = response.map(itam=>(
          {
            id:itam.portfolioId,
            name: itam.portfolioName,
            description:itam.portfolioDescription,
            image:itam.portfolioImage,
            show: itam.portfolioShow
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

  // Memoize the callback so it doesn't get recreated on every render.
  const memoizedSetSelectedRow = useCallback((selected) => {
    setSelectedRows(selected);
  }, []);
  const updateShow = useCallback( async(id, value) => {
    console.log("id is "+id +"vlaue :"+value);
    try {
      const response = await ApiService.put(API_URLS.UPDATE_PORTFOLIO_SHOW+id,{"portfolioShow": value });
      console.log("API Response:", response);
    } catch (error) {
      console.log("Unable to fetch: " + error);
    }
   
  }, []);
  async function handleUpdate(data){
    console.log("data insde dashbord: "+ data.id);
    console.log("data insde dashbord: "+ data.image);
    const formData = new FormData();
    formData.append("portfolioid", data.id);
    formData.append("portfolioName", data.name);
    formData.append("portfolioDescription", data.description);
    formData.append("portfolioShow", data.show);
    formData.append("portfolioImage", data.image); // Ensure this is a `File` object
    
    console.log("FormData:", formData);
    
    try {
      const response = await ApiService.put(API_URLS.UPDATE_PORTFOLIO, formData, {
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

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioDescription, setPortfolioDescription] = useState("");
  const [portfolioShow, setPortfolioShow] = useState(false);
  const [portfolioImage, setPortfolioImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleOpenAddDialog = () => setOpenAddDialog(true);
  const handleCloseAddDialog = () => setOpenAddDialog(false);
  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setPortfolioImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddSubmit = async () => {
    console.log("submit clicked");
    const productData = {
        portfolioName: portfolioName,
        portfolioImage: portfolioImage,
      portfolioDescription: portfolioDescription,
      portfolioShow: portfolioShow,
    };
    console.log("Service Data:", productData);
    try {
        const response = await ApiService.post(API_URLS.UPLODAD_PORTFOLIO, productData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
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

  const handleDelete = () => {
    console.log(selectedRows);
    alert("Service Deleted Successfully!");
    handleCloseDeleteDialog();
  };

  const headings = ["Serviceid", "Name", "Description", "show"];

  return (
    <>
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: "#FFFFFF", padding: "10px" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="h6" sx={{ color: "#6A45F4", fontWeight: "bold" }}>
            Sroduct Dashboard
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

      {/* Here, we pass the data and the memoized callback.
          Notice that we pass the raw function reference using memoizedSetSelectedRow */}
      <CustomTable
        headings={headings}
        data={data}
        selectedRowsMethod={memoizedSetSelectedRow}
        updateShow= {updateShow}
        updateDataparent={handleUpdate}
      />


      {/* Add Service Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#6A45F4" }}>
          Add New portfolio
        </DialogTitle>
        <DialogContent sx={{ display: "flex", gap: "20px",   }}>
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
              mt:2
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

          <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: "15px", mt:2 }}>
            <TextField
              label="Portfolio Name"
              variant="outlined"
              fullWidth
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                    // Outline color
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" } // Focused outline color
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" }, // Focused label color
              }}
            />
            <TextField
              label="Portfolio Description"
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              value={portfolioDescription}
              
              onChange={(e) => setPortfolioDescription(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                    // Outline color
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" } // Focused outline color
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" }, // Focused label color
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography>Portfolio Show:</Typography>
              <Switch sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#6A45F4",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#6A45F4",
                    },
                  }}
                checked={portfolioShow}
                onChange={(e) => setPortfolioShow(e.target.checked)}
              />
            </Box>
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: "#6A45F4",
                color: "#FFFFFF",
                "&:hover": { backgroundColor: "#5636c7" }
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
            onClick={handleAddSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#6A45F4",
              color: "#FFFFFF",
              "&:hover": { backgroundColor: "#5636c7" },
              margin: "0 auto",
              display: "block",
              width: "100%"
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
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

export default PortfolioDashboard;
