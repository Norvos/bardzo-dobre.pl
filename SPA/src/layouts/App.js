import React from 'react';
import '../styles/App.css';
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Page from "./Page";

function App() {
  return (
    <div className="text-center">
        <BrowserRouter>
            <Navigation />
            <Page />
        </BrowserRouter>
    </div>
  );
}

export default App;
