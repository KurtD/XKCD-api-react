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
        <button className="latest">
          <Link to="/">Latest</Link>
        </button>
        <button className="search">
          <Link to="/search">Search</Link>
        </button>
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
  return (
    <div>
      <img className="latestImage" alt="" title="" source=""/>
    </div>
  )
}

function Search() {
  return (
    <div>
      <div>
        <input className="searchInput" type="text" />
        <button className="searchSubmit">Search</button>
      </div>
      <div>
        <img className="searchImage" alt="" title="" source=""/>
      </div>
    </div>
  )
}

export default App;
