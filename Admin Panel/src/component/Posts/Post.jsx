import { Dialog, DialogActions, DialogTitle,Button,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Card, Grid, Box, Typography, TextField, IconButton } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import OptionA from "../Option/OptionA";
import OptionB from "../OptionB/OptionB";
import OptionC from "../OptionC/OptionC";

import { Select, makeStyles } from "@material-ui/core";
import OptionD from "../OptionD/OptionD";
import OptionE from "../OptionE/OptionE";
import { useNavigate } from "react-router-dom";



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
  
  { id: 'name', label: 'Title', minWidth: 80, option: { order: true } },
  { id: 'code', label: 'Description', minWidth: 160 },
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
    minWidth: 120,
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
   
];
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

    
    function createData(image, name, code, population, size, densities,dens) {
      const density = population / size;
      const actions = columns.find((columns) => columns.id === 'actions').format(null, { image, name, code, population, size, densities, dens});

      return {
        image: <ImageContainer images={image} />,
        name: name,
        code: code,
        population: population,
        size: size,
     
        densities: densities,
        dens:dens,
       actions:actions
      };
    };
     
    const rows = [
    
      createData([require('../img/sper1.jpg'), require('../img/sper2.jpg')],  'I noticed a man wearing a mask and gloves', 'A person wearing a black hoodie hanging around the back of the building for the past hours', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022', '5:23Pm','Khan33@gmail.com'),
      createData([require('../img/scar1.jpg'), require('../img/scar3.jpg')], 'A car just pulled up in front of the building', 'Saw a car parked on the side of the roas with no body inside and engine was running', 'S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan', '12 May 2023', '2:00Pm','linta33@gmail.com'),
      createData([require('../img/sper1.jpg'), require('../img/sper2.jpg')],  'I noticed a man wearing a mask and gloves', 'A person wearing a black hoodie hanging around the back of the building for the past hours', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022', '5:23Pm','maryam44@gmail.com'),
      createData([require('../img/scar1.jpg'), require('../img/scar3.jpg')], 'A car just pulled up in front of the building', 'Saw a car parked on the side of the roas with no body inside and engine was running', 'S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan', '12 May 2023', '2:00Pm','laraib44@gmail.com'),
      createData([require('../img/sper1.jpg'), require('../img/sper2.jpg')],  'I noticed a man wearing a mask and gloves', 'A person wearing a black hoodie hanging around the back of the building for the past hours', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022', '5:23Pm','mahi33@gmail.com'),
      createData([require('../img/scar1.jpg'), require('../img/scar3.jpg')], 'A car just pulled up in front of the building', 'Saw a car parked on the side of the roas with no body inside and engine was running', 'S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan', '12 May 2023', '2:00Pm','ayesha90@gmail.com'),
      createData([require('../img/sper1.jpg'), require('../img/sper2.jpg')],  'I noticed a man wearing a mask and gloves', 'A person wearing a black hoodie hanging around the back of the building for the past hours', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022', '5:23Pm','alina67@gmail.com'),
      createData([require('../img/scar1.jpg'), require('../img/scar3.jpg')], 'A car just pulled up in front of the building', 'Saw a car parked on the side of the roas with no body inside and engine was running', 'S.No.1 Ayoub Gate Charhi Sindh, Rawalpindi,Sindh,Pakistan', '12 May 2023', '2:00Pm','Rana23@gmail.com'),
      createData([require('../img/sper1.jpg'), require('../img/sper2.jpg')],  'I noticed a man wearing a mask and gloves', 'A person wearing a black hoodie hanging around the back of the building for the past hours', 'Suite # 4 1st Floor Nagani Chamber opp APL West Wharf Road Karachi Pakistan, Adilpur,Karachi,Pakistan', '13 June 2022', '5:23Pm','Kinza@gmail.com'),
     
     
    ];
const posts = [
  {
    id: 1,
    title: "Suspicious Post",
    content: "A car just pulled up in front of the building",
    Posted: "Laiba Riaz",
    Time: "3 min ago",
    
    onClick: "/OptionB",
    
  },
  {
    id: 2,
    title: "Lost and Found Post",
    content: "Lost a wallet.",
    Posted: "Shahbaz Khan",
    Time: "7 min ago",
    
    onClick: "/OptionA",
  },
  {
    id: 3,
    title: "Skill Sharing Post",
    content: "Electrician.",
    Posted: "Mahnoor Abbasi",
    Time: "30 min ago",
    
    onClick: "/OptionC",
  },
  {
    id: 4,
    title: "Neighbor Forum Post",
    content: "Can anyone recommend a good family restaurant?.",
    Posted: "Riaz Khan",
    Time: "39 min ago",
    
    onClick: "/OptionE",

  },
  {
    id: 5,
    title: "Buy and Sell",
    content: "Vintage Dinning Chair.",
    Posted: "Laraib khan",
    Time: "45 min ago",
    
    onClick: "/OptionD",
  },
  {
    id: 6,
    title: "Suspicious Activity",
    content: "I noticed a man wearing a mask and gloves.",
    Posted: "Yasmin khan",
    Time: "1 hr ago",
    
    onClick: "/OptionB",
  },
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
const Users = () => {
  const styles = {
    container: {
      height: 'calc(100vh - 80px)', // Adjust the height to fit your needs
      overflow: 'auto',
    },
    
    tableContainer: {
      maxHeight: 600,
    },
  };
  const navigate = useNavigate();

  const handleShowPost = (path) => {
    // Navigate to the desired page
    navigate(path);
  };
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
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


  return (
    <>
    
   
          <Box
        sx={{
          position:"absolute",
          margin: "0px 0px 10px 0px",
          width: "100%",
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
          Posts
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: 1,
            backgroundColor: "#fff",
            borderRadius: "4px",
            height: 23,
            marginLeft: 16,
          }}
        >
          <SearchIcon color="action" sx={{ marginLeft: 1 }} />
          <TextField
            id="search"
            label="Search Resident"
            variant="standard"
            sx={{
              marginLeft: 1,
              width: "100%",
              "& input": {
                paddingBottom: "17px",
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{marginTop:12}}>
         <div  >

        <select className="Space" value={selected} onChange={(e) => handleChange(e)}>
          {selected === "" && <option>Select Category</option>}
          <option>Lost and Found</option>
          <option>Neighbor Watch</option>
          <option>Skills Hub</option>
          <option>Sell Zone</option>
          <option>Neighbor Forum</option>
        </select>
        {selected === "Lost and Found" && <OptionA />}
        {selected === "Neighbor Watch" && <OptionB />}
        {selected === "Skills Hub" && <OptionC />}
        {selected === "Sell Zone" && <OptionD />}
        {selected === "Neighbor Forum" && <OptionE />}
      </div>
      </Box>
      {(selected !== "Lost and Found" &&
        selected !== "Neighbor Watch" &&
        selected !== "Skills Hub" &&
        selected !== "Sell Zone" &&
        selected !== "Neighbor Forum") && (
          
          <div style={styles.container}>
  
  <h3 style={{ color: '#005D7A', fontWeight: 'normal' }}>Recent Posts</h3>
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
      )}
    </>
  );
};

export default Users;
