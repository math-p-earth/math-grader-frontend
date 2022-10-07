import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { PastPaperCard } from "./components/cards/PastPaperCard";
import { ProblemCard } from "./components/problems/ProblemCard";
import { ProblemListPage } from "./pages/ProblemListPage";

function App() {
    return (
        <div className="App">
            <PastPaperCard />
            <ProblemListPage />
        </div>
    );
}

export default App;
