import {  Dialog, DialogActions, DialogTitle, Button,Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowDropUpTwoToneIcon from '@mui/icons-material/ArrowDropUpTwoTone';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import { Select, makeStyles } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import di1 from '../img/di1.jpg';

import "../Option/Option.css"

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

  const EnlargedImageView = ({ imageUrls, onClose }) => (
    <div className="modal" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="modal-content" style={{
        position: 'relative',
        padding: '20px',
      }}>
        <span className="close" onClick={onClose} style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '20px',
          color: '#aaa',
          cursor: 'pointer'
        }}>&times;</span>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {imageUrls.map((imageUrl, index) => (
            imageUrl.endsWith('.mp4') ? (
              <video
                key={index}
                src={imageUrl}
                alt="User"
                width="300"
                height="auto"
                style={{ marginRight: '10px' }}
                controls
              />
            ) : (
              <img
                key={index}
                src={imageUrl}
                alt="User"
                width="300"
                height="auto"
                style={{ marginRight: '10px' }}
              />
            )
          ))}
        </div>
      </div>
    </div>
  );
 
  
const columns = [
  {
    id: 'image',
    label: 'Image',
     minWidth: 180,
    format: (value) => `<img src="${value}" alt="User" width="800" height="100" />`,
  },
  
  
  { id: 'cat', label: 'Category', minWidth: 80, option: { order: true } },
  {
      id: 'population',
      label: 'Location',
      minWidth: 80,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
  { id: 'name', label: 'Skill Level', minWidth: 80, option: { order: true } },
  
  { id: 'code', label: 'Description', minWidth: 80 },
  {
      id: 'densities',
      label: 'Time',
      minWidth: 70,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    
  { id: 'Type', label: 'Price', minWidth: 80, option: { order: true } },
  {
    id: 'dey',
    label: 'Days',
    minWidth: 90,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
 

  {
      id: 'denn',
      label: 'Endorsement',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'dens',
      label: 'Posted by',
      minWidth: 170,
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
  
]; const ImageContainer = ({ images }) => {
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
        {images.map((imageUrl, index) => {
          if (imageUrl.endsWith('.mp4')) {
            return (
              <video
                key={index}
                src={imageUrl}
                alt="User"
                width="90"
                height="100"
                style={{ marginRight: '10px', cursor: 'pointer' }}
                onClick={() => handleImageClick(imageUrl)}
              />
            );
          } else {
            return (
              <img
                key={index}
                src={imageUrl}
                alt="User"
                width="90"
                height="100"
                style={{ marginRight: '10px', cursor: 'pointer' }}
                onClick={() => handleImageClick(imageUrl)}
              />
            );
          }
        })}
      </div>
    );
  } else {
    if (images.endsWith('.mp4')) {
      imageElement = (
        <video
          src={images}
          alt="User"
          width="90"
          height="100"
          style={{ cursor: 'pointer' }}
          onClick={() => handleImageClick(images)}
        />
      );
    } else {
      imageElement = (
        <img
          src={images}
          alt="User"
          width="90"
          height="100"
          style={{ cursor: 'pointer' }}
          onClick={() => handleImageClick(images)}
        />
      );
    }
  }

  return (
    <div>
      <img
        src={images[0]} // Show only the first image in the row
        alt="User"
        width="90"
        height="100"
        style={{ marginRight: '10px', cursor: 'pointer' }}
        onClick={() => handleImageClick(images[0])}
      />
      {selectedImage && (
        <div className="enlarged-image-container">
          <EnlargedImageView imageUrls={images} onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};
function createData(images, cat, population, name, code, densities, Type, dey, denn, dens) {
  const actions = columns.find((columns) => columns.id === 'actions').format(null, { images, cat, population, name, code, densities, Type, dey, denn, dens });

  return {
    image: <ImageContainer images={images} />,
    cat: cat,
    name: name,
    code: code,
    population: population,
    densities: densities,
    Type: Type,
    dey: dey,
    denn: denn,
    dens: dens,
    actions: actions
  };
};
  
       
      const rows = [
  
        createData([require('../img/Elec1.jpg'), require('../img/Elec2.jpg'), require('../img/Elec3.jpg')], 'Electrician',  'S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan','Skilled', 'I can do all the things', '2:00Pm','2000Rs', 'Monday-Wednesday',  '5 endorsement','laiba123@gmail.com'),
        createData([require('../img/t1.jpg'), require('../img/t2.jpg'), require('../img/t3.jpg')], 'Tutoring',  'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan','Skilled','I can do all the things', '5:23Pm','6000Rs', 'Tuesday',  '6 endorsement','alina3@gmail.com'),
        createData([require('../img/bb1.jpg'), require('../img/bb2.jpg'), require('../img/bb3.jpg')],'BabySitting', 'house no,121,Cycle Market, Bahawalnagar,Karachi,Pakistan',' Semi Skilled','I can do all the things', '8:00Am','6000Rs', 'Wednesday',  '9 endorsement','maryam@gmail.com'),
       
        createData( [require('../img/cc1.jpg'), require('../img/cc2.jpg'), require('../img/cc3.jpg')],'Cooking', 'S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan', 'Skilled', 'I can do all the things','10:00Am','7000Rs','Thursday', '3 endorsement','fiza@gmail.com'),
        createData([require('../img/g1.jpg'), require('../img/g2.jpg'), require('../img/g3.jpg')],'Gardening','Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan',' Semi Skilled','I can do all the things','12:00Pm','9000Rs','Friday',  '1 endorsement','hasan@gmail.com'),
         createData([require('../img/bb4.jpg'), require('../img/bb5.jpg'), require('../img/bb6.jpg')],'BabySitting', 'House no,89, F/165-A, Kaleke Mandi,Karachi,Pakistan', 'Skilled', 'I can do all the things','8:23Pm','5000Rs','Friday', '4 endorsement','saad23@gmail.com'),
        createData([require('../img/Elec4.jpg'), require('../img/Elec5.jpg'), require('../img/Elec6.jpg')],'Electrician', 'house#118 G.T.Road, Lodhran,Peshawar,Pakistan',' Semi Skilled', 'I can do all the things','9:30Pm','2000Rs','Saturday', '5 endorsement','ayesha@gmail.com'),
        createData([require('../img/tu4.jpg'), require('../img/tu5.jpg'), require('../img/tu6.jpg')],'Tutoring', 'A-159 House #12 GULISTAN-E-JOHOR, Daulatpur,Sindh,Pakistan','Skilled','I can do all the things',  '3:00Am','8000Rs','Wednesday, Friday', '3 endorsement','mahnoor89@gmail.com'),
        createData( [require('../img/cc5.jpg'), require('../img/cc6.jpg'), require('../img/cc4.jpg')],'Cooking', 'S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan', 'Skilled', 'I can do all the things','10:00Am','7000Rs','Thursday', '3 endorsement','aiza78@gmail.com'),
        createData([require('../img/g4.jpg'), require('../img/g5.jpg'), require('../img/g6.jpg')],'Gardening','Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan',' Semi Skilled','I can do all the things','12:00Pm','9000Rs','Friday',  '1 endorsement','laraib78@gmail.com'),
       
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