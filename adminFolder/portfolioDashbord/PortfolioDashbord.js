import React, { useEffect, useState, useCallback } from "react";
import CustomTable from "../commons/TableComponent";
import ApiService from "../../services/ApiService";
import API_URLS from "../../services/ApiUrl"
import SlidePopup from "../../services/popup"

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
  Switch, Select, MenuItem,
  List, ListItem, ListItemText
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const PortfolioDashboard = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [updateed, setUpdated]=useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
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
            show: itam.portfolioShow,
            sector: itam.sector.sectorName,
            sectorId: itam.sector.sectorId

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
  async function handleUpdate(returnData){
    console.log("data insde dashbord: "+ returnData.id);
    console.log("data insde dashbord: "+ returnData.image);
    const formData = new FormData();
    formData.append("portfolioid", returnData.id);
    formData.append("portfolioName", returnData.name);
    formData.append("portfolioDescription", returnData.description);
    formData.append("portfolioShow", returnData.show);
    formData.append("portfolioImage", returnData.image); // Ensure this is a `File` object
    const match = data.find(service => service.sector === returnData.sector);
    formData.append("sectorId", match.sectorId);
    
    console.log("FormData:", formData);
    
    try {
      const response = await ApiService.put(API_URLS.UPDATE_PORTFOLIO, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      console.log("Response from server:", response);
      setMessage(response);
      setType("error");
      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting the form:", error);
      setMessage("unable to update");
      setType("error");
      setShowPopup(true);    }
  setUpdated(prev => !prev);
  }

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openAddSectorDialog, setOpenAddSectorDialog] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  
  const [portfolioName, setPortfolioName] = useState("");
  const [portfolioDescription, setPortfolioDescription] = useState("");
  const [portfolioShow, setPortfolioShow] = useState(false);
  const [portfolioImage, setPortfolioImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sectorName, setSectorName] = useState("");
  const [sectorDetails, setSectorDetails] = useState([]);
  const [sectorId,setSectorId ] = useState([]);
  const [sectorList, setSectorList]= useState([]);
  const [sectorListDialogbox, setSectorListDialogbox]= useState(false);
  const handleOpenSectorListDialogbox= async()=>{
    try {
      const response = await ApiService.get(API_URLS.GET_SECTORS);
      console.log(response);
      setSectorList(response);
    } catch (error) {
    }
    setSectorListDialogbox(true)
  }
  const handlecloseSectorListDialogbox =()=> setSectorListDialogbox(false)



  const handleOpenAddDialog = async() => {
    try {
      const response = await ApiService.get(API_URLS.GET_SECTORS);
      console.log(response);
      setSectorDetails(response);
    } catch (error) {
      console.error("unable to load sectors:", error);
    }
    setOpenAddDialog(true);}
  const handleOpenAddSectorDialog =()=> setOpenAddSectorDialog(true);
  const handleCloseAddSectorDialog = () =>  {
    setPortfolioImage("");
    setSectorName("");
    setImagePreview("");
    setOpenAddSectorDialog(false);}
  const handleCloseAddDialog = () => {
    setPortfolioImage("");
    setPortfolioName("");
    setPortfolioDescription("");
    setPortfolioShow("");
    setImagePreview("");
    setOpenAddDialog(false);}

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
      
        sectorId:sectorId,
  
    };
    console.log("Service Data:", productData);
    try {
        const response = await ApiService.post(API_URLS.UPLODAD_PORTFOLIO, productData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        });
        console.log("Response from server:", response);
        setMessage("Form submitted successfully!");
        setType("success");
        setShowPopup(true);
      } catch (error) {
        console.error("Error submitting the form:", error);
        setMessage("Failed to submit the form. Please try again!");
        setType("error");
        setShowPopup(true);
      }
      
    handleCloseAddDialog();
    setUpdated(prev => !prev);
  };
  const handleAddSectorSubmit= async()=>{
    console.log("submit clicked");
    const productData = {
      sectorName: sectorName,
      sectorImage: portfolioImage,
    };
    console.log("Service Data:", productData);
    try {
        const response = await ApiService.post(API_URLS.UPLOAD_SECTORS, productData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        });
        console.log("Response from server:", response);
        setMessage("upload succesfull");
        setType("success");
        setShowPopup(true);
      } catch (error) {
        console.error("Error submitting the form:", error);
        setMessage("Failed to submit the form. Please try again!");
        setType("error");
        setShowPopup(true);
            }
      handleCloseAddSectorDialog();
      setUpdated(prev => !prev);
  }

  const handleDelete = async() => {
    console.log(selectedRows);
    try {
      const response = await ApiService.delete(API_URLS.DELETE_PORTFOLIOS+selectedRows);
      console.log(response);
      setMessage(response);
      setType("error");
      setShowPopup(true);
    } catch (error) {
      setMessage("unable to delete");
      setType("error");
      setShowPopup(true);
    }  
    handleCloseDeleteDialog();
    setUpdated(prev => !prev);

  };
  const handleSectorListDelete =async(sector)=>{
    try {
      const response = await ApiService.delete(API_URLS.DELETE_SECTORS+sector.sectorId);
      console.log(response);
      setMessage(response);
      setType("error");
      setShowPopup(true);
      handlecloseSectorListDialogbox();
    } catch (error) {
      setMessage("unable to delete");
      setType("error");
      setShowPopup(true);
      console.log("unable to delete");
    }
     }

  const headings = ["Serviceid", "Name","sector", "Description", "show"];

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
            portfolio Dashboard
          </Typography>
{/* 
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
          </Box> */}

          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button sx={{ bgcolor: "#6A45F4",color:"white" }} onClick={handleOpenAddSectorDialog}> Add Sector</Button>
            <Button sx={{ bgcolor: "#6A45F4",color:"white" }} onClick={handleOpenSectorListDialogbox}> delete sector</Button>

            
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
            <Select
              name="serviceId"
              value={sectorId}
              onChange={(e) => setSectorId(e.target.value)}
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
              {sectorDetails.map(item=>(<MenuItem key={item.sectorId} value={item.sectorId}>
                {item.sectorName}
              </MenuItem>))}
              
            </Select>
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
      <Dialog open={openAddSectorDialog} onClose={handleCloseAddSectorDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#6A45F4" }}>
          Add New sector
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
              label="sector Name"
              variant="outlined"
              fullWidth
              value={sectorName}
              onChange={(e) => setSectorName(e.target.value)}
              sx={{ mt:"40px",mb:"20px",
                "& .MuiOutlinedInput-root": {
                    // Outline color
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" } // Focused outline color
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" }, // Focused label color
              }}
            />
            
           
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
            onClick={handleAddSectorSubmit}
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
       {/* dialog box forsector deltion  */}
       <Dialog open={sectorListDialogbox} onClose={handlecloseSectorListDialogbox} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#6A45F4" }}>
        Sector List
      </DialogTitle>

      <DialogContent>
        <List>
          {sectorList.map((sector) => (
            <ListItem
              key={sector.sectorId}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleSectorListDelete(sector)} color="error">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={sector.sectorId} />
              <ListItemText primary={sector.sectorName} />

            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={handlecloseSectorListDialogbox} variant="contained" sx={{ backgroundColor: "#6A45F4", color: "#fff", "&:hover": { backgroundColor: "#5636c7" } }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
      {showPopup && (
        <SlidePopup
          message={message}
          type={type}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default PortfolioDashboard;
