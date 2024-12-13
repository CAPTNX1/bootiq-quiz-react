import "./styles/main.css";
import Router, { Switch, Route } from "crossroad";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import Teams from "./pages/Teams";
import QuizBoard from "./components/QuizBoard";
import Tree from "./assets/tree.jpeg";

function App() {
  return (
    <div className="">
      <Header />
      <main>
        <img src={Tree} width={900} className="tree" />
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
