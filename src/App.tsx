import { useState } from 'react';
import SearchBar from "./components/search-bar/SearchBar";
import StockInfo from "./components/stock-info/StockInfo";

const App = (): JSX.Element => {
  const [stockOverview, setStockOverview] = useState({});

  return (
    <>
      <main>
        <SearchBar searchProps={setStockOverview} />
        <StockInfo stockOverview={stockOverview} />
      </main>
    </>
  );
};

export default App;
