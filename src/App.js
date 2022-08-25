import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

class App extends Component {
  state = {
    persons: [
      {id: 1, name: "Max", age: 28 },
      {id: 2, name: "Manu", age: 24 },
      {id: 3, name: "Stephanie", age: 22 },
    ],
    otherState: 'some other values',
    showPersons: false
  }


  switchNameHandler = (newName) => {
    this.setState({ 
      persons: [
      { name: newName, age: 28 },
      { name: "Manu", age: 24 },
      { name: "Stephanie", age: 27 },
    ]
  })
  }

  nameChangedHandler = (event, id) => {
    
    const personIndex = this.state.persons.findIndex(p =>{
      return p.id  === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value
    
    const persons = [...this.state.persons]
    persons[personIndex]= person;
    this.setState({ 
      persons: persons
  })
  }
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  render() {
    const style={
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1x solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons= null;

    if(this.state.showPersons){
      persons=(
      <div>
        {this.state.persons.map((person, index) =>{
          return <Person
          click={()=> {this.deletePersonHandler(index)}} 
          name={person.name} 
          age={person.age}
          key={person.id}
          changed={(event)=>this.nameChangedHandler(event, person.id)} />
        })}
      </div>
      );
      style.backgroundColor = 'red';
    }

    let classes = ['red', 'bold'].join(' ');


    return (
      <div className='App'>
        <h1>Hi, I'm a React App</h1>
        <p className={classes}>This is really working!!</p>
        <button
          style={style} 
          onClick={this.togglePersonsHandler}>
            Toggle Persons </button>
        {persons}
      </div>
    );
  }
}

export default App;
