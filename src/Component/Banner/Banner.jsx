import React from "react";
import { Container, Typography } from "@mui/material";
import Carousel from "./Carousel";

function Banner() {
    const bannerStyle = {
        backgroundImage: "url(./banner2.jpg)",
        backgroundSize: "cover",
    };

    const bannerContentStyle = {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    };

    const taglineStyle = {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    };

    const headingStyle = {
        fontWeight: "bold",
        marginBottom: 5,
        fontFamily: "Monospace",
        color: 'gold'
    };
    const heading2Style = {
        fontWeight: "bold",
        margin: '10px 0',
        fontFamily: "Montserrat"
    }

    const subtitleStyle = {
        color: "darkgrey",
        textTransform: "capitalize",
        fontFamily: "Montserrat",
        marginBottom: '30px'
    };

    return (
        <div style={bannerStyle}>
            <Container style={bannerContentStyle}>
                <div style={taglineStyle}>
                    <Typography variant="h2" style={headingStyle}>
                        Crypto Tracker
                    </Typography>
                    <Typography variant="subtitle2" style={subtitleStyle}>
                        Get all the Info regarding your favorite Crypto Currency
                    </Typography>
                    <Typography variant="h4" style={heading2Style}>Trending</Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    );
}

export default Banner;
