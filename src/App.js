import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

// import theme context....
import ThemeContextProvider from "./context/ThemeContextProvider";

//import components...
import Navbar from "./components/shared/Navbar";
import Main from "./components/Main";
import Coin from "./components/shared/Coin";
import LoginBigPage from "./components/shared/LoginBigPage";

import { getCoins } from "./api";
import Signup from "./components/Signup";

function App() {
  const [data, setData] = useState([]);
  const [testInterval, setTestInterval] = useState(false);

  const changeInterval = () => {
    setTimeout(() => {
      setTestInterval(!testInterval);
    }, 30000);
  };

  useEffect(() => {
    const fetchApi = async () => {
      setData(await getCoins());
    };
    changeInterval();
    fetchApi();
  }, [testInterval]);
  return (
    <ThemeContextProvider>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/coin/:id" component={Coin} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={LoginBigPage} />
          <Route path="/" component={() => <Main data={data} />} />
          
        </Switch>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
