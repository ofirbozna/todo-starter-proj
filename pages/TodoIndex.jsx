import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, saveTodo } from "../store/actions/todo.actions.js"
import { changeBalance, updateUserActivities } from "../store/actions/user.actions.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {
    const todos = useSelector(storeState => storeState.todos)
    const isLoading = useSelector(storeState => storeState.isLoading)
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .catch(err => {
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onRemoveTodo(todoId) {
        const confirmRemove = confirm('Are you sure you want to remove this todo?')
        if (!confirmRemove) return
        removeTodo(todoId)
            .then(() => {
                updateUserActivities(`Removed todo ${todoId} id`)
                showSuccessMsg(`Removed todo with ${todoId} id successfully`)
            })
            .catch(err => {
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        saveTodo(todoToSave)
            .then((savedTodo) => {
                console.log(savedTodo._id)
                updateUserActivities(`change todo ${todoToSave.txt} isDone to ${todoToSave.isDone} `)
                showSuccessMsg(`Todo is ${(savedTodo.isDone) ? 'done' : 'back on your list'}`)
                if (todoToSave.isDone) {
                    return changeBalance(10)
                }
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }

    function onSetPage(diff) {
        if (filterBy.pageIdx + diff < 0) return
        setFilterBy(prevFilter => ({ ...prevFilter, pageIdx: +prevFilter.pageIdx + diff }))
    }

    if (!todos) return <h2>No todos to show</h2>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            {isLoading ? <div>Loading...</div> :
                <section>
                    <h2>Todos List</h2>
                    <button onClick={() => onSetPage(-1)}>Prev Page</button>
                    <span>{filterBy.pageIdx+1}</span>
                    <button onClick={() => onSetPage(1)}>Next Page</button>
                    <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
                    <hr />
                    <h2>Todos Table</h2>
                    <div style={{ width: '60%', margin: 'auto' }}>
                        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
                    </div>
                </section>}
        </section>
    )
}