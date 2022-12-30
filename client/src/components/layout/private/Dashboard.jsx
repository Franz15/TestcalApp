import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Header } from './Header';
import Sidebar from './Sidebar';


import { Table9c } from "../../accesories/Table9c";
import Ratings from "../../accesories/Ratings";
export default function Dashboard() {
    return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header></Header>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box className="Box"
              sx={{
                p: 2,
                bgcolor: 'background.default',
                justifyContent: "space-between"
              }}
              >
                <Ratings></Ratings>
        </Box>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Table9c></Table9c>
        </Box>
        <Typography paragraph sx={{ flexGrow: 1, p: 3 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}