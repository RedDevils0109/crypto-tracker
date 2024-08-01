import { useEffect, useState } from "react";
import { HistoricalChart, header } from "../config/api";
import chartDays from "../config/data";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,

} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,

);

import { CircularProgress, Button } from "@mui/material";
import axios from "axios";

const CoinInfo = ({ coin }) => {
    const [historicalData, setHistoricalData] = useState([]);
    const [days, setDays] = useState('24h');
    const [coinPrice, setCoinPrice] = useState([]);
    const [coinTimeStamp, setCoinTimeStamp] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchHistoricalData = async () => {
            try {
                console.log("Fetching data for days:", days);
                setLoading(true)
                const { data } = await axios.get(HistoricalChart(coin.uuid, days), { headers: header });
                const { history } = data.data;
                console.log("Fetched history:", history);
                setHistoricalData(history);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching historical data:", error);
            }
        };


        fetchHistoricalData();

    }, [days]);

    useEffect(() => {
        if (historicalData.length > 0) {
            const prices = historicalData.map((entry) => entry.price);
            const timestamps = historicalData.map((entry) => {
                const date = new Date(entry.timestamp * 1000);
                return days === '24h'
                    ? date.toLocaleTimeString()
                    : date.toLocaleDateString();
            });
            setCoinPrice(prices);
            setCoinTimeStamp(timestamps);
        }
    }, [historicalData, days]);

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
                tension: 0.1,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: "Price in USD"
            },
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                reverse: true,

            },
            y: {

                title: {
                    display: true,
                    text: 'Price in USD'
                }
            }
        }
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const ChartContainer = styled('div')(({ theme }) => ({
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        }
    }));

    return (
        <ThemeProvider theme={darkTheme}>
            <ChartContainer>
                {loading ? (
                    <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
                ) : (
                    <>
                        <Line data={data} options={options} />
                        <div
                            style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            {chartDays.map((day) => (
                                <Button
                                    key={day.value}
                                    variant="outlined"
                                    onClick={() => setDays(day.value)}
                                    sx={{
                                        borderColor: 'gold',
                                        backgroundColor: days === day.value ? 'gold' : "transparent",
                                    }}
                                >
                                    {day.label}
                                </Button>
                            ))}
                        </div>
                    </>
                )}
            </ChartContainer>
        </ThemeProvider>
    );
};

export default CoinInfo;
