# About

Stock Intrinsic Value is a program where user enters a stock ticker of any publicly traded company and ceives financial statistics. Financial statistics are Earnings Per Share (EPS), Return on Invested Capital (ROIC), Price-to-Earnings (PE) Ratio, Debt Payback Time and Invest Coverage Ratio. Info about the company is included as well.

# Technologies Used

Developed within Visual Studio Code. Languages used are JavaScript and TypeScript. React is used as the front-end library to build out app components. Makes use of financial APIs such as Alpha Vantage to get stock information when requested by user. Axios is used to fetch data from API.

# Instructions on How to Use App

Using it is simple, enter in a stock ticker of a publicly-traded company. You can do a search on the search engine typing in -----> "{company} stock ticker" to get the ticker. Navigate back to the app and enter that ticker into the search bar and hit enter.\

After hitting enter, you are presented with the company name, stock ticker, company summary on what they do, and financial metrics. The meat here is understanding the financial metrics which will be explained below.\

## How to Read and Understand the Financial Metrics

### `EPS`

EPS, or Earnings per Share, is the company's profits divided by the number of shares it has of its common stock. The higher EPS is, the more profitable the company is considered. You would want to see an upward trending EPS when looking at past financial documents to today.

### `ROIC`

ROIC, or Return on Invested Capital, is a measure of how effective a company is at using its capital to generate more profits. You would want to see a ROIC of 10% or over. The higher the better.

### `Interest Coverage Ratio`

Interest Coverage Ratio is about debt. This metric measures how much operating income a company generates relative to its interest expense. You would want to see a ratio of 6 or over. The higher the better. Being a 6 or higher is good as debt won't be a huge concern.

### `Debt Payback Time`

Debt Payback Time measures how long would it take for a company to payback all debts. You would want to see it being 3 years or less. If higher, then the company has too much debt and would take too long to get out of debt.

### `PE Ratio`

PE Ratio, Price to Earnings Ratio, compares the current trading price with its recently reported earnings per share. The metric tells you how cheap or expensive a stock is. A PE Ratio of 15 or under means a stock is cheap. A PE Ratio over 15 means a stock is expensive.

# Disclaimer

I, the developer of this app, am not a financial advisor. This app does not tell you whether or not to invest in a company based on the financial metrics. It tells you if a company is worth looking into or not. If it is worth looking into, then do more research into the company before investing.

# What the App Looks Like

![Screenshot of Stock Intrinsic Value App](https://github.com/tonyern/stock-intrinsic-value/blob/master/public/stock-intrinsic-value-app.png)
