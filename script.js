const btn = document.querySelector('#btn')
const lists = document.querySelector('#lists')
const input = document.querySelector('#input-todo')
const updateBtn = document.querySelector('#update-btn')
var h1 = document.createElement('h1')
h1.style.display = 'none'

let todos = JSON.parse(localStorage.getItem('todos')) ?? []

btn.addEventListener('click', () => {
    let inputVal = input.value.trim()
    if (inputVal === "") {
        alert("Please Enter a Valid Name")
    }
    else {
        todos.push(inputVal)
        displayList()
    }
})

updateBtn.addEventListener('click', () => {
    if (input.value === "") {
        alert("Please Enter a Valid Name")
    }
    else {
        let index = h1.innerHTML
        // todos.splice(index,1,input.value)
        todos[index] = input.value.trim()
        displayList()
        btn.classList.remove('update')
        updateBtn.classList.add('update')
    }
})

function displayList() {
    input.value = ''
    lists.innerHTML = ''
    todos.forEach((ele, index) => {
        let text = ''
        text += `<li class='li'><span class="element">${ele}</span><div>
        <button onclick = deleteTodo(${index}) class="delete">delete</button>
        <button onclick = editTodo(${index}) class="edit">edit</button></div></li>`
        lists.innerHTML += text
    })
    localStorage.setItem('todos', JSON.stringify(todos))
}

function deleteTodo(index) {
    todos.splice(index, 1)
    displayList()
}

function editTodo(index) {
    input.value = todos[index]
    updateBtn.classList.remove('update')
    btn.classList.add('update')
    updateBtn.style.backgroundColor = "blue"
    updateBtn.style.padding = "15px"
    updateBtn.style.borderRadius = "5px"
    updateBtn.addEventListener("mouseover", () => {
        updateBtn.style.backgroundColor = " rgb(0, 0, 225)"
        updateBtn.style.transition = "0.2s all ease-in-out"
    })
    updateBtn.addEventListener("mouseout", () => {
        updateBtn.style.backgroundColor = "blue"
        updateBtn.style.transition = "0.2s all ease-in-out"
    })
    h1.innerHTML = index
}
displayList()