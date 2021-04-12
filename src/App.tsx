import { useState } from 'react';
import SearchBar from "./components/search-bar/SearchBar";
import StockInfo from "./components/stock-info/StockInfo";

const App = (): JSX.Element => {
  const [stockOverview, setStockOverview] = useState({});
  const [stockBalanceSheet, setBalanceSheet] = useState({});
  const [stockCashFlow, setStockCashFlow] = useState({});
  const [stockIncomeStatement, setStockIncomeStatement] = useState({});

  return (
    <>
      <main>
        <SearchBar searchProps={setStockOverview} />
        <StockInfo 
          stockOverview={stockOverview} 
          stockBalanceSheet={stockBalanceSheet}
          stockCashFlow={stockCashFlow}
          stockIncomeStatement={stockIncomeStatement} />
      </main>
    </>
  );
};

export default App;
