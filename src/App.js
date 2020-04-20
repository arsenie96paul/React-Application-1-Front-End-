import React, { Component } from 'react';
//import FirstComponent from './components/LearningExamples/FirstComponent';
//import SecondComponent from './components/LearningExamples/SecondComponent';
//import ThirdComponent from './components/LearningExamples/ThirdComponent';
import Counter  from './components/Counter/Counter';
import TodoApp from './components/todo/ToDoApp';
import './bootstrap.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Counter /> */}
        <TodoApp/>
      </div>
    );
  }
}
export default App;
