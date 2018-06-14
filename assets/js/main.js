$(document).ready(function(){
    //store the tasks in an array
    let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
        todo: [],
        completed: []
    };

    //user clicked on the add button
    //if there's any text inside that 'item' field, add that item to the to do list
    document.getElementById('add').addEventListener('click', function() {
        let value = document.getElementById('item').value;
        if(value){
           addItem(value);
        }
    });

    document.getElementById("item").addEventListener('keydown', function (e) {
        value = this.value;
        if(e.code === 'Enter' && value){
            addItem(value);
        }
    })

    function addItem(value) {
        addItemToDOM(value); 
        document.getElementById('item').value = '';

        data.todo.push(value);  
        dataObjectUpdate();
    }

    //function to display todo list items in the local storage if there are any
    function renderTodoList() {
        if(!data.todo.length && !data.completed.length) return;

        for(let i=0; i < data.todo.length; i++){
            const value = data.todo[i];
            addItemToDOM(value);
        }

        for(let j=0; j < data.completed.length; j++){
            const value = data.completed[j];
            addItemToDOM(value, true);
        }
    }


    function dataObjectUpdate() {
        localStorage.setItem('todoList', JSON.stringify(data));
    }

    function addItemToDOM(text, completed) {
        const list = (completed) ? document.getElementById("completed") : document.getElementById("todo");

        const item = document.createElement('li');
        item.className = 'list-group-item';
        const itemCls = ["d-flex", "justify-content-between", "align-items-center"];
        item.classList.add(...itemCls);
        item.innerText = text;
        
        

        let span = document.createElement('span');
        let remove = document.createElement('button');
        remove.className = 'btn';
        remove.classList.add('remove');
        const removeIcon = document.createElement('i');
        removeIcon.className ="far";
        removeIcon.classList.add('fa-2x', 'fa-trash-alt');
        remove.appendChild(removeIcon);

        //add click event for removing the item
        remove.addEventListener('click', removeItem);

        let complete = document.createElement('button');
        complete.className = 'btn';
        complete.classList.add('complete');
        const completeIcon = document.createElement('i');
        completeIcon.className ="far";
        completeIcon.classList.add('fa-2x', 'fa-check-circle');
        complete.appendChild(completeIcon);

        //add click event for completing the item
        complete.addEventListener('click', completeItem);

        span.append(remove, complete);
        item.appendChild(span);

        list.insertBefore(item, list.childNodes[0]);
    }


    function removeItem(e){
        const item = this.parentNode.parentNode;
        const parent = item.parentNode;
        const id = parent.id;

        let itemToBeRemoved = item.innerText;
        if(id == "todo"){
            data.todo.splice(data.todo.lastIndexOf(itemToBeRemoved), 1);
           
        }else{
            data.completed.splice(data.completed.lastIndexOf(itemToBeRemoved), 1);
        }
        parent.removeChild(item);
        dataObjectUpdate();
    }

    function completeItem(e) {
        const item = this.parentNode.parentNode;
        const parent = item.parentNode;
        const id = parent.id;
        
        //Check if the item should be added to the completed list or be readded to the todo list.
        const target = (id === "todo") ? document.getElementById("completed") : document.getElementById("todo");

        parent.removeChild(item);
        target.insertBefore(item, target.childNodes[0]);

        let itemCompleted = item.innerText;

        if(id == "todo"){
            data.todo.splice(data.todo.lastIndexOf(itemCompleted), 1);
            data.completed.push(itemCompleted);
        }else{
            data.completed.splice(data.completed.lastIndexOf(itemCompleted), 1);
            data.todo.push(itemCompleted);
        }  
        dataObjectUpdate();  
    }

    renderTodoList();
});