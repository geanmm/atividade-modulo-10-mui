import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#39a0a7" }}>
        <Toolbar>
          {/* Menu Icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <PersonIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Gerenciamento de Servidores
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
