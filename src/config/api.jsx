
export const CoinList = () =>
    `https://coinranking1.p.rapidapi.com/coins?order=rank&limit=200&tiers[]=1`;


export const SingleCoin = (id) =>
    `https://coinranking1.p.rapidapi.com/coin/${id}`
export const HistoricalChart = (id, time) =>
    `https://coinranking1.p.rapidapi.com/coin/${id}/history?timePeriod=${time}`
export const header = {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": "ec18803aebmsh8ff570157caf8fep1015b8jsnb884088cd04a"
}