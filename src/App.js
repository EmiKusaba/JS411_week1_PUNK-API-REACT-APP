import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
    };
  }

  fetchData() {
    // Only need to fetch if there is no data already
    if(this.state.beers.length > 0) {
      return;
    }

    fetch("https://api.punkapi.com/v2/beers")
    .then(response => response.json())
    .then(json => this.setState({
      beers: json,
    }))
    .catch(error => console.log(`parsing failed ${error}`));
  }

  handleClick(i) {
    const beers = this.state.beers.slice();
    beers[i].like = !beers[i].like;
    console.log(beers[i].like);
    this.setState({
      beers: beers,
    });
  }

  render() {
    this.fetchData();

    const beerDom = this.state.beers.map((val, i) => {
      return (
        <Beer id={val.id} key={val.id} name={val.name} image={val.image_url} like={val.like} 
          onClick={e => this.handleClick(i)}
        />
      );
    });

    return (
      <div>
        {beerDom}
      </div>
    )
  }
}

class Beer extends React.Component {
  render() {

    const likeButtonColor = this.props.like ? "green" : "white";

    return (
      <div className="beer" id={`beer-${this.props.id}`}>
          <img src={this.props.image} style={{width: "20%", height: "20%"}}></img>
          <h4>{this.props.name}</h4>
          <button style={{backgroundColor: likeButtonColor}}
            onClick={this.props.onClick}
          >Like</button>
      </div>
    )
  }
}

export default App;
