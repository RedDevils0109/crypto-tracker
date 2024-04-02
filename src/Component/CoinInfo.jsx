import { useEffect, useState } from "react"
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import chartDays from "../config/data";
import { useParams } from "react-router-dom";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { Line } from "react-chartjs-2";
import { CircularProgress, Button } from "@mui/material";
import axios from "axios";

import { Dataset } from "@mui/icons-material";

const CoinInfo = ({ coin }) => {

    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1)


    const { currency } = CryptoState()
    console.log(coin.id, days, currency)
    const fetchHistoricalData = async () => {

        const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
        setHistoricalData(data.prices)
    }
    useEffect(() => {
        fetchHistoricalData()
    }, [currency, days])
    useEffect(() => {
        console.log(historicalData);
    }, [historicalData]);
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
                {!historicalData ? (
                    <CircularProgress style={{ color: "gold" }}
                        size={250}
                        thickness={1} />
                ) : (

                    <>
                        <Line data={{
                            labels: historicalData.map((coin) => {
                                let date = new Date(coin[0])
                                let time =
                                    date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`
                                console.log(time)
                                return days === 1 ? time : date.toLocaleDateString();
                            }),
                            datasets: [
                                {
                                    data: historicalData.map((coin) => coin[1]),
                                    label: `Price (Past ${days} days) in ${currency}`,
                                    borderColor: 'gold'
                                }

                            ]
                        }

                        } options={{

                            elements: {
                                point: {
                                    radius: 1
                                }
                            }
                        }}

                        >

                        </Line>
                        <div
                            style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            {chartDays.map((day) => (
                                <Button variant="outlined" onClick={() => setDays(day.value)} sx={{
                                    borderColor: 'gold',
                                    backgroundColor: days === day.value ? 'gold' : "transparent"
                                }
                                }>{day.label}</Button>
                            ))}

                        </div>


                    </>



                )}
            </ChartContainer>


        </ThemeProvider>
    )
}
export default CoinInfo