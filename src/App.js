import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './index.css';

function App() {
  const URL = "https://xkcd.now.sh/?comic=";
  return (
    <Router>
        <Link to="/" className="latest">Latest</Link>
        <Link to="/search" className="search">Search</Link>
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
    return(
      <div className="padTen">
        <BonusPoints title={data.safe_title} date={data.month + "/" + data.day + "/" + data.year}/>
        <div>
          <img className="latestImage" alt={data.title} title={data.alt} src={data.img} />
        </div>
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
      <div className="padTen">
        <div>
          <input className="searchInput" type="text" placeholder="(1 - 2219)" value={this.state.value} onChange={this.handleChange}/>
          <button className="searchSubmit" onClick={this.handleClick}>Search</button>
        </div>
        <BonusPoints title={data.safe_title} date={data.month + "/" + data.day + "/" + data.year}/>
        <div>
          <img className="searchImage" alt={data.title} title={data.alt} src={data.img}/>
        </div>
      </div>
    )
  }
}

function BonusPoints(props){
  if (props.title != null) {
    return (
        <div className="bonus">
          <div id="title">{props.title}</div>
          <div id="date">{props.date}</div>
        </div>
    );
  } else {
    return(<div></div>)
  }
}

export default App;
