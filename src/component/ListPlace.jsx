import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import DetailById from "./DetailById";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Typography } from "@mui/material";

function ListPlace({ serverName }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Fetch data from an API
    fetch(serverName)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setData(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    // Update the filtered items when the search query changes
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.descript.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
    // Reset to first page when the search query changes
    setCurrentPage(1);
  }, [data, searchQuery]);

  // Calculate the index of the last item in the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item in the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current page of items
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle search box change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="my-component-container">
      <Stack
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          label="ค้นหาสถานที่ท่องเที่ยว"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            width: "100%", // Full width on mobile screens
            maxWidth: 300, // Maximum width on larger screens
            "& .MuiInputBase-root": { height: 50 },
            mt: 2,
          }}
        />
        <div
          className="my-component-cards"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {currentItems.map((item, index) => (
            <Card
              key={item.id}
              sx={{
                width: { xs: "100%", sm: "45%", md: "30%" },
                marginBottom: "20px",
                marginRight: index % 2 === 0 ? "20px" : "20px",
                marginLeft: index % 2 !== 0 ? "20px" : "20px",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={item.img}
                alt={item.name}
              />

              <CardContent>
                <h4>{item.name}</h4>
                <p>{item.descript.slice(0, 150)}...</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Rating
                    name={"rating" + item.id}
                    defaultValue={parseFloat(item.score)} // Parse the item.score as a float value
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                </div>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  textAlign="center"
                >
                  {item.score} จาก 5.0 คะแนน
                </Typography>
                <DetailById place={item} serverName={serverName} />
              </CardContent>
            </Card>
          ))}
        </div>
        <div style={{ paddingBottom: "20px" }}>
          {filteredItems.length > itemsPerPage && (
            <Pagination
              count={Math.ceil(filteredItems.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChange}
              color="success"
            />
          )}
        </div>
      </Stack>
    </div>
  );
}

export default ListPlace;
