let todoList = document.querySelector('.to-do-list');
let create = document.getElementById('create');
let input = document.getElementById('title');

async function getTodos() {
    let todos = await fetch('http://localhost:3000/todos')
    let todosArray = await todos.json();

    todoList.innerHTML = todosArray.map(function (obj) {
        // if (obj.completed === false) {
        //     return `<li class="in-progress" data-id="${obj.id}" data-title="${obj.title}" data-complited="${obj.completed}">${obj.title}<button type="submit" id="delete">delete</button></li>`
        // } else {
        //     return `<li class="confirmed" data-id="${obj.id}" data-title="${obj.title}" data-complited="${obj.completed}">${obj.title}<button type="submit" id="delete">delete</button></li>`
        // }
        let status = obj.completed === false ? "in-progress" : "confirmed"
        return `<li class="${status}" data-id="${obj.id}" data-title="${obj.title}" data-complited="${obj.completed}">${obj.title}<button type="submit" id="delete">delete</button></li>`

    }).join('');



};
getTodos();



create.addEventListener('click', async function addTodo(e) {
    e.preventDefault()

    let newTodo = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "title": input.value,
            "completed": false
        })
    });


    let newTodoArray = await newTodo.json();
    console.log(newTodoArray)
    // todoList.innerHTML += `<li class="in-progress" data-id="${newTodoArray.id}" data-title="${newTodoArray.title}"  
    // data-complited="${newTodoArray.completed = false}">${newTodoArray.title}<button type="submit" id="delete">delete</button></li>`;
    input.value = ' '
    getTodos();

})

todoList.addEventListener('click', async function changeTodoList(e) {
    if (e.target.tagName === 'LI') {
        let elemId = e.target.getAttribute('data-id')
        let elemTitle = e.target.getAttribute('data-title')
        let changeToDo = await fetch(`http://localhost:3000/todos/${elemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "title": `${elemTitle}`,
                "completed": true
            })
        });

        let changedToDo = await changeToDo.json();
        e.target.classList.add('confirmed')
        // console.log(changedToDo)
    }
})

// let del = document.getElementById('delete')
todoList.addEventListener('click', async function deleteTodo(e) {
    if (e.target.tagName === 'BUTTON') {
        let elemId = e.target.closest('li').getAttribute('data-id')
        let deleteTodo = await fetch(`http://localhost:3000/todos/${elemId}`, {
            method: 'DELETE'
        });

    }
    getTodos();

})