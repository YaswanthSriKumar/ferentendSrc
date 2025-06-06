import React, { useState, useEffect } from "react";
import { Table,AppBar,Toolbar, TableHead, TableRow, Box, TableCell, TableBody, Checkbox, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; // Add icon
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon
import API_URLS from "../../services/ApiUrl";
import ApiService from "../../services/ApiService";

const CustomerDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true); // Track API loading state
  const [updateed, setUpdated]=useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTypeData,setSelectedTypeData]=useState([]);
  const [click,setClick]=useState("add");

  // Fetch data from API
  useEffect(() => {
    const fetchSubservices = async () => {
      try {
        const response = await ApiService.get(API_URLS.GET_USERS);
        setUsers(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Unable to fetch:", error);
        setUsers([]); // Ensures empty array on failure
      } finally {
        setLoading(false);
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
      event.target.checked ? users.map((s) => s.customerId) : []
    );
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const handleDelete =async () => {
    console.log(selectedRows);
    // try {
    //   const response = await ApiService.delete(API_URLS.DELETE_SUBSERVICE+selectedRows);
    //   console.log(response);
    // } catch (error) {
    //   console.error("Unable to fetch:", error);
    // } 
        handleCloseDeleteDialog();
    setUpdated(prev => !prev);

  };
  // ---------- Dialog-related state & handlers ----------
  const [openDialog, setOpenDialog] = useState(false);
  const [formData1, setFormData1] = useState({
    customerName: "",
    customerContact: "",
    selectedType: "",
    selectedTypeId: "",
    comments:"",
    status:""
  });

  // Dummy sector options (Replace with API call)
  const [sector,setSectors] = useState([]);


  // Handle form input change
  const handleChange = async(e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
    console.log(e.target.value);
    if(e.target.value==="products")
    {
        console.log("yes it is products");
        try {
            const response = await ApiService.get(API_URLS.GET_PRODUCT);
            console.log(response);
            setSelectedTypeData(
                response.map(item=>({
                    selectedTypeId:item.productId,
                selectedTypeName: item.productName
                }))
            );
          } catch (error) {
            console.error("Unable to fetch:", error);
          } 
    }
    if(e.target.value==="services")
    {
        console.log("yes it is services");

        try {
            const response = await ApiService.get(API_URLS.GET_SUBSERVICES);
            console.log(response);
            setSelectedTypeData(
                response.map(item=>({
                    selectedTypeId:item.subserviceId,
                selectedTypeName: item.subserviceName
                }))
            );
          } catch (error) {
            console.error("Unable to fetch:", error);
          } 
    }
    else{
        console.log("yes it is nohing");
    }
  };



  // Handle submit button click in dialog
  const handleSubmit = async() => {
    console.log("Submitted Data:", formData1);
    // const formData = new FormData();
    // formData.append("customerName", formData1.customerName);
    // formData.append("selectedType",formData1.selectedType);
    // formData.append("selectedTypeId", formData1.selectedTypeId);
    // formData.append("customerContact",formData1.customerContact); // Ensure it's a File object
    // formData.append("comments",formData1.comments);
    // console.log("FormData:", formData.customerName);
    const formdata={
      selectedType:formData1.selectedType,
      selectedTypeId:formData1.selectedTypeId,
      customerName: formData1.customerName,
      customerContact:formData1.customerContact,
      status: null,
      comments:formData1.comments
    }
    console.log("FormData:", formdata);
    try {
        const response = await ApiService.post(API_URLS.UPLOAD_USERS,formdata, {
            
          });
       console.log(response);
       setUpdated(prev => !prev);

      } catch (error) {
        console.error("Unable to fetch:", error);
      } 
      setFormData1({
        customerName: "",
        selectedType: "",
        selectedTypeId: "  ",
        customerContact: "",
        comments: "",
        status:""
      })
      setSelectedTypeData([]);
    setOpenDialog(false); // Close dialog after submitting
  };

  // Open Dialog
    const handleOpenAddDialog = async() => {
        
        setOpenDialog(true);}
  const handleCloseAddDialog = () => {

      setClick("add");
      setFormData1({
        customerName: "",
        selectedType: "",
        selectedTypeId: "  ",
        customerContact: "",
        comments: "",
        status:""
      })
      setOpenDialog(false)};

  // ---------- End of Dialog-related section ----------

  async function urlToFile(imageUrl, fileName) {
    const response = await fetch(imageUrl);
    const blob = await response.blob(); // Convert response to Blob

    // Create File object
    const file = new File([blob], fileName, { type: blob.type });
    return file;
}
// -------------------------method to update--------------------
  const handleUpdateClick=async(user)=>{
    console.log(user);
    const usercomments=user.comments;
    if(user.comments==null)
    {
      usercomments="";
    }
      setFormData1({
        customerName: user.customerName,
        customerContact: user.customerContact,
        selectedType: user.selectedType,
        selectedTypeId: user.selectedTypeId,
        comments:usercomments,
        status:user.status
      });
     
      
     
    console.log(formData1)
    setClick("view");
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
            Customer Dashboard
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
      ) : users.length === 0 ? (
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
                    selectedRows.length === users.length &&
                    users.length > 0
                  }
                  sx={{
                    color: "#6A45F4", // Default color
                    "&.Mui-checked": {
                      color: "#6A45F4", // Change color when checked
                    },
                  }} 
                />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>contact</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>selectedtype</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>selectedtype ID </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.customerId}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(user.customerId)}
                    onChange={() => handleSelectRow(user.customerId)}
                    sx={{
                        color: "#6A45F4", // Default color
                        "&.Mui-checked": {
                          color: "#6A45F4", // Change color when checked
                        },
                      }} 
                  />
                </TableCell>
                <TableCell>{user.customerId}</TableCell>
                <TableCell>{user.customerName}</TableCell>
                <TableCell>{user.customerContact}</TableCell>
                <TableCell>{user.selectedType}</TableCell>
                <TableCell>
                  {user.selectedTypeId}
                </TableCell>
                <TableCell>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#6A45F4",
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "#5636c7" },
        }}
        onClick={() => handleUpdateClick(user)} // Pass row data
      >
        view
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
          {click === "add"?
          ("Add New customer"):("customer details")}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", gap: "20px" }}>
          
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
              label="Customer Name"
              variant="outlined"
              fullWidth
              name="customerName"
              value={formData1.customerName}
              onChange={click === "add" ? handleChange : undefined}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" },
              }}
            />

            {/* Service Cost Input */}
            <TextField
              label="Customer Contact"
              variant="outlined"
              fullWidth
              name="customerContact"
              value={formData1.customerContact}
              onChange={click === "add" ? handleChange : undefined}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" },
              }}
            />
            {click === "add"?( <>
              <Select
              name="selectedType"
              value={formData1.selectedType}
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
                Select Type
              </MenuItem>
              <MenuItem value="services">
              service
              </MenuItem>
              <MenuItem value="products">
              products
              </MenuItem>
              
            </Select>
            <Select
              name="selectedTypeId"
              value={formData1.selectedTypeId}
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
              selected Type Id
              </MenuItem>
              {selectedTypeData.map(item=>(<MenuItem key={item.selectedTypeId} value={item.selectedTypeId}>
                {item.selectedTypeName}
              </MenuItem>))}
              
            </Select></>):(
              <>
              <TextField
              label="Selected Type"
              variant="outlined"
              fullWidth
              name="selectedType"
              value={formData1.selectedType}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" },
              }}
            />
            <TextField
              label="selectedTypeId "
              variant="outlined"
              fullWidth
              name="selectedTypeId"
              value={formData1.selectedTypeId}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" },
              }}
            />
              </>
            )
            }
            {/* Service Description Input */}
            <TextField
              label="Customer Comments"
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              name="comments"
              value={formData1.comments}
              onChange={click === "add" ? handleChange : undefined}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" },
              }}
            />
           

            {/* Upload Image Button */}
            
          </Box>
        </DialogContent>

        <DialogActions>
            {click === "add"? (<Button
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
            {formData1.customerId }Submit
          </Button>):(
              <><Button
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
              connect
            </Button>
            {formData1.status==="not yet started"?(<Button
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
              InPogress
            </Button>):(<></>)}
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
              done
            </Button>
            </>
            
          )}
          
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

export default CustomerDashboard;
