import {  Dialog, DialogActions, DialogTitle, Button,Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowDropUpTwoToneIcon from '@mui/icons-material/ArrowDropUpTwoTone';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import { Select, makeStyles } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
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
  
const columns = [
   
    { id: 'name', label: 'Topic', minWidth: 80, option: { order: true } },
    
    { id: 'cat', label: 'Description', minWidth: 80, option: { order: true } },
    
    { id: 'cati', label: 'Reply By', minWidth: 80, option: { order: true } },
    { id: 'catii', label: 'Reply Message', minWidth: 80, option: { order: true } },
    
    { id: 'dens', label: 'Posted By', minWidth: 80, option: { order: true } },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 120,
        align: 'center',
        format: (value, row) => (
          <ActionsColumns row={row} />
        ),
      },
  ];
  
  function createData( name,cat, cati,catii, dens) {
    const actions = columns.find((columns) => columns.id === 'actions').format(null, { name,cat, cati,catii,dens });

    return {
      name: name,
      cat:cat,
      cati:cati,
      catii:catii,
      
      dens:dens,
      actions:actions
    };
  }
  
  const rows = [
    createData( 'Can anyone recommend a good family restaurant?', ' I am eager to hear recommendations and personal experiences from my neighbors who have celebrated birthdays or special occasions at famil- friendly restaurants nearby', 'laraib12@gmail.com','Olive Garden. This chain restuarant is known for its italian- american cuisine and is typically very family-friendly','laiba123@gmail.com'),
    createData( 'Have anyone installed a security camera system for their home?', '  I wanted to enhance the security of my home and i am interseted in installing a reliable security camera system. as i navigate through the numerous options available. I would greatly appreciate the advice', 'laiba56@gmail.com', 'Yes! i have security camera in my houses','aiza56@gmail.com'),
    createData( 'I am interested in organizing a park clean up day. who would like to be volunteers?', 'If youre interested in volunteering for the park clean up day, please express your willingess by commenting below','linta8@gmail.com','Yes!i wanted to be a volunteer' ,'mahnoor5@gmail.com'),
    createData( 'Can anyone suggest me a good dentist nearby', ' Hello neighbors. I am currently dealing with a troubleshoot toothache and in urgent need of dental care. I am reaching out to our to our supportive community in the hopes that someone can recommend a good dentist located nearby','alina45@gmail.com','You must visit Elite Dental Centre','ayesaha78@gmail.com'),
    createData( 'Can anyone recommend a good family restaurant?', ' I am eager to hear recommendations and personal experiences from my neighbors who have celebrated birthdays or special occasions at famil- friendly restaurants nearby','ayesha3@gmail.com','Red-robin-This restaurant serves burgers ,sandwiches and others','saad2@gmail.com'),
    createData( 'Can anyone suggest me a good dentist nearby', ' Hello neighbors. I am currently dealing with a troubleshoot toothache and in urgent need of dental care. I am reaching out to our to our supportive community in the hopes that someone can recommend a good dentist located nearby','hasan2@gmail.com','Next cam indoor. This popular security camera system allows you to monitor your home from your smartphones of computer. It offers 24/7 live video streaming, two way audio and motion and sound alert','fiza78@gmail.com'),
    createData( 'Can anyone recommend a good family restaurant?', ' I am eager to hear recommendations and personal experiences from my neighbors who have celebrated birthdays or special occasions at famil- friendly restaurants nearby', 'laraib12@gmail.com','Olive Garden. This chain restuarant is known for its italian- american cuisine and is typically very family-friendly','khan12@gmail.com'),
    createData( 'Have anyone installed a security camera system for their home?', '  I wanted to enhance the security of my home and i am interseted in installing a reliable security camera system. as i navigate through the numerous options available. I would greatly appreciate the advice', 'laiba56@gmail.com', 'Yes! i have security camera in my houses','eman9@gmail.com'),
    createData( 'I am interested in organizing a park clean up day. who would like to be volunteers?', 'If youre interested in volunteering for the park clean up day, please express your willingess by commenting below','linta8@gmail.com','Yes!i wanted to be a volunteer'),
    createData( 'Can anyone suggest me a good dentist nearby', ' Hello neighbors. I am currently dealing with a troubleshoot toothache and in urgent need of dental care. I am reaching out to our to our supportive community in the hopes that someone can recommend a good dentist located nearby','alina45@gmail.com','You must visit Elite Dental Centre','menahil3@gmail.com'),
    createData( 'Can anyone recommend a good family restaurant?', ' I am eager to hear recommendations and personal experiences from my neighbors who have celebrated birthdays or special occasions at famil- friendly restaurants nearby','ayesha3@gmail.com','Red-robin-This restaurant serves burgers ,sandwiches and others','amna67@gmail.com'),
    createData( 'Can anyone suggest me a good dentist nearby', ' Hello neighbors. I am currently dealing with a troubleshoot toothache and in urgent need of dental care. I am reaching out to our to our supportive community in the hopes that someone can recommend a good dentist located nearby','hasan2@gmail.com','Next cam indoor. This popular security camera system allows you to monitor your home from your smartphones of computer. It offers 24/7 live video streaming, two way audio and motion and sound alert','shanza78@gmail.com'),

  
  
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