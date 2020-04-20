import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

class Counter extends Component{

    // Define the initial state in a constructor
    constructor(){
        super(); // Error 1 !!!

        this.state = {
            counter : 0,
        }
 
        // Bind Funtion!!!
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    render() {
        return (
          <div className="counter">
            
            <CounterButton incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <span className="count">{this.state.counter}</span>
            <div>
                <button className="reset" onClick={this.reset}>Reset</button>
                </div>
          </div>
        );
      }

    reset(){
        this.setState(
            ()=>{
                return {counter: 0}
            });        
    }    

    increment(by){
        //console.log(`increment from parent - ${by}`)
        this.setState(
            (previousState)=>{
                return {counter: previousState.counter + by}
            });        
    }

    decrement(by){
            //console.log(`increment from parent - ${by}`)
        this.setState(
            (previousState)=>{
                return {counter: previousState.counter - by}
            });        
    }
}

class CounterButton extends Component {

    // Define the initial state in a constructor
       constructor(){
        super(); // Error 1 !!!

        // this.state = {
        //     counter : 0,
        // }

        // // Bind Funtion!!!
        // this.increment = this.increment.bind(this);
        // this.decrement = this.decrement.bind(this);
    }     
    
    render(){
       // const style = {fontSize: "50px", padding : "15px 30px"}
        return (
            <div className="counterButton">
                <button onClick={()=>this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={()=>this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
               {/*
               
                This is counter for eac counter button call

               <span className="count">{this.state.counter}</span>
               
               */}
        </div>
        )
    } 

    // // Update State - Counter ++ 
    // increment(){
    //     this.setState({
    //             counter: this.state.counter+this.props.by
    //         });
    //     this.props.incrementMethod(this.props.by);
        
    // }

    // decrement(){
    //     this.setState({
    //             counter: this.state.counter-this.props.by
    //         });
    //     this.props.decrementMethod(this.props.by);
        
    // }
}

// Add default value for values
CounterButton.defaultProps = {
    by: 1
}


// type of values to avoid mistakes
CounterButton.propTypes = {
    by: PropTypes.number
}

export default Counter; 
