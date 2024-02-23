import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function EditForm() {
  const navigate = useNavigate();

  const [editData, setEditData] = useState({name: "",
  descript: "",
  img: "",
  type: "",
  score: "",});
  const { id } = useParams();

  useEffect(() => {
    FetchData();
  }, []);

  function FetchData() {
    axios
      .get(`http://localhost:8080/apiPlace/?id=${id}/`)
      .then(function (response) {
        console.log(response.data[0]);
        setEditData(response.data[0]);
      });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditData((values) => ({ ...values, [name]: value }));
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:8080/apiPlace/?id=${id}`, editData).then(function (response) {
      console.log(response.data);
      navigate("/Dashboard");
    });
  };

  return (
    <Container style={{marginTop:"10%"}} component="main" maxWidth="xs">
      <div>
        <Typography variant="h5" align="center">
          แก้ไขข้อมูล  <br />{editData.name}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="ชื่อ"
            name="name"
            value={editData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="คำอธิบาย"
            name="descript"
            value={editData.descript}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="ตำแหน่งรูปภาพ"
            name="img"
            value={editData.img}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="ประเภท"
            name="type"
            value={editData.type}
            onChange={handleChange}
          />
          <TextField
          fullWidth
          margin="normal"
          label="คะแนน"
          name="score"
          value={editData.score}
          onChange={handleChange}
        />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Save
          </Button>
        </form>
      </div>
    </Container>
  );
}