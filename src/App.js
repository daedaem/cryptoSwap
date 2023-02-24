import React from "react";
import Home from "./components/Pages/Home/Home";
import CurrencyProvider from "./store/CurrencyProvider";

function App() {
  return (
    <main>
      <CurrencyProvider>
        <Home />
      </CurrencyProvider>
    </main>
  );
}
export default App;
