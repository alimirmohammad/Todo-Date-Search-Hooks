import React, { Component } from 'react'
import TodoForm from './TodoForm'

export default class SearchItem extends Component {
    state = { text: "" };

    handleChange = e => {
        this.setState({ text: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
    };

    render() {
        return (
            <div className="container">
                <h2 className="heading-primary u-margin-bottom-small">Todo App</h2>
                <form className="form-search" onSubmit={this.handleSubmit}>
                    <input className="input-text" value={this.state.text} onChange={this.handleChange} />
                    <button className="btn-text">Search</button>
                </form>
                <TodoForm search={this.state.text} />
            </div>
        )
    }
}
