import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Header } from "./Header";
import Sidebar from "./Sidebar";
import Grid from "@mui/material/Grid";
import { Table9c } from "../../accesories/Table9c";
import Ratings from "../../accesories/Ratings";
import { Card } from "@mui/material";
import { RadarChart } from "../../accesories/RadarChart";
export default function Dashboard() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
              <Card sx={{ flexGrow: 1, p: 3 }}>
        <Ratings></Ratings>
        </Card>
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
      <Card sx={{ flexGrow: 1, p: 3 }}>
        <RadarChart></RadarChart>

      </Card>
      </Grid>
      <Grid item xs={8} sm={8} md={8}>
     
        <Card sx={{ maxHeight:'475px',flexGrow: 1, p: 3 }}>
        <Table9c></Table9c>
        </Card>
      
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
      <Card sx={{ flexGrow: 1, p: 3 }}>
      <Typography paragraph sx={{ flexGrow: 1, p: 3 }}>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography>
      </Card>
      </Grid>
      </Grid>
    </Box>
    
  );
}
