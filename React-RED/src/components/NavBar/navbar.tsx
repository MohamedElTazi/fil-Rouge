import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../theme/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

interface TopbarProps {
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar: React.FC<TopbarProps> = ({ setIsSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
  
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;