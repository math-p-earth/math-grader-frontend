import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { PastPaperCard } from "./components/cards/PastPaperCard";
import { ProblemCard } from "./components/problems/ProblemCard";

function App() {
    return (
        <div className="App">
            <PastPaperCard />

            <ProblemCard />
        </div>
    );
}

export default App;
