import React, {Component} from 'react';
//import logo from './logo.svg';
import {CardList} from './component/card-list/card-list.comp';
import './App.css';
import {SearchBox} from './component/search-box/search-box.comp';

class App extends Component {  
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchText : ''
    };
  }

  componentDidMount(){
    fetch('http://localhost:3000/users.json')
      .then(response => response.text())
      .then(text => {
        try{
          const users = JSON.parse(text);
          this.setState({monsters: users});
        }catch{
          fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({monsters: users}));
        }
      });
  }

  searchHandler = (e) => {
    this.setState({ searchText: e.target.value})
  }

  render(){
    const {monsters, searchText} = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchText.toLowerCase()));
    
    return (
      <div className="App">
        <h1>monsters mf</h1>
        <SearchBox placeholder='search something mf...' changeHandler={this.searchHandler} />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }  
}

export default App;