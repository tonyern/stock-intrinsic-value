import { useState } from "react";
import SearchBar from "../search-bar/SearchBar";
import StockInfo from "../stock-info/StockInfo";

const Overlay = () => {
    const [stockOverview, setStockOverview] = useState({});
    const [stockBalanceSheet, setBalanceSheet] = useState({});
    const [stockCashFlow, setStockCashFlow] = useState({});
    const [stockIncomeStatement, setStockIncomeStatement] = useState({});
    
    return (
        <main>
            <SearchBar 
                stockOverview={setStockOverview}
                stockBalanceSheet={setBalanceSheet}
                stockCashFlow={setStockCashFlow}
                stockIncomeStatement={setStockIncomeStatement} />
            <StockInfo 
                stockOverview={stockOverview} 
                stockBalanceSheet={stockBalanceSheet}
                stockCashFlow={stockCashFlow}
                stockIncomeStatement={stockIncomeStatement} />
        </main>
    );
};

export default Overlay;