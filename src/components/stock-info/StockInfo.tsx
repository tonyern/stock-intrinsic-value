import "./stock-info.css";

// @ts-ignore
const StockInfo = ({ stockData }): JSX.Element => {
    return (
        <>
            <h1>{stockData.symbol}</h1>
        </>
    )
}

export default StockInfo;