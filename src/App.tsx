import { useState } from 'react';
import SearchBar from "./components/search-bar/SearchBar";
import StockInfo from "./components/stock-info/StockInfo";

const App = (): JSX.Element => {
  const [stock, setStock] = useState({});

  return (
    <>
      <main>
        <SearchBar searchProps={setStock} />
        <StockInfo stockData={stock} />
      </main>
    </>
  );
};

export default App;
