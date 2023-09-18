import {Dialog, DialogActions, DialogTitle, Button, Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowDropUpTwoToneIcon from '@mui/icons-material/ArrowDropUpTwoTone';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import { makeStyles } from "@material-ui/core";

import {Route,Routes, useLocation, useNavigate, } from "react-router-dom";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Posts from "../Posts/Post";

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

const columns = [
  { id: 'name', label: 'Resident Name', minWidth: 140, option: { order: true } },
  { id: 'population', label: 'Resident Email', minWidth: 80, format: (value) => value.toLocaleString('en-US') },
  { id: 'code', label: 'Reported by', minWidth: 120, align: 'left', format: formatEmail },
  { id: 'size', label: 'Reason', minWidth: 120, align: 'left', format: (value) => value.toLocaleString('en-US') },
  { id: 'de', label: 'No. of reports', minWidth: 120, align: 'center', format: (value) => value.toLocaleString('en-US') },
  { id: 'dey', label: 'Date reported', minWidth: 120, align: 'center', format: (value) => value.toLocaleString('en-US') },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 180,
    align: 'center',
    format: (value, row) => (
      <ActionsColumn row={row} />
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

  function ActionsColumn({ row }) {
    const [open, setOpen] = useState(false);
  
    const navigate = useNavigate();
  
    const handleConfirmation = () => {
      setOpen(true);
    };
  
    const handleShowPost = () => {
      // Navigate to the desired page
navigate('/posts');
    };
  
    const handleRemoveConfirm = () => {
      handleRemove(row); // Call your remove logic here
      setOpen(false);
    };
  
    return (
      <div>
      <Button sx={{ backgroundColor: '#005D7A', color: 'white' }} variant="outlined" size="small" onClick={handleConfirmation}>
        Suspend
      </Button>
     
  
        <ConfirmationDialog open={open} onClose={() => setOpen(false)} onConfirm={handleRemoveConfirm} />
      </div>
    );
  }
  function createData(name, code1, code2, population, size1,size2, de, dey1, dey2) {
   // const density = population / size;
    const actions = columns.find((column) => column.id === 'actions').format(null, { name, code1, code2, population, size1,size2, de, dey1, dey2 });
  
    return {
      name,
      code: (
        <div style={{ padding: '5px', marginBottom: '10px' }}>
          <div>{code1}, {code2}</div>
        </div>
      ),
      population,
      size: (
        <div style={{ padding: '5px', marginBottom: '10px' }}>
          <div>{size1},</div>
          <div>{size2}</div>
        </div>
      ),
      de,
      dey: (
        <div style={{ padding: '5px', marginBottom: '10px' }}>
          <div>{dey1},</div>
          <div>{dey2}</div>
        </div>
      ),
      actions,
    };
  
  }
  
  
  const rows = [
    createData('Laiba', 'laiba123@gmail.com','Fatima12@gmail.com', 'Alina121@gmail.com', 'Dangerous','Illegal','2','12 May 2023','13 March 2023'),
    createData('Madiha', 'ma453@gmail.com', 'Ayesha56@gmail.com', 'shifA900@gmail.com', 'Illegal','Discriminatory','2','15 April 2023','1 Jan 2023'),
    createData('Linta', 'lh34@gmail.com',  'Sania@gmail.com','amrafaisa76@gmail.com', 'Spam or Fraud','Discriminatory','2','1 March 2023','16 Jna 2023'),
    createData('Laraib', 'laraibkhan@gmail.com', 'Maryam12@gmail.com', 'yasminriaz23@gmail.com', 'Discriminatory','Dangerous','2','14 Feb 2023','11 Feb 2023'),
    createData('Mahnnor', 'mahnoor23@gmail.com', 'Saad23@gmail.com', 'lh34@gmail.com', 'Others','Spam or Fraud','2','2 Jan 2023','8 March 2023'),
    createData('Aiza', 'Aiaza4@gmail.com',' ', 'ismasohail23@gmail.com', 'Illegal','Spam or Fraud','Discriminatory','1','6 Dec 2022'),
    createData('Rimsha', 'R2323@gmail.com',  'Fiza90@gmail.com','amrafaisa76@gmail.com', 'Dangerous','Illegal','2','9 Nov 2022','6 Jan 2023'),
    createData('Riaz', 'Riaz780@gmail.com', 'Alina67@gmail.com', 'Alina34@gmail.com', 'Spam or Fraud','Dangerous','2','23 Oct 2022','4 April 2023'),
    createData('Yasmin', 'Yas109@gmail.com', 'Mahnoor45@gmail.com', 'yasminriaz23@gmail.com', 'Others','Discriminatory','2','28 Aug 2022','21 May 2023'),
    createData('Shahbaz', 'Shahbaz89@gmail.com', 'Eman8@gmail.com', 'mahi45@gmail.com', 'Illegal','Dangerous','2','17 June 2022','29 March 2023'),
    createData('Hasan', 'Hasan2018@gmail.com', 'Menahil90@gmail.com', 'ma453@gmail.com', 'Discriminatory','Others','2','11 April 2023','18 April 2023'),
    createData('Sami', 'Sami234@gmail.com', 'Khan9@gmail.com', 'ayeza12@gmail.com', 'Others','Illegal','2','10 March 2023','15 May 2023'),
  
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
const Users = ()=>{

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
        position: "absolute"
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
       Spam Accounts
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
                <Paper sx={{ width: '83%', overflow: 'scroll', position: 'absolute', top:92 }}>
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
        
        
    )
}

export default Users