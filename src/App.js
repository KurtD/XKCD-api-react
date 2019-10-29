import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {

render() {
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

}

class Latest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoaded: false,
    };
  }
  componentDidMount() {
    fetch('https://xkcd.now.sh/?comic=latest')
      .then(response => response.json())
      .then(data => this.setState({ data: data, isLoaded: true }));
  }
  render(){
    const { data, isLoaded } = this.state;
    if (!isLoaded){
      return(
        <div>Loading...</div>
      )
    } else {
      console.log(data.img);
      return(
        <div>
          <img className="latestImage" alt="" title="" src={data.img} />
        </div>
      )
    }
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoaded: false,
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleClick = () => {
    fetch('https://xkcd.now.sh/?comic=' + this.state.value)
      .then(response => response.json())
      .then(data => this.setState({ data: data, isLoaded: true }));
  }

  render(){
    const { data, isLoaded } = this.state;
    if (!isLoaded) {
      return (
        <div>
          <div>
            <input className="searchInput" type="text" value={this.state.value} onChange={this.handleChange}/>
            <button className="searchSubmit" onClick={this.handleClick}>Search</button>
          </div>
          <div>
            <img className="searchImage" alt="" title="" src=""/>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <input className="searchInput" type="text" value={this.state.value} onChange={this.handleChange}/>
            <button className="searchSubmit" onClick={this.handleClick}>Search</button>
          </div>
          <div>
            <img className="searchImage" alt="" title="" src={data.img}/>
          </div>
        </div>
      )
    }
  }

}

export default App;
