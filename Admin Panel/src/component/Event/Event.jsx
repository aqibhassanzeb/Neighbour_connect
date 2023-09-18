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
      minWidth: 80,
      format: (value) => `<img src="${value}" alt="User" width="50" height="100" />`,
    },
    
    { id: 'name', label: 'Posted by', minWidth: 140, option: { order: true } },
    { id: 'code', label: 'Resident Email', minWidth: 80 },
    { id: 'population', label: 'Reported by', minWidth: 120, align: 'left', format: formatEmail },
    { id: 'size', label: 'Reason', minWidth: 120, align: 'left', format: (value) => value.toLocaleString('en-US') },
    { id: 'de', label: 'No. of reports', minWidth: 120, align: 'center', format: (value) => value.toLocaleString('en-US') },
    { id: 'dey', label: 'Date reported', minWidth: 120, align: 'center', format: (value) => value.toLocaleString('en-US') },
    
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 180,
      align: 'center',
      format: (value, row) => (
        <ActionsColumns row={row} />
      ),
    },
  ];
  function formatEmail(emails) {
    const formattedEmails = emails.map(email => (
      <div style={{ borderRight: '1px solid black', paddingRight: '5px' }}>
        {email}
      </div>
    ));
    return formattedEmails;
  }
  const ImageContainer = ({ images }) => {
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
      
  function createData(image,name, code, population1, population2, size1, size2, de,dey1, dey2) {
   // const density = population / size;
        const actions = columns.find((columns) => columns.id === 'actions').format(null, { image,name, code, population1, population2, size1,size2, de,dey1, dey2});

        return {
          image: <ImageContainer images={image} />,
          name, code,       population: (
            <div style={{ padding: '5px', marginBottom: '10px' }}>
              <div>{population1}, {population2}</div>
            </div>
          ),size:(
            <div style={{padding: '5px', marginBottom:'10px'}}>
<div>{size1},</div>
<div>{size2}</div>
            </div>
          ), de,dey:(
            <div style={{padding: '5px', marginBottom:'10px'}}>
<div>{dey1},</div>
<div>{dey2}</div>
            </div>
          ),
          
         actions:actions
        };
      };
      
      const rows = [
        createData([require('../img/scar1.jpg')],'Laiba', 'laiba123@gmail.com', 'Alina121@gmail.com', 'Ayesha45@gmail.com', 'Dangerous','Discriminatory','2','12 May 2023','1 March 2023'),
        createData([require('../img/sper1.jpg'), require('../img/sper2.jpg')],'Madiha', 'ma453@gmail.com', 'Fatima23@gmail.com', 'shifA900@gmail.com', 'Illegal','Others','2','15 April 2023','23 April 2023'),
        createData( [require('../img/di5.jpg'), require('../img/dii.jpg'), require('../img/diii5.jpg')],'Laraib', 'laraibkhan@gmail.com', 'yasminriaz23@gmail.com', 'Laraib0@gmail.com', 'Discriminatory','Illegal','2','14 Feb 2023','8 Jna 2023'),
        createData([require('../img/di2.jpg'), require('../img/ge.jpg'), require('../img/geee.jpg')],'Mahnnor', 'mahnoor23@gmail.com', 'lh34@gmail.com', 'Aiza90@gmail.com', 'Others','Discriminatory','2','2 Jan 2023','28 Feb 2023'),
        createData([require('../img/bb4.jpg'), require('../img/bb5.jpg'), require('../img/bb6.jpg')],'Aiza', 'Aiaza4@gmail.com', 'ismasohail23@gmail.com', 'Bisma34@gmail.com', 'Illegal','Dangerous','2','6 Dec 2022','17 May 2023'),
        createData([require('../img/scar1.jpg'), require('../img/scar3.jpg')],'Yasmin', 'Yas109@gmail.com', 'yasminriaz23@gmail.com', 'Laraib78@gmail.com', 'Others','Discriminatory','2','28 Aug 2022','19 March 2023'),
        createData([require('../img/sper1.jpg'), require('../img/sper2.jpg')],'Hasan', 'Hasan2018@gmail.com', 'ma453@gmail.com', 'Eman78@gmail.com', 'Discriminatory','Illegal','2','11 April 2023','12 Feb 2023'),
     
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
      <>
        <Box
      sx={{
        margin: "0px 0px 10px 0px",
        width: '100%',
        height: 80,
        backgroundColor: "#005D7A",
        display: "flex",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h"
        marginLeft={1}
        color="#fff"
        backgroundColor="#005D7A"
        fontWeight="bold"
        marginRight={66}
        marginTop={1}
      >
      Spam Content
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginRight: 1,
          backgroundColor: '#fff',
          borderRadius: '4px',
          height:23
         
        }}
      >
        <SearchIcon color="action" sx={{ marginLeft: 1 }} />
        <TextField
          id="search"
          label="Search"
          variant="standard"
          sx={{ marginLeft: 1, width: '100%',
          '& input': {
            paddingBottom: '17px', // Adjust the padding value as needed
          }, }}
          
        />
      </Box>
    </Box>
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
        </>
        
    );
}
export default OptionA;