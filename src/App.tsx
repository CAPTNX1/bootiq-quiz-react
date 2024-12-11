import "./styles/main.css";
import Router, { Switch, Route } from "crossroad";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Teams from "./pages/Teams";
import QuizBoard from "./components/QuizBoard";

function App() {
  return (
    <div className="darkmode">
      <Header />
      <main>
        <Router>
          <Switch>
            <Route path="/landing" component={Landing} />
            <Route path="/teams" component={Teams} />
            <Route path="/quizboard" component={QuizBoard} />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
