import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
              <Link to="/">Latest</Link>
              <Link to="/search">Search</Link>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/">
            <Latest />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Latest() {
  return <h2>Latest</h2>;
}

function Search() {
  return <h2>Search</h2>;
}

export default App;
