import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

const Header1 = () => {
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
    return (
        <Box sx={{
            bgcolor: "#2B3445"
        }} >
            <Stack >

                <Typography sx={{
                    mr: 2,
                    p: "3px, 10px",
                    bgcolor: "#D23F57",
                    borderRadius: "12px",
                    fontSize: "10px",
                    fontWeight: "bold",
                    color: "#fff"

                }}
                    variant="body2"
                >

                    Hot
                </Typography>
                <Typography sx={{

                    fontSize: "10px",
                    fontWeight: "300",
                    color: "#fff"

                }}
                    variant="body2"
                >

                    Free Express Shipping
                </Typography>






                <div>
                    {theme.palette.mode === "light" ? (
                        <IconButton
                            onClick={() => {
                                localStorage.setItem(
                                    "mode",
                                    theme.palette.mode === "dark" ? "light" : "dark"
                                );
                                colorMode.toggleColorMode();
                            }}
                            color="inherit"
                        >
                            <LightModeOutlined />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={() => {
                                localStorage.setItem(
                                    "mode",
                                    theme.palette.mode === "dark" ? "light" : "dark"
                                );
                                colorMode.toggleColorMode();
                            }}
                            color="inherit"
                        >
                            <DarkModeOutlined />
                        </IconButton>
                    )}
                </div>
            </Stack>
        </Box>
    )
}

export default Header1;
