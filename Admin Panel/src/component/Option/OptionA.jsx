import {  Dialog, DialogActions, DialogTitle, Button,Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowDropUpTwoToneIcon from '@mui/icons-material/ArrowDropUpTwoTone';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import { Select, makeStyles } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import di1 from '../img/di1.jpg';

import "./Option.css"

function ConfirmationDialog({ open, onClose, onConfirm }) {
    const handleConfirm = () => {
      onConfirm();
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Are you sure you want to perform this action?</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">Confirm</Button>
          <Button onClick={onClose} color="error">Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  function handleSuspend(row) {
    // Logic for suspending a resident
  }
  
  function handleRemove(row) {
    // Logic for removing a resident
  }
function ActionsColumns({ row }) {
    const [open, setOpen] = useState(false);
  
    const handleConfirmations = () => {
      setOpen(true);
    };
  
    const handleSuspendConfirms = () => {
      handleSuspend(row); // Call your suspend logic here
      setOpen(false);
    };
  
    const handleRemoveConfirms = () => {
      handleRemove(row); // Call your remove logic here
      setOpen(false);
    };
  
    return (
      <div>
        <Button sx={{ backgroundColor: '#005D7A', color: 'white' }} variant="outlined" size="small" onClick={handleConfirmations}>
         Delete
        </Button>
      
  
        <ConfirmationDialog open={open} onClose={() => setOpen(false)} onConfirm={handleRemoveConfirms} />
      </div>
    );
  }
  
  const EnlargedImageView = ({ imageUrl, onClose }) => (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={imageUrl} alt="Enlarged User" className="enlarged-image" />
      </div>
    </div>
  );
 
    const columns = [
      {
        id: 'image',
        label: 'Image',
        minWidth: 80,
        format: (value) => <img src={value} alt="User" width="50" height="100" />,
      },
      
        
        { id: 'name', label: 'Title', minWidth: 80, option: { order: true } },
        
        { id: 'cat', label: 'Category', minWidth: 80, option: { order: true } },
        
        { id: 'Type', label: 'Type', minWidth: 80, option: { order: true } },
        { id: 'code', label: 'Description', minWidth: 80 },
        {
          id: 'population',
          label: 'Location',
          minWidth: 80,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'size',
          label: 'Date ',
          minWidth: 170,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
        {
          id: 'densities',
          label: 'Time',
          minWidth: 70,
          align: 'left',
          format: (value) => value.toLocaleString('en-US'),
        },
     
        {
            id: 'dens',
            label: 'Posted By',
            minWidth: 90,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
          },
          {
            id: 'actions',
            label: 'Actions',
            minWidth: 120,
            align: 'center',
            format: (value, row) => (
              <ActionsColumns row={row} />
            ),
          },
      ];const ImageContainer = ({ images }) => {
        const [selectedImage, setSelectedImage] = useState(null);
      
        const handleImageClick = (imageUrl) => {
          setSelectedImage(imageUrl);
        };
      
        const handleCloseModal = () => {
          setSelectedImage(null);
        };
      
        let imageElement;
      
        if (Array.isArray(images)) {
          imageElement = (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt="User"
                  width="50"
                  height="100"
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                  onClick={() => handleImageClick(imageUrl)}
                />
              ))}
            </div>
          );
        } else {
          imageElement = (
            <img
              src={images}
              alt="User"
              width="50"
              height="100"
              style={{ cursor: 'pointer' }}
              onClick={() => handleImageClick(images)}
            />
          );
        }
      
        return (
          <div>
            {imageElement}
            {selectedImage && (
              <div className="enlarged-image-container">
                <EnlargedImageView imageUrl={selectedImage} onClose={handleCloseModal} />
              </div>
            )}
          </div>
        );
      };
      
      const createData = (images, name, cat, Type, code, population, size, densities,  dens) => {
        const density = population / size;
        const actions = columns.find((columns) => columns.id === 'actions').format(null, { name, code, population, size,});
      
        return {
          image: <ImageContainer images={images} />,
          name: name,
          cat: cat,
          Type: Type,
          code: code,
          population: population,
          size: size,
        
          densities: densities,
          dens:dens,
          actions: actions
        };
      };
      const rows = [
      
          createData([require('../img/bag.jpg')], 'Bag', 'Accessories','Lost','Losted in park', 'S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan', '12 May 2023', '2:00Pm','laiba123@gmail.com'),
          createData(require('../img/key.jpg'), 'Keys', 'Accessories','Found','Founded in street', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022', '5:23Pm', 'mahnoor5@gmail.com'),
          createData(require('../img/wallet.jpg'), 'Wallet','Accessories','Lost', 'Losted at gate', 'house no,121,Cycle Market, Bahawalnagar,Karachi,Pakistan', '11 Sep 2022', '8:00Am', 'aaiza34@gmail.com'),
         
          createData(require('../img/ring.jpg'),'Ring', 'Accessories','Found','Founded in park', 'S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan', '12 May 2023','10:00Am','alina78@gmail.com'),
          createData(require('../img/hat.jpg'),'Cap','Accessories','Found', 'Founded in park', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022','12:00Pm','wania34@gmail.com'),
          createData(require('../img/key.jpg'), 'Keys', 'Accessories','Found','Founded in street', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022', '5:23Pm', 'areeba3@gmail.com'),
          createData(require('../img/wallet.jpg'), 'Wallet','Accessories','Lost', 'Losted at gate', 'house no,121,Cycle Market, Bahawalnagar,Karachi,Pakistan', '11 Sep 2022', '8:00Am', 'ayesha6@gmail.com'),
         
          createData(require('../img/ring.jpg'),'Ring', 'Accessories','Found','Founded in park', 'S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan', '12 May 2023','10:00Am','hasan@gmail.com'),
          createData(require('../img/hat.jpg'),'Cap','Accessories','Found', 'Founded in park', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022','12:00Pm','ali90@gmail.com'),
          createData(require('../img/key.jpg'), 'Keys', 'Accessories','Found','Founded in street', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022', '5:23Pm', 'mahi34@gmail.com'),
          createData(require('../img/wallet.jpg'), 'Wallet','Accessories','Lost', 'Losted at gate', 'house no,121,Cycle Market, Bahawalnagar,Karachi,Pakistan', '11 Sep 2022', '8:00Am', 'ayeshakahan89@gmail.com'),
         
          createData(require('../img/ring.jpg'),'Ring', 'Accessories','Found','Founded in park', 'S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan', '12 May 2023','10:00Am','eman23@gmail.com'),
          createData(require('../img/hat.jpg'),'Cap','Accessories','Found', 'Founded in park', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022','12:00Pm','menahil23@gmail.com'),
        createData(require('../img/key.jpg'), 'Keys', 'Accessories','Found','Founded in street', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022', '5:23Pm', 'shanza90@gmail.com'),
        createData(require('../img/wallet.jpg'), 'Wallet','Accessories','Lost', 'Losted at gate', 'house no,121,Cycle Market, Bahawalnagar,Karachi,Pakistan', '11 Sep 2022', '8:00Am', 'rabia9@gmail.com'),
       
         createData(require('../img/hat.jpg'),'Cap','Accessories','Found', 'Founded in park', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022','12:00Pm','saad78@gmail.com'),
      
        ];
        const useStyles = makeStyles({
            ASC:{
               position:"absolute",
               margin:"-4px 0px 0px 0px",
               cursor:"pointer",
               title:"pp"
            },
            DESC:{
              position:"absolute",
              margin:"4px 0px 0px 0px",
              cursor:"pointer",
            },
           containerStyle : {
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f1f1f1',
              borderRadius: '4px',
              padding: '4px',
            },
          
            inputStyle :{
              border: 'none',
              outline: 'none',
              padding: '8px',
              width: '100%',
            },
          
          
            iconStyle : {
              marginLeft: '8px',
              color: '#aaa',
              cursor: 'pointer',
            },
        })

        
        const OptionA = ()=>{
  const styles = {
    container: {
      height: 'calc(100vh - 80px)', // Adjust the height to fit your needs
      overflow: 'auto',
    },
    
    tableContainer: {
      maxHeight: 600,
    },
  };
        const classes = useStyles();
        const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(15);
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      
    return(
        <div style={styles.container}>
        <Paper sx={{ width: '83%', overflow: 'scroll',  }}>
        <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow >
                {columns.map((column) => (
                <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth,backgroundColor:"#005D7A",color:"#fff",fontWeight:"bold"}}
                >
                    {column.label}
                      
        {/* <Divider variant="fullWidth" backgroundColor="red" orientation="vertical"/> */}
                </TableCell>
                ))}
            </TableRow>
            </TableHead>
            <TableBody>

            {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                        <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                        );
                    })}
                     </TableRow>
                );
                })}
            </TableBody>

        </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[15,20,50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
        </div>
    );
}
export default OptionA;