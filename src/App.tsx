import "./App.css";
import { ProblemListPage } from "./pages/ProblemListPage";
import { Dashboard } from "./layouts/Dashboard";

function App() {
    return (
        <div className="App">
            <Dashboard>
                <ProblemListPage />
            </Dashboard>
        </div>
    );
}

export default App;
