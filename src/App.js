import React from "react";
import "./Styles/App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { EMiPage } from "./Pages/EMiPage";
import { CreditCardPage } from "./Pages/CreditCardPage";
import { LoanPage } from "./Pages/LoanPage";
import { Header } from "./Component/Comman/Header";
import { Footer } from "./Component/Comman/Footer";
import { Loader } from "./Component/Comman/Loader";
import { ProgressBar } from "./Component/Comman/Loader";
const App = () => {
  let location = useLocation();
  const [ClassVal, setClassval] = React.useState("EMiPage");
  const [isLoading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);

  React.useEffect(() => {
    if (location.pathname === "/") {
      setClassval("EMiPage");
    }
    if (location.pathname === "/loanpage") {
      setClassval("loanpage");
    }
    if (location.pathname === "/creditcardpage") {
      setClassval("creditcardpage");
    }
  }, [ClassVal, location]);
  return (
    <>
      <div className={`MyApp_main_wrapper ${ClassVal}`}>
        {isLoading ? (
          <>
            <ProgressBar />
            <Header />
            <Routes>
              <Route exact index path="/" element={<EMiPage />} />
              <Route exact path="/loanpage" element={<LoanPage />} />
              <Route
                exact
                path="/creditcardpage"
                element={<CreditCardPage />}
              />
            </Routes>
            <Footer />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default App;
