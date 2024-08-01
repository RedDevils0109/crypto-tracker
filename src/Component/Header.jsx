import React from 'react';
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    
    const navigate = useNavigate();



    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });


    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar sx={{
                background: 'transparent',
                position: 'static',
                color: 'white'
            }}>
                <Container>
                    <Toolbar>
                        <Typography
                            sx={{
                                flex: 1,
                                color: 'gold',
                                fontFamily: 'monospace',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate('/')}
                            variant='h6'
                        >
                            Crypto tracker
                        </Typography>
                       
                           
                       
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;
