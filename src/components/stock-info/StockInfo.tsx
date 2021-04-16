import "./stock-info.css";

// @ts-ignore
const StockInfo = ({ stockOverview, stockBalanceSheet, stockCashFlow, stockIncomeStatement }): JSX.Element => {
    /**
     * Rounds a number to the next two decimal spots.
     * @param value Number to round.
     * @returns A number with two decimal spots.
     */
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
        // Alpha Vantage API has some "None" fields.
        // Check for those and return 0 as not valid.
        if (ebit.toString() === "None" ||
        marginalTaxRate.toString() === "None" ||
        currentLiabilities.toString() === "None" ||
        longTermDebt.toString() === "None" ||
        commonStock.toString() === "None" ||
        retainedEarnings.toString() === "None" ||
        cashFromFinancing.toString() === "None" ||
        cashFromInvesting.toString() === "None") {
            return 0;
        }

        return (calculateNOPAT(ebit, marginalTaxRate) / investedCapital(currentLiabilities, 
            longTermDebt, commonStock, retainedEarnings, cashFromFinancing, cashFromInvesting));
    };

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
        // Alpha Vantage API has some "None" fields.
        // Check for those and return 0 as not valid.
        if (operatingIncome.toString() === "None" ||
            interestExpense.toString() === "None") {
            return 0;
        }

        // Uncomment below for debugging purposes.
        /*console.log("Operating Income = " + operatingIncome);
        console.log("Interest Expense = " + interestExpense);
        console.log("Interest Coverage Ratio = " + (operatingIncome / interestExpense));*/

        return operatingIncome / interestExpense;
    };
    
    /**
     * How long would a company take to payback its debts with given parameters.
     * @param longTermDebt Debt the company has to payback within years.
     * @param operatingCashFlow How much many a company makes operating.
     * @param capitalExpenditures Money used to buy, improve, or repair assets.
     * @returns How long it would take a company to payback their debts.
     */
    const debtPaybackTime = (longTermDebt: number, operatingCashFlow: number, capitalExpenditures: number): number => {
        // Alpha Vantage API has some "None" fields.
        // Check for those and return 0 as not valid.
        if (longTermDebt.toString() === "None" ||
            operatingCashFlow.toString() === "None" ||
            capitalExpenditures.toString() === "None") {
            return 0;
        }

        // Uncomment below for debugging purposes.
        /*console.log("Long Term Debt = " + longTermDebt);
        console.log("Free Cash Flow = " + (calculateFreeCashFlow(operatingCashFlow, capitalExpenditures)));
        console.log("Debt Payback Time = " + (longTermDebt / calculateFreeCashFlow(operatingCashFlow, capitalExpenditures)));*/
        
        return (longTermDebt / calculateFreeCashFlow(operatingCashFlow, capitalExpenditures));
    };

    /**
     * Calculating free cash flow of a company.
     * @param operatingCashFlow How much many a company makes operating.
     * @param capitalExpenditures Money used to buy, improve, or repair assets.
     * @returns Free Cash Flow
     */
    const calculateFreeCashFlow = (operatingCashFlow: number, capitalExpenditures: number): number => {
        // Uncomment below for debugging purposes.
        /*console.log("Operating Cash Flow = " + operatingCashFlow);
        console.log("Capital Expenditures = " + capitalExpenditures);
        console.log("Free Cash Flow = " + (operatingCashFlow - capitalExpenditures));*/

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
                        <div className="metrics-title">
                            <u>Intrinsic Value Metrics</u> ({stockOverview.LatestQuarter})
                        </div>
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
                                    {stockOverview.EPS.toString() !== "None" ?
                                    (<td>{roundNumber(stockOverview.EPS)}</td>) : (<td>0</td>)}
                                    {/** Below is the return on invested capital. */}
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
                                    {/** Below is interest coverage ratio. */}
                                    <td>
                                        {roundNumber(interestCoverageRatio(
                                        stockIncomeStatement.annualReports[0].operatingIncome, 
                                        stockIncomeStatement.annualReports[0].interestExpense))}
                                    </td>
                                    {/** Below is debt payback time. */}
                                    <td>
                                        {roundNumber(debtPaybackTime(
                                        stockBalanceSheet.annualReports[0].longTermDebt,
                                        stockCashFlow.annualReports[0].operatingCashflow,
                                        stockCashFlow.annualReports[0].capitalExpenditures))}
                                    </td>
                                    {/** Below is the PE Ratio. */}
                                    {stockOverview.PERatio.toString() !== "None" ?
                                    (<td>{roundNumber(stockOverview.PERatio)}</td>) : (<td>0</td>)}
                                </tr>
                                <tr>
                                    <td></td>
                                        {roundNumber(returnOnInvestedCapital(
                                            stockIncomeStatement.annualReports[0].ebit,
                                            0.28,
                                            stockBalanceSheet.annualReports[0].totalCurrentLiabilities,
                                            stockBalanceSheet.annualReports[0].longTermDebt,
                                            stockBalanceSheet.annualReports[0].commonStock,
                                            stockBalanceSheet.annualReports[0].retainedEarnings,
                                            stockCashFlow.annualReports[0].cashflowFromInvestment,
                                            stockCashFlow.annualReports[0].cashflowFromFinancing
                                        )) >= 10 ?
                                    (<td>(Effective)</td>) : (<td>(Not Effective)</td>)}
                                        {roundNumber(interestCoverageRatio(
                                            stockIncomeStatement.annualReports[0].operatingIncome, 
                                            stockIncomeStatement.annualReports[0].interestExpense)) >= 6 ?
                                    (<td>(Low Debt)</td>) : (<td>(High Debt)</td>)}
                                        {roundNumber(debtPaybackTime(
                                            stockBalanceSheet.annualReports[0].longTermDebt,
                                            stockCashFlow.annualReports[0].operatingCashflow,
                                            stockCashFlow.annualReports[0].capitalExpenditures)) >= 3 ||
                                                debtPaybackTime(
                                                stockBalanceSheet.annualReports[0].longTermDebt,
                                                stockCashFlow.annualReports[0].operatingCashflow,
                                                stockCashFlow.annualReports[0].capitalExpenditures) < 0 ?
                                    <td>(Long Time)</td> : (<td>(Short Time)</td>)}
                                        {roundNumber(stockOverview.PERatio) >= 15 || 
                                            roundNumber(stockOverview.PERatio) < 0 ? 
                                            (<td>(Expensive)</td>) : (<td>(Cheap)</td>)}
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