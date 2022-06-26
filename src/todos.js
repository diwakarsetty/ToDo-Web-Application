import uuidv4 from 'uuid/v4'

let todos = []

const loadTodos = () => {
    const ToDoJSON = localStorage.getItem('todos')

   try{
        todos =  ToDoJSON ? JSON.parse(ToDoJSON) : []
    }catch(e){
        todos = []
    }
}

const saveTodos = () => {
    localStorage.setItem('todos',JSON.stringify(todos))  
} 

const getTodos = () => todos

const createTodo = (text) => {
    todos.push({
        id: uuidv4(),
        text,
        completed: false
    })
    saveTodos()
}

const removeToDo = (id) => {
    const TodoIndex = todos.findIndex((todo) => todo.id === id)

    if (TodoIndex > -1){
        todos.splice(TodoIndex,1)
        saveTodos()
    }

}

const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo !== undefined){
        todo.completed = !todo.completed
        saveTodos()
    }
}


loadTodos()

export { loadTodos,getTodos, saveTodos, createTodo, removeToDo, toggleTodo }

