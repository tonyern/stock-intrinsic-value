import React, { useState } from 'react';
import SearchBar from "./components/search-bar/SearchBar";

const App = (): JSX.Element => {
  const [weather, setWeather] = useState({});
  const [background, setBackground] = useState("App");

  return (
    <>
      <main>
        <SearchBar searchProps={setWeather} getBackground={setBackground} />
      </main>
    </>
  );
}

export default App;
