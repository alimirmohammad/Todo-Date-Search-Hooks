import React, { useState } from 'react'
import TodoForm from './TodoForm'

const SearchItem = () => {
    const [text, setText] = useState("");

    const handleChange = e => {
        setText(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <div className="container">
            <h2 className="heading-primary u-margin-bottom-small">Todo App</h2>
            <form className="form-search" onSubmit={handleSubmit}>
                <input className="input-text" value={text} onChange={handleChange} />
                <button className="btn-text">Search</button>
            </form>
            <TodoForm search={text} />
        </div>
    )
}

export default SearchItem