import React, { useState } from 'react';
import SearchBar from "./components/search-bar/SearchBar";

const App = (): JSX.Element => {
  const [stock, setStock] = useState({});

  return (
    <>
      <main>
        <SearchBar searchProps={setStock} />
      </main>
    </>
  );
}

export default App;
