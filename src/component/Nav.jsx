import React from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@mui/material";

const MyMenu = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#4CAF50" }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button color="inherit" href="/">
              <Typography variant="h6" component="div" sx={{ fontSize: "20px" }}>
                สถานที่ท่องเที่ยว
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button color="inherit" href="/TablePlace">
                  รายชื่อสถานที่ท่องเที่ยว
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" href="/contact">
                  ติดต่อ
                </Button>
              </Grid>
              <Grid item>
                <Button color="inherit" href="/login">
                  เข้าสู่ระบบ
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MyMenu;
