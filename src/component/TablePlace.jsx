import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TablePlace = ({ serverName }) => {
  const [data, setData] = useState([]);

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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>ลำดับที่</TableCell>
            <TableCell>ชื่อ</TableCell>
            <TableCell>ประเภท</TableCell>
            {/* Add more table headers as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablePlace;
