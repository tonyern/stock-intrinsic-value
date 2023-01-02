import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import "./search-bar.css";

interface SearchBarInterface {
  stockOverview: React.Dispatch<React.SetStateAction<{}>>;
  stockBalanceSheet: React.Dispatch<React.SetStateAction<{}>>;
  stockCashFlow: React.Dispatch<React.SetStateAction<{}>>;
  stockIncomeStatement: React.Dispatch<React.SetStateAction<{}>>;
};

const SearchBar = ({ 
    stockOverview, 
    stockBalanceSheet, 
    stockCashFlow, 
    stockIncomeStatement }: SearchBarInterface): JSX.Element => {
  
  const { REACT_APP_ALPHA_VANTAGE_ACCESS_KEY } = process.env;
  const alphaVantageAPI = "https://www.alphavantage.co/query?";

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  /**
   * Make API request if keyboard pressed is "enter".
   * @param event Tracking keyboard presses.
   */
  const search = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      getOverview();
      getBalanceSheet();
      getCashFlow();
      getIncomeStatement();

      // Exit search function if data from overview is empty. No use in making other API calls.
      if(invalid)
      {
        setQuery("");
        setInvalid(false);
        return;
      }
      
      setQuery("");
    }
  };

  const getOverview = (): void => {
    axios
        .get(
          `${alphaVantageAPI}function=OVERVIEW&symbol=${query}&apikey=${REACT_APP_ALPHA_VANTAGE_ACCESS_KEY}`
        )
        .then((response: AxiosResponse<any>) => {
          setInvalid(true); // There is a response based on stock ticker so valid.
          stockOverview(response.data);
          //console.log("OVERVIEW");
          console.log(response.data);
        })
        .catch((error: any) => {
          // Error if stock name was not found or invalid input.
          if (error.response) console.log(error.response.data);
          
          // Error if no response was received.
          if (error.request) console.log(error.request);

          // Other errors.
          console.log(error.message);
        });
  };

  const getBalanceSheet = (): void => {
    axios
        .get(
          `${alphaVantageAPI}function=BALANCE_SHEET&symbol=${query}&apikey=${REACT_APP_ALPHA_VANTAGE_ACCESS_KEY}`
        )
        .then((response: AxiosResponse<any>) => {
          stockBalanceSheet(response.data);
          //console.log("BALANCE SHEET");
          //console.log(response.data);
        })
        .catch((error: any) => {
          // Error if stock name was not found or invalid input.
          if (error.response) console.log(error.response.data);
          
          // Error if no response was received.
          if (error.request) console.log(error.request);

          // Other errors.
          console.log(error.message);
        });
  };

  const getCashFlow = (): void => {
    axios
        .get(
          `${alphaVantageAPI}function=CASH_FLOW&symbol=${query}&apikey=${REACT_APP_ALPHA_VANTAGE_ACCESS_KEY}`
        )
        .then((response: AxiosResponse<any>) => {
          stockCashFlow(response.data);
          //console.log("CASH FLOW");
          //console.log(response.data);
        })
        .catch((error: any) => {
          // Error if stock was not found or invalid input.
          if (error.response) console.log(error.response.data);
          
          // Error if no response was received.
          if (error.request) console.log(error.request);

          // Other errors.
          console.log(error.message);
        });
  };

  const getIncomeStatement = (): void => {
    axios
        .get(
          `${alphaVantageAPI}function=INCOME_STATEMENT&symbol=${query}&apikey=${REACT_APP_ALPHA_VANTAGE_ACCESS_KEY}`
        )
        .then((response: AxiosResponse<any>) => {
          stockIncomeStatement(response.data);
          //console.log("INCOME STATEMENT");
          //console.log(response.data);
        })
        .catch((error: any) => {
          // Error if stock was not found or invalid input.
          if (error.response) console.log(error.response.data);
          
          // Error if no response was received.
          if (error.request) console.log(error.request);

          // Other errors.
          console.log(error.message);
        });
  };

  return (
    <div className="search-box">
      <input
        type="text"
        ref={inputRef}
        className="search-bar"
        data-testid="search-input-test"
        placeholder="Search Stock Ticker"
        onChange={(event) => setQuery(event.target.value)}
        value={query}
        onKeyPress={(event: React.KeyboardEvent<HTMLDivElement>) => search(event)}
      />
    </div>
  );
};

export default SearchBar;
