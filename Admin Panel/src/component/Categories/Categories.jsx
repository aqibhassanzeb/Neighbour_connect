import React, { useState } from "react";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import SellCat from "./SellCat";
import SkillCat from "./SkillCat";
import WatchCat from "./WatchCat";
import LostAndFound from "./LostAndFound";
function App() {
  const [selectedModule, setSelectedModule] = useState("Skills Hub"); // State to store the selected module
  const [categories, setCategories] = useState([]); // State to store categories for the selected module
  const [categoryName, setCategoryName] = useState(""); // State to store the category name

  // Function to handle changes in the dropdown selection
  const handleModuleChange = (event) => {
    setSelectedModule(event.target.value);
    setCategories([]); // Clear categories when a new module is selected
  };

  // Function to add a category for the selected module
  const handleAddCategory = () => {
    if (categoryName.trim() !== "") {
      setCategories([...categories, categoryName]);
      setCategoryName("");
    }
  };

  return (
    <div>
      <Box
        sx={{
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
          Add Category
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: 1,
            backgroundColor: "#fff",
            borderRadius: "4px",
            height: 23,
          }}
        ></Box>
      </Box>
      <Box>
        <FormControl
          sx={{
            width: 200,
            marginLeft: 2,
            marginBottom: 2,
          }}
        >
          <Select
            labelId="select-category"
            id="posts-select"
            value={selectedModule}
            onChange={handleModuleChange}
            variant="outlined"
            style={{ height: 35 }}
          >
            <MenuItem value={"Neighbor Watch"}>Neighbor Watch</MenuItem>
            <MenuItem value={"Lost and Found"}>Lost and Found</MenuItem>
            <MenuItem value={"Skills Hub"}>Skills Hub</MenuItem>
            <MenuItem value={"Sell Zone"}>Sell Zone</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {selectedModule === "Sell Zone" && <SellCat />}
      {selectedModule === "Skills Hub" && <SkillCat />}
      {selectedModule === "Neighbor Watch" && <WatchCat />}
      {selectedModule === "Lost and Found" && <LostAndFound />}
    </div>
  );
}

export default App;
