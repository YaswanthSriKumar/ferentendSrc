import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Switch,
  Button,
} from "@mui/material";
import {Typography,TextField,Box,Dialog,DialogActions,DialogContent,DialogTitle} from "@mui/material";


const CustomTable = ({ headings, data, selectedRowsMethod,updateShow,updateDataparent, customColor = "#6A45F4" }) => {
  console.log("Data in CustomTable:", data);
  console.log("headings in CustomTable:", headings);

  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [selectAll, setSelectAll] = useState(false); // Track "Select All" state
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [sector, setSector] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handles selecting/deselecting all rows
  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    // Assume unique id is stored at row[0]
    const newSelected = checked ? data.map((row) => row.id) : [];
    setSelectedRows(newSelected);
    selectedRowsMethod(newSelected);
  };

  // Handles selecting/deselecting individual rows
  const handleRowSelect = (serviceId) => {
    setSelectedRows((prevSelected) => {
      const isSelected = prevSelected.includes(serviceId);
      const updatedSelected = isSelected
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId];
        setTimeout(() => {
          selectedRowsMethod(updatedSelected);
        }, 0);      return updatedSelected;
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
// to convert url into file
  const urlToFile = async (imageUrl, fileName = "image.jpg") => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // Create a File object
    const file = new File([blob], fileName, { type: blob.type });
    
    return file;
  };
  // Handle update action (assuming service id is in row[0])
  const handleUpdate = async(data) => {
    console.log(`Update action triggered for Service ID: ${data.id}`);
    console.log(`Update action triggered for Service sector: ${data.sector}`);

    setId(data.id);
    setName(data.name);
    setDescription(data.description);
    if(headings.includes("sector"))
    {
      setSector(data.sector)
    }
    setImage( await urlToFile(data.image));
    console.log(image);
    setImagePreview(data.image);
    setShow(data.show);
    setOpenAddDialog(true);

    // Implement update logic here
  };
  const handleCloseAddDialog=()=>{
    setOpenAddDialog(false)
  }
  const handleAddSubmit = async() => {
    console.log("submit clicked");
    const updateData = {
      id: id,
      name: name,
      image: image,
      description: description,
      show: show,
      sector: sector
    };
    console.log("Service Data:", updateData);
    await updateDataparent(updateData);
    setOpenAddDialog(false)
  }

  function handelShowChange(id, checked)
  {
    console.log("show of"+id);
    console.log(checked);
    updateShow(id,checked);
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
                sx={{
                  color: "#6A45F4", // Default color
                  "&.Mui-checked": {
                    color: "#6A45F4", // Change color when checked
                  },
                }}

              />
            </TableCell>
            {headings.map((heading) => (
              <TableCell
                key={heading}
                align="center"
                sx={{ fontWeight: "bold", color: customColor }}
              >
                {heading}
              </TableCell>
            ))}
            <TableCell align="center" sx={{ fontWeight: "bold", color: customColor }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
  {data?.map((row) => (
    <TableRow key={row.id}>
      <TableCell align="center">
        <Checkbox checked={selectedRows.includes(row.id)} onChange={() => handleRowSelect(row.id)} color="primary"
        sx={{
          color: "#6A45F4", // Default color
          "&.Mui-checked": {
            color: "#6A45F4", // Change color when checked
          },
        }} 
        />
      </TableCell>

      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.name}</TableCell>
      {
        headings.includes("sector")&&  <TableCell align="center">{row.sector}</TableCell>
      }
      {/* */}
      <TableCell align="center">{row.description?.split(".")[0]}</TableCell>

      <TableCell align="center">
        <Switch
          defaultChecked={row.show}
          color="default"
          onChange={(event) => handelShowChange(row.id, event.target.checked)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": { color: customColor },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: customColor },
          }}
        />
      </TableCell>

      <TableCell align="center">
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: customColor,
            color: "#FFF",
            "&:hover": { backgroundColor: "#4b33a2" },
          }}
          onClick={() => handleUpdate(row)}
        >
          Update
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", color: "#6A45F4" }}>
          Add New Service
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
              label="name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" } 
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" },
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": { borderColor: "#6A45F4" } 
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#6A45F4" }, 
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
    </TableContainer>
  );
};

export default CustomTable;
