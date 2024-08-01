import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList, header } from '../config/api';
import { styled, Typography } from '@mui/material';

const Category = ({ coinList, setCoinList, setLoading }) => {
    const [category, setCategory] = useState("");

    const fetchCoinList = async () => {
        try {
            const apiString = CoinList()
            let apiWithTags = ""
            if (category) {
                apiWithTags = `${apiString}&tags[]=${category}`
            } else {
                apiWithTags = apiString
            }
           
            const { data } = await axios.get(apiWithTags, { headers: header })
            const { coins } = data.data
            return coins;
        } catch (error) {
            console.error("Error fetching coin list:", error);
            return [];
        }
    };

    const tag = {
        "All": "",
        "Meme": "meme",
        "Defi": "defi",
        "Layer 1": "layer-1",
        "Layer 2": "layer-2",
        "AI": "ai",
        "Payment": "proof-of-work"
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            let coins = await fetchCoinList();
          
            setCoinList(coins);
            setLoading(false)






        };

        fetchData();
    }, [category]);

    const Container = styled('div')(({ theme }) => ({
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "flex-start",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
        },
        flexWrap: "wrap"
    }));

    return (
        <Container>
            {Object.keys(tag).map((key) => (
                <Typography
                    key={key}
                    onClick={() => setCategory(tag[key])}
                    style={{
                        color: "white",
                        cursor: "pointer",
                        margin: "0 10px",
                        opacity: category === tag[key] ? 0.5 : 1,
                    }}
                >
                    {key}
                </Typography>
            ))}
        </Container>
    );
};

export default Category;
