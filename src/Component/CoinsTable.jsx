import React, { useEffect, useState } from 'react'

import { numberWithCommas } from './Banner/Carousel'
import { CoinList, header } from '../config/api'
import { ThemeProvider, createTheme, } from '@mui/material/styles';
import {
    Container, Typography, TextField, TableContainer, TableHead, TableBody, Paper, LinearProgress, Table, TableRow, TableCell
    , Pagination
} from '@mui/material';
import Category from './Category';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CoinsTable = () => {
    const [coinList, setCoinList] = useState([])

    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState({ field: "", ascending: true })

    const navigate = useNavigate();

    const fetchCoinList = async () => {
        const { data } = await axios.get(CoinList(), { headers: header })
        const { coins } = data.data

        return (coins)
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCoinList();
            setCoinList(data);
            setLoading(false);
        };
        fetchData();
        setPage(1)
    }, []);
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

    }, [search, coinList])
    useEffect(() => {
        setPage(1)
        setSearch("")

    }, [coinList])


    const handleSearch = () => {
        return coinList.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase()));

    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    const headMap = {
        'Coin': 'name',
        'Price': 'price',
        '24 Change': 'change',
        'Market Cap': 'rank'
    };

    const headArray = Object.keys(headMap)

    return (
        <ThemeProvider theme={darkTheme}>
            <Container sx={{ textAlign: "center" }}>

                <Typography variant='h4' sx={{ margin: 10, fontFamily: "Montserrat", fontWeight: 600, fontSize: 50 }}>
                    Crypto Market
                </Typography>
                <Category coinList={coinList} setCoinList={setCoinList} setLoading={setLoading}></Category>
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
                                        row.change = Number(row.change)
                                        row.price = Number(row.price)
                                        const profit = row?.change

                                        return (
                                            <TableRow onClick={() => navigate(`coins/${row.uuid}`)} key={row.uuid} sx={{
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

                                                    <img src={row?.iconUrl} alt={row.name} height={'50'} style={{ marginBottom: 10 }}></img>
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

                                                    {row.price >= 0.01
                                                        ? numberWithCommas(row.price.toFixed(2))
                                                        : row.price.toFixed(6)}

                                                </TableCell>
                                                <TableCell align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                        fontWeight: 500,
                                                    }}>
                                                    {profit > 0 && "+"}
                                                    {row.change.toFixed(2)}%


                                                </TableCell>
                                                <TableCell align="right">


                                                    {" "}
                                                    {row.marketCap ? numberWithCommas((row.marketCap / 1e6).toFixed(2)) + 'M' : ""}

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