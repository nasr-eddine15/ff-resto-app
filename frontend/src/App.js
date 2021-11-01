import { BrowserRouter, Link, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RestarauntPage from "./pages/RestarauntPage";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="Row">
          <div>
            <Link className="brand" to="/">
              skiptheplates
            </Link>
          </div>
          <div>
            <Link className="signout">Sign Out</Link>
          </div>
        </header>
        <main>
          <Route path="/" component={HomePage} exact></Route>
          <Route
            path="/restaraunt/:id?"
            component={RestarauntPage}
            exact
          ></Route>
        </main>
        <footer className="Row center">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
