import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import React from "react";
import { useState } from "react";

export const MyContext = React.createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLogIn = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={checkLogIn}>
          <Header />
          <Pages />
        </MyContext.Provider>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
