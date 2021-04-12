import "./stock-info.css";

// @ts-ignore
const StockInfo = ({ stockData }): JSX.Element => {
    const roundNumber = (value: number): number => {
        return Math.round(value);
    }

    return (
        <>
            <div className="company-overview-box">
                <h1>{stockData.Name} ({stockData.Symbol})</h1>
                <p>{stockData.Description}</p>
            </div>
            <div className="company-key-metrics-box">
                <h4>Earnings Per Share (EPS) = {roundNumber(stockData.EPS)}</h4>
                <h4>Price/Earnings Ratio (PE) = {roundNumber(stockData.PERatio)}</h4>
            </div>
        </>
    )
}

export default StockInfo;