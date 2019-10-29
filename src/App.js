import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  render() {
    const URL = "https://xkcd.now.sh/?comic=";
    return (
      <Router>
        <Navigation />
          <Switch>
            <Route path="/search">
              <Search apiEndpoint={URL}/>
            </Route>
            <Route path="/">
              <Latest apiEndpoint={URL + "latest"}/>
            </Route>
          </Switch>
      </Router>
    );
  }
}

function Navigation(){
  return(
    <nav>
      <button className="latest">
        <Link to="/">Latest</Link>
      </button>
      <button className="search">
        <Link to="/search">Search</Link>
      </button>
    </nav>
  );
}

class Latest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }
  componentDidMount() {
    fetch('https://xkcd.now.sh/?comic=latest')
      .then(response => response.json())
      .then(data => this.setState({ data: data}));
  }
  render(){
    const { data } = this.state;
    console.log(data);
    return(
      <div>
        <img className="latestImage" alt={data.alt} title={data.title} src={data.img} />
      </div>
    )
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleClick = () => {
    //this.setState({isLoaded: false});
    fetch('https://xkcd.now.sh/?comic=' + this.state.value)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  render(){
    const { data } = this.state;
    return (
      <div>
        <div>
          <input className="searchInput" type="text" value={this.state.value} onChange={this.handleChange}/>
          <button className="searchSubmit" onClick={this.handleClick}>Search</button>
        </div>
        <div>
          <img className="searchImage" alt={data.alt} title={data.title} src={data.img}/>
        </div>
      </div>
    )
  }
}

export default App;
