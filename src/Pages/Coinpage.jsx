import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import { styled, LinearProgress, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { numberWithCommas } from '../Component/Banner/Carousel';
import axios from 'axios';
import CoinInfo from '../Component/CoinInfo';

export const Coinpage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol } = CryptoState();
    const fetchCoin = async () => {
        const response = await axios.get(SingleCoin(id)
        )
        setCoin(response.data)
    }
    useEffect(() => {
        fetchCoin()
    }, [])

    const Container = styled('div')(({ theme }) => ({
        display: "flex",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
        },
    }));

    const Sidebar = styled('div')(({ theme }) => ({
        width: "30%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey",
    }));

    const Heading = styled('div')({
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat",
    });

    const Description = styled('div')(({ theme }) => ({
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
    }));

    const MarketData = styled('div')(({ theme }) => ({
        alignSelf: "start",
        padding: 20,
        paddingTop: 5,
        width: "100%",
        [theme.breakpoints.down("md")]: {
            display: "flex",
            justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
            alignItems: "start",
        },
    }));

    // Your component code
    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <Container>
            <Sidebar>
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />
                <Heading>
                    {coin?.name}
                </Heading>
                <Description>
                    {parse(coin?.description.en.split(". ")[0])}.
                </Description>
                <MarketData>
                    <span style={{ display: "flex" }}>
                        <Heading>
                            Rank:
                        </Heading>
                        &nbsp; &nbsp;
                        <Typography

                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {numberWithCommas(coin?.market_cap_rank)}
                        </Typography>
                    </span>

                    <span style={{ display: "flex" }}>
                        <Heading>
                            Current Price:
                        </Heading>
                        &nbsp; &nbsp;
                        <Typography

                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.current_price[currency.toLowerCase()]
                            )}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Heading>
                            Market Cap:
                        </Heading>
                        &nbsp; &nbsp;
                        <Typography

                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {symbol}{" "}
                            {currency === 'USD' ? (numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)) + 'M') :
                                (numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -9)) + 'B')}
                        </Typography>
                    </span>
                </MarketData>
            </Sidebar>
            <CoinInfo coin={coin}></CoinInfo>
        </Container>
    );


}