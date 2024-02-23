import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

function DetailById({ place, serverName }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    id: place.id,
    comment: "",
    rating: 0,
  });

  const [submittedWithoutRating, setSubmittedWithoutRating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user has provided a rating and comment
    if (data.rating === 0 || data.comment.trim() === "") {
      setSubmittedWithoutRating(true);
      return; // Do not proceed with the submission
    }

    // Reset the submittedWithoutRating state when the form is submitted successfully
    setSubmittedWithoutRating(false);

    // Rest of the code (fetch and save data to the backend) remains the same...
    console.log(serverName);
    fetch(serverName, {
      method: "POST",
      mode: "no-cors", // Add this line
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        // Clear comment and rating fields
        setData({
          id: place.id,
          comment: "",
          rating: 0,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    window.location.reload();
  };

  return (
    <div>
      <Button onClick={handleClickOpen} color="primary">
        อ่านเพิ่มเติม
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ display: "flex", justifyContent: "flex-end", p: 0 }}>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {place && (
            <Card key={place.id} sx={{ maxWidth: 500 }}>
              <Rating
                name={"rating" + place.id}
                defaultValue={parseFloat(place.score)} // Parse the item.score as a float value
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <CardContent>
                <h3
                  style={{
                    fontWeight: "bold",
                    textDecoration: "underline",
                    paddingBottom: "20px",
                  }}
                >
                  {place.name}
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div className="w-full h-80 mb-4 rounded-md overflow-hidden">
                    <CardMedia
                      component="img"
                      height="100%"
                      image={place.img} // ตั้งค่าตามที่คุณต้องการใช้
                      alt={place.name}
                    />
                  </div>
                </div>

                <p>{place.descript}</p>

                <div>
                  <p
                    style={{ fontWeight: "bold", textDecoration: "underline" }}
                  >
                    ความคิดเห็น
                  </p>
                  <ul>
                    {Object.values(place.comment).map((comment, index) => (
                      <li key={index}>
                        {comment.comment_text} โหวต {comment.vote}
                      </li>
                    ))}
                  </ul>
                </div>

                <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
                  เพิ่มความคิดเห็นและให้คะแนน
                </p>
                {submittedWithoutRating && (
                  <p style={{ color: "red" }}>
                    กรุณาให้คะแนนและความคิดเห็นก่อนกดส่งความคิดเห็น !!!
                  </p>
                )}
                <form onSubmit={handleSubmit}>
                  {/* Remove the unnecessary hidden input field for "id" */}
                  <Rating
                    name="rating"
                    value={data.rating}
                    precision={0.5}
                    onChange={handleChange}
                  />
                  <div>
                    {/* Use a div here instead of a p element */}
                    <TextField
                      label="แสดงความคิดเห็น"
                      multiline
                      rows={4}
                      name="comment"
                      value={data.comment}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <br />
                  <Button type="submit" variant="contained" color="primary">
                    ส่งความคิดเห็น
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DetailById;
