import "./stock-info.css";

// @ts-ignore
const StockInfo = ({ stockOverview, stockBalanceSheet, stockCashFlow, stockIncomeStatement }): JSX.Element => {
    const roundNumber = (value: number): number => {
        return Math.round(value * 100) / 100;
    };

    /**
     * Measures how effectively a capital is using its invested capital
     * to make money.
     * @param ebit 
     * @param marginalTaxRate 
     * @param currentLiabilities 
     * @param longTermDebt 
     * @param commonStock 
     * @param retainedEarnings 
     * @param cashFromFinancing 
     * @param cashFromInvesting 
     * @returns 
     */
    const returnOnInvestedCapital = (
        ebit: number, 
        marginalTaxRate: number,
        currentLiabilities: number, 
        longTermDebt: number, 
        commonStock: number, 
        retainedEarnings: number,
        cashFromFinancing: number,
        cashFromInvesting: number
    ): number => {
        let test = calculateNOPAT(ebit, marginalTaxRate) / investedCapital(currentLiabilities, 
            longTermDebt, commonStock, retainedEarnings, cashFromFinancing, cashFromInvesting);
        console.log("ROIC = " + test);
        return (calculateNOPAT(ebit, marginalTaxRate) / investedCapital(currentLiabilities, 
            longTermDebt, commonStock, retainedEarnings, cashFromFinancing, cashFromInvesting));
    }

    /**
     * Calculating net operating profit after taxes.
     * @param ebit Earnings before interest and taxes.
     * @param marginalTaxRate Firm's tax rate.
     * @returns 
     */
    const calculateNOPAT = (ebit: number, marginalTaxRate: number): number => {
        return (ebit * (1 - marginalTaxRate));
    };

    /**
     * Calculate invested capital of a company.
     * @param currentLiabilities 
     * @param longTermDebt 
     * @param commonStock 
     * @param retainedEarnings 
     * @param cashFromFinancing 
     * @param cashFromInvesting 
     * @returns 
     */
    const investedCapital = (
        currentLiabilities: number, 
        longTermDebt: number, 
        commonStock: number, 
        retainedEarnings: number,
        cashFromFinancing: number,
        cashFromInvesting: number): number => {
            /*let test = currentLiabilities + longTermDebt + commonStock + retainedEarnings + 
            cashFromFinancing + cashFromInvesting;
            console.log("Invested Capital = " + test);*/
        return (currentLiabilities + longTermDebt + commonStock + retainedEarnings + 
            cashFromFinancing + cashFromInvesting);
    };

    /**
     * 
     * @param operatingIncome 
     * @param interestExpense 
     * @returns Interest Coverage Ratio.
     */
    const interestCoverageRatio = (operatingIncome: number, interestExpense: number): number => {
        return (operatingIncome / interestExpense);
    };
    
    /**
     * How long would a company take to payback its debts with given parameters.
     * @param longTermDebt Debt the company has to payback within years.
     * @param operatingCashFlow How much many a company makes operating.
     * @param capitalExpenditures Money used to buy, improve, or repair assets.
     * @returns How long it would take a company to payback their debts.
     */
    const debtPaybackTime = (longTermDebt: number, operatingCashFlow: number, capitalExpenditures: number): number => {
        return (longTermDebt / calculateFreeCashFlow(operatingCashFlow, capitalExpenditures));
    };

    /**
     * Calculating free cash flow of a company.
     * @param operatingCashFlow How much many a company makes operating.
     * @param capitalExpenditures Money used to buy, improve, or repair assets.
     * @returns Free Cash Flow
     */
    const calculateFreeCashFlow = (operatingCashFlow: number, capitalExpenditures: number): number => {
        return operatingCashFlow - capitalExpenditures;
    };

    return (
        <div data-testid="stock-info-test">
            {stockOverview.Symbol !== undefined &&
            stockBalanceSheet.symbol !== undefined &&
            stockCashFlow.symbol !== undefined &&
            stockIncomeStatement.symbol !== undefined ? (
                <>
                    <div className="company-overview-box">
                        <div className="company-name">{stockOverview.Name} ({stockOverview.Symbol})</div>
                        <div className="company-about">{stockOverview.Description}</div>
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
                                    {/** Below is the earnings per share. */}
                                    <td>{roundNumber(stockOverview.EPS)}</td>
                                    {/** Below is the return on invested capital. */}
                                    {typeof stockBalanceSheet.annualReports !== undefined &&
                                    stockCashFlow.annualReports !== undefined &&
                                    stockIncomeStatement.annualReports !== undefined ? (
                                        <td>
                                            {roundNumber(returnOnInvestedCapital(
                                                stockIncomeStatement.annualReports[0].ebit,
                                                0.28,
                                                stockBalanceSheet.annualReports[0].totalCurrentLiabilities,
                                                stockBalanceSheet.annualReports[0].longTermDebt,
                                                stockBalanceSheet.annualReports[0].commonStock,
                                                stockBalanceSheet.annualReports[0].retainedEarnings,
                                                stockCashFlow.annualReports[0].cashflowFromInvestment,
                                                stockCashFlow.annualReports[0].cashflowFromFinancing
                                            ))}
                                        </td>
                                    ): (<td>N/A</td>)}
                                    {/** Below is interest coverage ratio. */}
                                    {typeof stockIncomeStatement.annualReports !== undefined ? (
                                        <td>
                                            {roundNumber(interestCoverageRatio(
                                            stockIncomeStatement.annualReports[0].operatingIncome, 
                                            stockIncomeStatement.annualReports[0].interestExpense))}
                                        </td>
                                    ): (<td>N/A</td>)}
                                    {/** Below is debt payback time. */}
                                    {typeof stockBalanceSheet.annualReports !== undefined &&
                                    typeof stockCashFlow.annualReports !== undefined ? (
                                        <td>
                                            {roundNumber(debtPaybackTime(
                                            stockBalanceSheet.annualReports[0].longTermDebt,
                                            stockCashFlow.annualReports[0].operatingCashflow,
                                            stockCashFlow.annualReports[0].capitalExpenditures))}
                                        </td>
                                    ): (<td>N/A</td>)}
                                    {/** Below is the PE Ratio. */}
                                    <td>{roundNumber(stockOverview.PERatio)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="welcome-box">
                    <div className="welcome-title">Welcome to Stock Intrinsic Value Calculator!</div>
                    <div className="welcome-subtitle">Please enter a stock ticker</div>
                </div>
            )}
        </div>
    );
};

export default StockInfo;