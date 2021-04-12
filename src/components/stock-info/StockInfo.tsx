import "./stock-info.css";

// @ts-ignore
const StockInfo = ({ stockOverview }): JSX.Element => {
    const roundNumber = (value: number): number => {
        return Math.round(value);
    };

    return (
        <div data-testid="stock-info-test">
            {stockOverview.Symbol !== undefined ? (
                <>
                    <div className="company-overview-box">
                        <h1>{stockOverview.Name} ({stockOverview.Symbol})</h1>
                        <p>{stockOverview.Description}</p>
                    </div>
                    <div className="company-key-metrics-box">
                        <table className="company-key-metrics">
                            <tbody>
                                <tr>
                                    <th>EPS</th>
                                    <th>Return on Invested Capital (ROIC)</th>
                                    <th>Interest Coverage Ratio</th>
                                    <th>Debt Payback Time</th>
                                    <th>PE Ratio</th>
                                </tr>
                                <tr>
                                    <td>{stockOverview.EPS}</td>
                                    <td>0.0</td>
                                    <td>0.0</td>
                                    <td>0.0</td>
                                    <td>{stockOverview.PERatio}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <>
                    <h1>Welcome to Stock Intrinsic Value Calculator!</h1>
                    <h3>Please enter a stock ticker</h3>
                </>
            )}
        </div>
    );
};

export default StockInfo;