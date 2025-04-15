import { TodoPreview } from "./TodoPreview.jsx"
import { saveTodo } from "../store/actions/todo.actions.js"
const { Link } = ReactRouterDOM
const { useState } = React

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
    // const [color, setColor] = useState()

    function onChangeColor(ev, todo) {
        const newColor = ev.target.value
        const updatedTodo = { ...todo, color: newColor }
        saveTodo(updatedTodo)
          .catch(err => {
                        console.log('err:', err)
                        showErrorMsg('Cannot save todo ' + todo.id)
                    })

    }
    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li key={todo._id} style={{ backgroundColor: todo.color }}>
                    <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} onChangeColor={onChangeColor}/>
                    <section>
                        <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                        <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                        <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                        <input type="color" value={todo.color} onChange={(ev) => onChangeColor(ev, todo)} />
                    </section>
                </li>
            )}
        </ul>
    )
}