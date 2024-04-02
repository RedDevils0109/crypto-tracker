import React from 'react';
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
const Header = () => {
    const { currency, setCurrency, symbol } = CryptoState();
    const navigate = useNavigate();



    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    // console.log(currency, symbol)

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
                        <Select
                            variant="outlined"
                            value={currency}
                            sx={{
                                width: 100,
                                height: 40,
                                marginLeft: 15,
                                marginRight: 15
                            }}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value="USD" >USD</MenuItem>
                            <MenuItem value="VND">VND</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default Header;
