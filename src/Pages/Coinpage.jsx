import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { SingleCoin, header } from '../config/api';
import { styled, LinearProgress, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { numberWithCommas } from '../Component/Banner/Carousel';
import axios from 'axios';
import CoinInfo from '../Component/CoinInfo';

export const Coinpage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id), { headers: header }
        )
        const { coin } = data.data
   
        setCoin(coin)

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
        fontSize: "1.5rem",
        marginBottom: 20,
        fontFamily: "Montserrat",
    });

    const Description = styled('div')(({ theme }) => ({
        width: "100%",
        fontFamily: "Diatype",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
        fontSize: "1.5rem"
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
                <a href={coin.websiteUrl} target='_blank'><img
                    src={coin?.iconUrl}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                /></a>
                <Heading>
                    {coin?.name}
                </Heading>
                <Description >
                    {parse(coin?.description)}...<a href={coin.websiteUrl} target='_blank'>More</a>
                </Description>
                <MarketData>
                    <span style={{ display: "flex" }}>
                        <Typography>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography

                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {numberWithCommas(coin?.rank)}
                        </Typography>
                    </span>

                    <span style={{ display: "flex" }}>
                        <Typography>
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography

                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {" "}{Number(coin.price) >= 0.01
                                ? numberWithCommas(Number(coin.price).toFixed(2))
                                : Number(coin.price).toFixed(6)}{" $"}

                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Typography>
                            Market Cap:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography

                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {" "}  {(numberWithCommas(coin.marketCap.toString().slice(0, -6)) + 'M')
                            }{" $"}

                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Typography>
                            All time high:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography

                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {" "}{Number(coin.allTimeHigh.price) >= 0.01
                                ? numberWithCommas(Number(coin.allTimeHigh.price).toFixed(2))
                                : Number(coin.allTimeHigh.price).toFixed(6)}{" $ "}{` (${new Date(coin.allTimeHigh.timestamp * 1000).toLocaleDateString()})`}

                        </Typography>
                    </span>
                </MarketData>
            </Sidebar>
            <CoinInfo coin={coin}></CoinInfo>
        </Container>
    );


}
