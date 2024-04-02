import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import { numberWithCommas } from './Banner/Carousel'
import { CoinList } from '../config/api'
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import {
    Container, Typography, TextField, TableContainer, TableHead, TableBody, Paper, LinearProgress, Table, TableRow, TableCell
    , Pagination
} from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CoinsTable = () => {
    const [coinList, setCoinList] = useState([])

    const [loading, setLoading] = useState(true)
    const { currency, symbol } = CryptoState()
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({ field: "", ascending: true })

    const navigate = useNavigate();

    const fetchCoinList = async () => {
        const response = await axios.get(CoinList(currency))
        return (response.data)
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCoinList();
            setCoinList(data);
            setLoading(false);
        };
        fetchData();
        setPage(1)
    }, [currency]);
    useEffect(() => {
        const sortedList = [...coinList].sort((a, b) => {
            const fieldA = a[order.field];
            const fieldB = b[order.field];

            if (order.ascending) {
                return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
            } else {
                return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
            }
        });

        setCoinList(sortedList);
        setPage(1);
    }, [order]);
    useEffect(() => {
        window.scroll(0, 450);
    }, [page]);
    useEffect(() => {
        setPage(1)
    }, [search])


    const handleSearch = () => {
        return coinList.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()));

    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const headMap = {
        'Coin': 'id',
        'Price': 'current_price',
        '24 Change': 'market_cap_change_percentage_24h',
        'Market Cap': 'market_cap_rank'
    };

    const headArray = Object.keys(headMap)

    return (
        <ThemeProvider theme={darkTheme}>
            <Container sx={{ textAlign: "center" }}>

                <Typography variant='h4' sx={{ margin: 10, fontFamily: "Montserrat", fontWeight: 600, fontSize: 50 }}>
                    Crypto Market
                </Typography>
                <TextField
                    id="outlined-basic"
                    label="Search coin..."
                    variant="outlined"
                    sx={{
                        marginBottom: 5,
                        width: '100%'
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />

                <TableContainer component={Paper}>
                    {loading ? (<LinearProgress sx={{ backgroundColor: 'gold' }}></LinearProgress>) :
                        (
                            <Table aria-label="simple table">
                                <TableHead sx={{ backgroundColor: 'gold' }}>

                                    <TableRow>
                                        {headArray.map((head) => (
                                            <TableCell sx={{
                                                color: "black",
                                                fontWeight: '700',
                                                fontFamily: "Montserrat",
                                                "&:hover": {
                                                    opacity: '0.5',

                                                    cursor: 'pointer'
                                                }
                                            }} key={head} align={head === 'Coin' ? "left" : 'right'} onClick={() => setOrder(pre => ({
                                                field: headMap[head],
                                                ascending: !pre.ascending
                                            }))}
                                            >
                                                {head === 'Coin' ? head :

                                                    (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                        <span>{head}</span>
                                                        {head !== 'Coin' && (
                                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                                <i className='bx bx-caret-up'></i>
                                                                <i className='bx bx-caret-down'></i>
                                                            </div>
                                                        )}
                                                    </div>)
                                                }



                                            </TableCell>
                                        ))}

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map(row => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow onClick={() => navigate(`coins/${row.id}`)} key={row.id} sx={{
                                                backgroundColor: "#16171a",
                                                cursor: "pointer",
                                                "&:hover": {
                                                    backgroundColor: "#131111",
                                                },
                                                fontFamily: "Montserrat",
                                            }}>

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    sx={{
                                                        display: "flex",
                                                        gap: 5,
                                                    }}>

                                                    <img src={row?.image} alt={row.name} height={'50'} style={{ marginBottom: 10 }}></img>
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <span style={{
                                                            textTransform: 'uppercase',
                                                            fontSize: 22
                                                        }}> {row.symbol}</span>
                                                        <span style={{ color: "darkgrey" }}>
                                                            {row.name}
                                                        </span>

                                                    </div>
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {symbol}{" "}
                                                    {row.current_price >= 0.01
                                                        ? numberWithCommas(row.current_price.toFixed(2))
                                                        : row.current_price.toFixed(6)}

                                                </TableCell>
                                                <TableCell align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                        fontWeight: 500,
                                                    }}>
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%


                                                </TableCell>
                                                <TableCell align="right">


                                                    {symbol}{" "}
                                                    {currency === 'USD' ? (numberWithCommas(row.market_cap.toString().slice(0, -6)) + 'M') :
                                                        (numberWithCommas(row.market_cap.toString().slice(0, -9)) + 'B')}
                                                </TableCell>

                                            </TableRow>

                                        )
                                    })}

                                </TableBody>

                            </Table>



                        )}

                </TableContainer>
                <Pagination
                    count={Math.ceil(handleSearch().length / 10)}
                    sx={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        "& .MuiPaginationItem-root": {
                            color: "gold",
                        }
                    }}
                    shape="rounded"
                    onChange={(_, value) => setPage(value)}
                    page={page}
                />





            </Container>


        </ThemeProvider>
    )


}

export default CoinsTable