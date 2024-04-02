import 'react-alice-carousel/lib/alice-carousel.css';
import axios from "axios";
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        console.log(data);
        setTrending(data);
    };

    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);


    const carousel = {
        height: "50%",
        display: "flex",
        alignItems: "center",
        flexWarp: 'warp'

    }
    const carouselItem = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
    }



    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;

        return (
            <Link style={carouselItem} to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {coin.current_price >= 0.01
                        ? numberWithCommas(coin.current_price.toFixed(2))
                        : coin.current_price.toFixed(6)}
                </span>
            </Link>
        );
    });
    const renderPrevButton = () => (
        <Button sx={{ marginRight: '10px' }} variant='text'><ArrowBackIosIcon></ArrowBackIosIcon></Button>
    );


    const renderNextButton = () => (
        <Button sx={{ marginLeft: '10px' }} variant='text' ><ArrowForwardIosIcon></ArrowForwardIosIcon></Button>
    );



    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <div style={carousel}>



            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={2000}
                animationDuration={1000}
                disableDotsControls
                renderPrevButton={renderPrevButton}
                renderNextButton={renderNextButton}
                responsive={responsive}
                items={items}
                autoPlay
            />


        </div>
    );
};

export default Carousel;