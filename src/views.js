import { getTodos, toggleTodo, removeToDo } from "./todos"
import { getFilters } from './filters'

//Render application todos based on filters
const renderTodos = () => {
    const todoEl = document.querySelector('#todos')
    const {searchText, hideCompleted} = getFilters()
    let filteredTodos = getTodos().filter((todo) => todo.text.toLowerCase().includes(searchText.toLowerCase()))
    filteredTodos = filteredTodos.filter((todo) => {
        if (hideCompleted)
        {
            return !todo.completed
        }
        else{
            return true
        }
    })
    const incompletetodos = filteredTodos.filter((todo) => !todo.completed)
    
    todoEl. innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompletetodos))
    
    

    if(filteredTodos.length > 0){
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateToDoDOM(todo))
        })

    }else{
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'NO To-Dos to show'
        todoEl.appendChild(messageEl)
    }
}


//Get the DOM elements for an individual note
const generateToDoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const newEl = document.createElement('span')
    const button = document.createElement('button')

    //setup todo checkbox
    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change',() => {
        toggleTodo(todo.id)
        renderTodos()
    })
    
    //setup the todo text
    newEl.textContent = todo.text
    containerEl.appendChild(newEl)

    //Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //setup the button text
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    todoEl.appendChild(button)
    button.addEventListener('click',() => {
        removeToDo(todo.id)
        renderTodos()
    }) 

    return todoEl
}


// Get the DOM elements for list summary

const generateSummaryDOM = (incompletetodos) => {
    const s = document.createElement('h2')
    s.classList.add('list-title')
    if(incompletetodos.length === 1)
    {
        s.textContent = `You have ${incompletetodos.length} todo left`
    }
    else{
        s.textContent = `You have ${incompletetodos.length} todos left`
    }
    
    return s

}

export {generateToDoDOM, generateSummaryDOM, renderTodos}