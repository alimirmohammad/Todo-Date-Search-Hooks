import React, { useState, useEffect } from "react";
import ListShow from "./ListShow";
import { DatePicker } from "jalali-react-datepicker";

const TodoForm = props => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')) || []);
  const [showList, setShowList] = useState("All");
  
  todoList.map(todo => {
    todo.id = new Date(Date.parse(todo.id));
    todo.deadline = new Date(Date.parse(todo.deadline));
    return todo;
  });

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList])

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setTodoList(todoList => [
      { text: text, done: false, id: new Date(), deadline: new Date(date) },
      ...todoList
    ]);
    setText("");
    setDate("");
  };

  const onDone = id => {
    const index = todoList.findIndex(todo => todo.id === id);
    setTodoList(todoList => todoList.map((todo, indexTodo) => {
      if (indexTodo === index) {
        todo.done = !todo.done;
      }
      return todo;
    }));
  };

  const submitExample = ({ value }) => {
    setDate(value.toDate());  
  }

  let searchList = [];
  let newTodo = [];
  if (showList === "All") newTodo = todoList;
  else if (showList === "Done")
    newTodo = todoList.filter(todo => todo.done);
  else newTodo = todoList.filter(todo => !todo.done);

  searchList = newTodo.filter(todo => todo.text.includes(props.search));

  return (
    <>
      <div>
        <h2 className="heading-secondary">Add New Todo</h2>
        <form onSubmit={handleSubmit}>
          <input required className="input-text" placeholder="Title" type="text" value={text} onChange={handleChange} />
          <div className="input-text">
            <DatePicker onClickSubmitButton={submitExample} />  
          </div>          
          <button className="btn-text" type="submit">Add Todo</button>
        </form>
        <div>
          <button className="btn-filter" onClick={() => setShowList("All")}>
            All
        </button>{" "}
          <button className="btn-filter" onClick={() => setShowList("Done")}>
            Done
        </button>{" "}
          <button className="btn-filter" onClick={() => setShowList("unDone")}>
            unDone
        </button>
        </div>
        {searchList.slice(0, 10).map((todo, index) => (
          <ListShow
            key={index}
            todo={todo}
            handleDone={() => onDone(todo.id)}
          />
        ))}
      </div>

    </>
  )
}

export default TodoForm