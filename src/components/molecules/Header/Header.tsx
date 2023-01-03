import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <Typography variant="h6">POKEMON API</Typography>
      </Toolbar>
    </AppBar>
  );
};
