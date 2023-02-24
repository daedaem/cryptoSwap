import React from "react";
import Home from "./components/Pages/Home/Home";
import CurrencyProvider from "./store/CurrencyProvider";

function App() {
  return (
    <CurrencyProvider>
      <main>
        <Home />
      </main>
    </CurrencyProvider>
  );
}
export default App;
