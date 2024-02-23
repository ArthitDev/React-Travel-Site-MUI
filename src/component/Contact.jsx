import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Contact = () => {
  // รายละเอียดสำหรับนำไปใช้ในข้อมูลที่แสดง
  const contactDetails = {
    profilePicture: "/Profile.jpg",
    GitHubQR: "/Github-QR.jpg",
    TextForGithub: "แสกนเพื่อไปยัง Github",
    FacebookQR: "/Facebook-QR.jpg",
    TextForFacebook: "แสกนเพื่อไปยัง Facebook",
    name: "Arthit LungYa",
    studentId: "641413017",
    major: "เทคโนโลยีสารสนเทศ",
    address: "แม่อาย , เชียงใหม่ , ประเทศไทย",
    phoneNumber: "0979574687",
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* รูปโปรไฟล์ */}
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Avatar
          alt="Profile Picture"
          src={contactDetails.profilePicture}
          sx={{ width: 200, height: 200, borderRadius: "10px" }}
        />
      </Grid>

      {/* รายละเอียดอื่น ๆ */}
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {contactDetails.name}
        </Typography>

        <Typography variant="body1" gutterBottom>
          รหัสนักศึกษา: {contactDetails.studentId}
        </Typography>

        <Typography variant="body1" gutterBottom>
          สาขาวิชา: {contactDetails.major}
        </Typography>

        <Typography variant="body1" gutterBottom>
          ที่อยู่: {contactDetails.address}
        </Typography>

        <Typography variant="body1" gutterBottom>
          เบอร์โทร: {contactDetails.phoneNumber}
        </Typography>
      </Grid>

      {/* Card สำหรับรูป */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ maxWidth: 345, margin: '15px', borderRadius: '10px' }}>
        <Avatar
          alt="GitHubQR Picture"
          src={contactDetails.GitHubQR}
          sx={{ width: 300, height: 300, margin: 'auto', borderRadius: "10px" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" textAlign="center">
            {contactDetails.TextForGithub}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 345, margin: '15px', borderRadius: '10px' }}>
        <Avatar
          alt="FacebookQR Picture"
          src={contactDetails.FacebookQR}
          sx={{ width: 300, height: 300, margin: 'auto', borderRadius: "10px" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" textAlign="center">
            {contactDetails.TextForFacebook}
          </Typography>
        </CardContent>
      </Card>
    </div>
    </Box>
  );
};

export default Contact;
