const toDoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const toDoList = document.querySelector('.todo-list')
const toDoCompleted = document.querySelector('.todo-completed')

let toDoData = []
let store

toDoControl.addEventListener('submit', function(event) {
    if (headerInput.value.trim() !== "") {
        event.preventDefault()

    const newToDo = {
        text: headerInput.value,
        completed: false // создание нового объекта, текст которого зависит от импута
    }
    toDoData.push(newToDo) // отправка созданного объекта в массив toDoData
    headerInput.value = '' // отчистка поля после отправки в массив
    } else {
        event.preventDefault()
        alert ('Введите задачу')
    }
    render()
})

const render = function () {
    toDoList.innerHTML = ''
    toDoCompleted.innerHTML = ''

    toDoData.forEach(function(item, index) {
        const li = document.createElement('li') //создание нового тега li в DOM
        li.classList.add('todo-item') // создание класса todo-item для тега li в DOM

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
        '<div class="todo-buttons">' + 
		'<button class="todo-remove">' + '</button>' +
		'<button class="todo-complete">' + '</button>' +
		'</div>' //добавление элементов из верстки к новосозданному тегу li

        if (item.completed) { // если ключ completed объекта соответствует true,
            toDoCompleted.append(li) // тогда в класс todo-completed добавляется тег li
        } else {
            toDoList.append(li) //иначе в класс todo-list
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed
            render()
        })
        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData.splice(index, 1)
            render()
        })
        store = localStorage.setItem('toDoData', JSON.stringify(toDoData))
        console.log(toDoData);
    })
}

const getToDoData = function () {
     store = localStorage.getItem('toDoData')
     toDoData = JSON.parse(store)
     console.log(toDoData)
     render()
}

getToDoData()

console.log(localStorage)