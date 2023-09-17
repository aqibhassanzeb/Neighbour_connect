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
    { id: 'name', label: 'Name', minWidth: 80 ,option:{order:true}},
    { id: 'code', label: 'Email Adress', minWidth: 80 },
    {
      id: 'population',
      label: 'Home Address',
      minWidth: 80,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Date Of Joining',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },


    {
      id: 'dey',
      label: 'Last access',
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
        <ActionsColumn row={row} />
      ),
    },
  ];
  
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Button sx={{ backgroundColor: '#005D7A', width: 105, color: 'white' }} variant="outlined" size="small" onClick={handleConfirmation}>
          SusPend
        </Button>
        <ConfirmationDialog open={open} onClose={() => setOpen(false)} onConfirm={handleRemoveConfirm} />
      </div>
    );
    }    
  function createData(name, code, population, size,dey) {
    const density = population / size;
    const actions = columns.find((column) => column.id === 'actions').format(null, { name, code, population, size, dey });

    return { name, code, population, size,  dey ,actions};
  }
  
  const rows = [
    createData('Laiba', 'laiba123@gmail.com', 'S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan', '12 May 2023','Sunday, 21 May 2023',),
    createData('Madiha', 'ma453@gmail.com', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022','Tuesday, 21 April 2023'),
    createData('Linta', 'lh34@gmail.com', 'house no,121,Cycle Market, Bahawalnagar,Karachi,Pakistan', '11 Sep 2022','Wednesday, 21 April 2023',),
    createData('Laraib', 'laraibkhan@gmail.com', 'house no.23 , s.no.4 ,3rd Floor Main University Road Sindh, Dadu,Sindh,Pakistan', '17 May 2023','Thursday, 21 March 2023', ),
    createData('Mahnoor', 'mahi45@gmail.com', 'House NO. 884. RAILWAY ROAD (SERVICE ROAD). I-10/2, Eminabad,Islamabad Capital Terr,Pakistan', '19 Oct 2022','Tuesday, 27 Feb 2023'),
    createData('Aiza', 'ayeza12@gmail.com', "Sector 16 Korangi Industrial Area Sindh, Garh Maharaja,Sindh,Pakistan", '20 Aug 2022','Friday, 21 March 2023',),
    createData('Shifa', 'shifA900@gmail.com', "6-A Gulberg II Punjab, Bhiria,Punjab,Pakistan", '1 Jan 2023', 'Wednesday, 21 Feb 2023'),
    createData('Sami', 'Sami12@gmail.com', "House # C1/17 S.I.T.E. Sindh, Khairpur Nathan Shah,Sindh,Pakistan", '21 Nov 2022','Thursday, 21 May 2023'),
    createData('Amna', 'AmnaMalik3@gmail.com', 'House no,89, F/165-A, Kaleke Mandi,Karachi,Pakistan', '15 Dec 2022','Sunday, 21 Jan 2023'),
    createData('Riaz', 'Riaz@gmail.com', 'house#118 G.T.Road, Lodhran,Peshawar,Pakistan', '27 Feb 2023','Monday, 21 Dec 2022'),
    createData('Isma', 'ismasohail23@gmail.com', 'house #6-7Al-Syed ArcadeBlockl-5, Jahanian Shah,Karachi,Pakistan', '13 March 2023','Tuesday, 22 Oct 2022'),
    createData('Amra ', 'amrafaisa76@gmail.com', 'EFU House #45, KPT Building  Karachi Pakistan, Kamar Mushani,Karachi,Pakistan', '16 April 2023','Saturday, 20 Nov 2022'),
    createData('Yasmin', 'yasminriaz23@gmail.com', 'A-159 House #12 GULISTAN-E-JOHOR, Daulatpur,Sindh,Pakistan', '19 May 2023','Sunday, 2 July 2022'),
    createData('Shahbaz', 'Shahbaz23@gmail.com', 'House #23,G/1537/395 Tando Tayyab, Dhoro Naro,Sindh,Pakistan', '2 April 2023','Thursday, 20 May 2022'),
    createData('Rimsha', 'rimshakhan6@gmail.com', 'house no.4, 1773-Railway Road Punjab, Daud Khel,Punjab,Pakistan', '1 Jun2 2023','Monday, 21 June 2022'),
    createData('Alina', 'Alina34@gmail.com', 'house no.232, 1773- Lodhran,Peshawa,Punjab,Pakistan', '1 Jun2 2023','Sunday, 21 June 2022'),
 
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
        position:"absolute",
        overflow: "scroll",
        Top:40,
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
      Residents
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
                <Paper sx={{ width: '83%', overflow: 'scroll',  position:"absolute", top:90 }}>
                <TableContainer sx={{ maxHeight: 900 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                    <TableRow >
                        {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth,backgroundColor:"#005D7A",color:"#fff",fontWeight:"bold",}}
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