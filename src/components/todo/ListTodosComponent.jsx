import React, { Component } from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AutentificationService from './AutentificationService.js';
import moment from 'moment';

class ListToDoComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            todos: [],
            message : null
        }

        this.handleError = this.handleError.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);

        this.addTodoClicked = this.addTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    }  

    componentDidMount(){
        this.refreshTodos();
    }

    refreshTodos(){
        let userneme = AutentificationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(userneme)
        .then(
            response=>{
                this.setState({todos: response.data})
            }
        )
    }

    addTodoClicked(){
        this.props.history.push('/todos/-1')
    }


    updateTodoClicked(id){
        this.props.history.push(`/todos/${id}`)
    }


    deleteTodoClicked(id){

        let userneme = AutentificationService.getLoggedInUserName()
        TodoDataService.deleteTodo(userneme, id)
        .then(
            response => {
                this.setState({ message : `Delete of todo ${id} Successfull`})
                this.refreshTodos();
            }
        )
        .catch(
            error => this.handleError(error)
        )
    }

    handleError(error){
        let errorMessage = '';

        if(error.message)
        {
            errorMessage = error.message
        }

        if( error.response && error.message.data)
        {
            errorMessage += error.response.data.message
        }
    }

    render(){
        return (
        <div>
            <h1>My To Do List</h1>
            {this.state.message &&  <div className='alert alert-success'>{ this.state.message }</div> }
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Description</th>
                            <th>Is Completed?</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* map can be used to present each element of the array */}
                        {
                            this.state.todos.map(
                                todo => 
                                // Must assign key in tr - otherwise this will return
                                <tr key ={todo.id}>
                                    {/* <td>{todo.id}</td> */}
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td><button className="btn btn-success" onClick={ ()=>this.updateTodoClicked(todo.id)}>Update</button></td>
                                    <td><button className="btn btn-warning" onClick={ ()=>this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                </div>
            </div>
        </div>
        )
    }
}


export default ListToDoComponent
    