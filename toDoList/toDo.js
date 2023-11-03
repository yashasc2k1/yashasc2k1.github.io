let todoList = JSON.parse(localStorage.getItem('items'));
todoList = todoList || [];
renderItems();

function renderItems(){

    let inner = ``;
    for(let i = 0;i < todoList.length; i++){
        let {name, dueDate} = todoList[i];
        inner += `<div class="items">${name}</div>
        <div class="items">${dueDate}</div>
        <button onclick="deleteToDo(${i});" class="delete-todo-button">Delete</button>`
    }
    document.querySelector('.js-tasks').innerHTML = inner;
    localStorage.setItem('items', JSON.stringify(todoList));
}

function addToDo(){
    const input = document.querySelector('.js-name-input');
    const name = input.value;

    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    if(name.length > 0 && dueDate.length > 0){
        const obj = {
            name: name,
            dueDate: dueDate
        };
        todoList.push(obj);
        renderItems();
    }
    input.value = '';
}


function deleteToDo(index){
    todoList.splice(index, 1);
    renderItems();
}