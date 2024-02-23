import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import axios from "axios";
import Button from '@mui/material/Button';
import { Link  } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the database using Axios
    axios.get("http://localhost/apiPlace/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
  const handleDelete = (id) => {
    const confirmed = window.confirm("ต้องการลบหรือไม่");
    if (confirmed) {
      axios
        .delete(`http://localhost/apiPlace/`, { data: { id: id } })
        .then(function (response) {
          console.log("Place deleted successfully:", response.data);
          setData((prevData) => prevData.filter((item) => item.id !== id));
        })
        .catch(function (error) {
          console.error("Error deleting place:", error);
        });
    }
  };
  
  

  return (
    <TableContainer component={Paper}>
      <Table style={{marginTop:"3%"}}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Score</TableCell>
            <TableCell><Button component={Link} to="/insertPlace" variant="outlined" color="secondary">
                  เพิ่มข้อมูล
                </Button></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.descript}</TableCell>
              <TableCell>
                <img src={item.img} alt={item.name} style={{ width: "100px" }} />
              </TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.score}</TableCell>
              <TableCell>
                <Button component={Link} to={`/editForm/${item.id}`} variant="outlined" color="success">
                  แก้ไข
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(item.id)}>
                  ลบ
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Dashboard;